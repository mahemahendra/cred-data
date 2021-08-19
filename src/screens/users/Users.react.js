import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text, Button, StyleSheet, } from 'react-native';
import { AppStyles } from '../../AppStyles';
import firestore from '@react-native-firebase/firestore';
import { Configuration } from "../../Configuration";

const Users = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getUserList = () => {
        firestore()
        .collection("users")
        .where('userRole', '==', 'USER')
        .get().then(res => {
            setData(res.docs.map(e => ({...e.data(), id: e.id})));
            setLoading(false);
        });
    }

    useEffect(() => {
        getUserList();
    }, []);

    const updateStatus = (item, newStatus) => {
        firestore()
        .collection('users')
        .doc(item.id)
        .update({
            status: newStatus,
        }).then(r => {
            getUserList();
        });
    }

    const renderItem = (item) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.flatListSubCaption}>Email: {item.email}</Text>
                <Text style={styles.flatListSubCaption}>Status: {item.status === '' ? 'PENDING' : item.status}</Text>
            </View>
            <View style={styles.actionView}>
                {item.status !== 'APPROVE' && <Button
                    onPress={() => updateStatus(item, "APPROVE")}
                    title={'APPROVE'}
                ></Button>}
                {item.status !== 'BLOCK' && <Button
                    onPress={() => updateStatus(item, "BLOCK")}
                    style={styles.actionBtn}
                    title={'BLOCK'}
                ></Button>}
            </View>
        </View>
    );

    return loading ? <ActivityIndicator
            style={{}}
            size="large"
            color={AppStyles.color.tint}
        />
    :
        <SafeAreaView style={AppStyles.mainContainer}>
            <FlatList
                data={data}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
}

export default Users;

const styles = StyleSheet.create({
    title: {
      fontWeight: "bold",
      color: AppStyles.color.title,
      fontSize: 25
    },
    item: {
      backgroundColor: AppStyles.color.main,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: 20,
      color: AppStyles.color.white,
    },
    flatListSubCaption: {
      color: AppStyles.color.white,
    },
    actionView: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center'
    },
    actionBtn: {
      margin: 5,
    },
});