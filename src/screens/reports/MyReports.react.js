import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import { DataTable, Header, Title, Row, Cell } from 'react-native-paper';
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
            const data = result.docs.map(d => ({...d.data(), id: d.id}));
            let temp = [];
            const groups = data.reduce((acc, date) => {
            // create a composed key: 'year-week' 
            // const yearWeek = `${moment(date.timeStamp).year()}-${moment(date.timeStamp).week()}`;
            const yearWeek = moment(date.timeStamp).toDate().toLocaleDateString();
            
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
        return <View key={item.date} style={styles.reportList}>
            <Text cls='mainTitle'>
                {item.count}
            </Text>
            <Text cls='mainDate'>{item.date}</Text>
        </View>
    }

    const populateGrid = () => {
        return <DataTable>
            <Header>
                <Title>Date</Title>
                <Title numeric>Number of Code</Title>
            </Header>
            {
                data.map((d, index) => {
                    <Row key={index}>
                        <Cell>{d.date}</Cell>
                        <Cell numeric>{d.count}</Cell>
                    </Row>
                })
            }
        </DataTable>
    }

    return loading ? <ActivityIndicator
        style={{}}
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
                <Text cls='mainTitle'>
                    Count
                </Text>
                <Text cls='mainDate'>Date</Text>
            </View>
            {/* <FlatList
                spacing={10}
                data={data}
                renderItem={({item}) => renderReports(item)}
            /> */}
            { populateGrid() }
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
        // margin: 5,
        padding: 5,
        borderBottomColor: AppStyles.color.white,
        borderWidth: 1,
    },
    flatListText: {
        color: AppStyles.color.white,
        fontSize: 16,
    },
});