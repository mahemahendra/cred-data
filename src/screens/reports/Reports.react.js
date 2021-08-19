import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import {
        SafeAreaView,
        ScrollView,
        StyleSheet,
        View,
        ActivityIndicator,
        FlatList,
    } from "react-native";
import Text from '../../components/nativeComponents/Text.react';
import { AppStyles, } from "../../AppStyles";
import firestore from '@react-native-firebase/firestore';

const Reports = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        firestore().collection('barCodes').get().then(result => {
            setData(result.docs.map(d => ({...d.data(), id: d.id})));
        });
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [data]);

    const renderReports = (item) => {
        const correctBarCodes = item.barCodes.filter(barcode => barcode.barCode == barcode.barCodeEntered);
        return <View style={styles.reportList}>
            <Text cls='mainTitle'>
                {item.assignee}
            </Text>
            <Text cls='mainDate'>{item.timeStamp.toDate().toDateString()}</Text>
            <Text cls='mainText'>Total Barcodes: {item.barcodeCount}</Text>
            <Text cls='mainText'>Result: {`${correctBarCodes.length}/${item.barCodes.length}`}</Text>
        </View>
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
        <View style={styles.flatListContainer}>
            <FlatList
                spacing={10}
                data={data}
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
        margin: 5,
        padding: 5,
    },
    flatListText: {
        color: AppStyles.color.white,
        fontSize: 16,
    },
});