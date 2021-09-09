import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
// import { DataTable, Header, Title, Row, Cell } from 'react-native-paper';
import {
        SafeAreaView,
        StyleSheet,
        View,
        ActivityIndicator,
        FlatList,
        Text as RNText
    } from "react-native";
import Text from '../../components/nativeComponents/Text.react';
import { AppStyles, AppCommonStyle } from "../../AppStyles";
import firestore from '@react-native-firebase/firestore';

const MyReports = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        firestore().collection('barCodes').where("id", "==", props.user.id).get().then(result => {
            const data = result.docs.map(d => ({...d.data()})).reverse();
            let temp = [];
            const groups = data.reduce((acc, date) => {
            // create a composed key: 'year-week' 
            // const yearWeek = `${moment(date.timeStamp).year()}-${moment(date.timeStamp).week()}`;
            const yearWeek = moment(date.timeStamp.toDate()).format('DD/MM/YYYY');
            // add this key as a property to the result object
            if (!acc[yearWeek]) {
                acc[yearWeek] = [];
            }
            
            // push the current date that belongs to the year-week calculated befor
            acc[yearWeek].push(date);
            
            return acc;
            
            }, {});
            
            Object.keys(groups).forEach(g => {
                temp.push({date: g, count: groups[g].length});
            });
            setData(temp);
        });
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [data]);

    const renderReports = (item) => {
        return <View style={{...styles.reportList, backgroundColor: AppStyles.color.white, borderWidth: 0}}>
            <Text cls='dataCell'>{item.date}</Text>
            <Text cls='dataCell'>
                {item.count}
            </Text>
        </View>
    }

    return loading ? <ActivityIndicator
        style={{flex: 1}}
        size="large"
        color={AppStyles.color.tint}
    />
    :
    <SafeAreaView
        style={AppStyles.mainContainer}
        forceInset={{top: 'always', horizontal: 'never'}}
    >
        <View>
            <RNText style={AppCommonStyle.pageHeading}>My Reports</RNText>
        </View>
        <View style={styles.flatListContainer}>
            <View style={styles.reportList}>
                <Text cls='mainDate'>Date</Text>
                <Text cls='mainTitle'>
                    Total Barcode
                </Text>
            </View>
            <FlatList
                spacing={10}
                data={data}
                keyExtractor={(item) => item.date}
                renderItem={({item}) => renderReports(item)}
            />
            {/* { populateGrid() } */}
        </View>
    </SafeAreaView>;
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(MyReports);

const styles = StyleSheet.create({
    flatListContainer: {
        justifyContent: 'center',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    reportList: {
        backgroundColor: AppStyles.color.main,
        width: '98%',
        alignSelf: 'center',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flatListText: {
        color: AppStyles.color.white,
        fontSize: 16,
    },
});