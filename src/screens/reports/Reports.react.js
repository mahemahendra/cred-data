import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import Text from '../../components/nativeComponents/Text.react';
import {
        SafeAreaView,
        Text as RNText,
        StyleSheet,
        View,
        ActivityIndicator,
        FlatList,
    } from "react-native";
import { AppStyles, AppCommonStyle} from "../../AppStyles";
import firestore from '@react-native-firebase/firestore';

const Reports = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        firestore().collection('barCodes').get().then(result => {
            const data = result.docs.map(d => d.data());
            let temp = [];
            const groups = data.reduce((acc, date) => {
                const yearWeek = date.userId;
                if (!acc[yearWeek]) {
                    acc[yearWeek] = [];
                }
                acc[yearWeek].push(date.userId);
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
        return <View style={{...styles.reportList, backgroundColor: AppStyles.color.white, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text cls='dataCell' style={{color: AppStyles.color.white}}>{item.date.split("-")[0]}</Text>
            <Text cls='dataCell' style={{color: AppStyles.color.white}}>
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
            <View style={{...styles.reportList, flexDirection: 'row', justifyContent: 'space-between'}}>
                <RNText cls='mainDate' style={{width: '30%', color: AppStyles.color.white}}>User Id</RNText>
                <RNText cls='mainTitle' style={{width: '30%', color: AppStyles.color.white, textAlign: 'right'}}>
                    Total Barcodes
                </RNText>
                {/* <RNText cls='mainDate' style={{width: '30%', color: AppStyles.color.white}}>Date</RNText> */}
            </View>
            <FlatList
                spacing={10}
                data={data}
                keyExtractor={(item) => item.date}
                renderItem={({item}) => renderReports(item)}
            />
        </View>
    </SafeAreaView>;
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Reports);

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
    },
    flatListText: {
        color: AppStyles.color.white,
        fontSize: 16,
    },
});