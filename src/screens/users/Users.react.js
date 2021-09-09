import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { AppStyles } from '../../AppStyles';
import firestore from '@react-native-firebase/firestore';
import { styles as loginStyle } from '../../styles/Login.styles';

const Users = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    
    const getUserList = () => {
        firestore()
        .collection("users")
        // .where('userRole', '==', 'USER')
        .get().then(res => {
            const data = res.docs.map(e => ({...e.data(), id: e.id}))
            let temp = [];
            data.forEach(d => {
                if(d.userId !== undefined && d.userId.indexOf(search) > -1) {
                    temp.push(d);
                }
            })
            setData(temp);
            setLoading(false);
        })
        .catch(e => {
            console.error("[getUserList]", error.message);
            setLoading(false);
        });
    }

    useEffect(() => {
        getUserList();
    }, []);

    // useEffect(() => {
    //     getUserList();
    // }, [props.showList]);

    const editUser = (item) => {
        props.setSelectedUser(item);
        props.setShowList(false)
    }

    const deleteUser = (item) => {
        setLoading(true);
        firestore()
        .collection("users")
        .doc(item.id).delete()
        .then(res => {
            getUserList();
            setLoading(false);
        })
        .catch(e => {
            console.error("[User delete error]", error.message);
            setLoading(false);
        });
    }

    const createUser = () => {
        props.setSelectedUser({});
        props.setShowList(false);
    }

    const renderItem = (item) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{item.firstName}</Text>
                <Text style={styles.flatListSubCaption}>UserId: {item.userId}</Text>
            </View>
            <View style={styles.actionView}>
                <TouchableOpacity><Text style={{color: AppStyles.color.white}} onPress={() => editUser(item)}>View</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{color: AppStyles.color.white}} onPress={() => deleteUser(item)}>Delete</Text></TouchableOpacity>
            </View>
        </View>
    );

    return loading ? <ActivityIndicator
            style={{flex: 1}}
            size="large"
            color={AppStyles.color.tint}
        />
    :
        <SafeAreaView style={AppStyles.mainContainer}>
            <View style={{justifyContent: 'space-between', flexDirection: 'column', alignContent: 'stretch', height: '100%'}}>
                <Text style={{color: AppStyles.color.main, textAlign: 'center', margin: 10, fontSize: 18}}>List of Users</Text>
                <View style={{flexDirection: 'row', alignContent: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: 15}}>
                    <TextInput
                        style={styles.body}
                        placeholder="Search by User Id"
                        onChangeText={text => setSearch(text)}
                        value={search}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                    <Button
                        color={AppStyles.color.main}
                        title={'Search'}
                        onPress={getUserList}
                    />
                </View>
                <FlatList
                    data={data}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={item => item.id}
                />
                <View>
                    <Button title={'Create User'} color={AppStyles.color.main} onPress={createUser} />
                </View>
            </View>
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
      justifyContent: 'space-between'
    },
    actionBtn: {
      margin: 5,
    },
    body: {
        ...loginStyle.body,
    },
});