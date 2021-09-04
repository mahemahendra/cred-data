import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, View, Text, TextInput, ScrollView } from 'react-native';
import Button from "react-native-button";
import { AppStyles } from '../../AppStyles';
import { styles } from '../../styles/Login.styles';
import RadioButton from '../../components/nativeComponents/RadioButton';
import firestore from '@react-native-firebase/firestore';

const CreateUser = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [mobile, setMobile] = useState('');
    const [userRole, setUserRole] = useState('USER');
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [timer, setTimer] = useState('');
    const [timerError, setTimerError] = useState('');
    const [isNewUser, setNewUser] = useState('');

    const userTypes = [
        {
            key: 'ADMIN',
            text: 'Admin',
        },
        {
            key: 'USER',
            text: 'User',
        }
    ];

    const validateFields = () => {
        let flag = true;
        if(userId.length === 0) {
            setUserIdError("Please enter valid User ID");
            flag = false;
        } else {
            setUserIdError('');
        }
        if(password.length === 0) {
            setPasswordError("Please enter valid Password");
            flag = false;
        } else {
            setPasswordError('');
        }
        if(timer.length === 0) {
            setTimerError("Please enter Timer");
            flag = false;
        } else {
            setTimerError('');
        }
        if(firstName.length === 0) {
            setFirstNameError("Please Full Name");
            flag = false;
        } else {
            setFirstNameError('');
        }
        return flag;
    }

    const submit = () => {
        setLoading(true);
        if(validateFields()) {
            if(isNewUser === '') {
                firestore()
                .collection("users")
                .add({
                    userId: userId,
                    password: password,
                    firstName: firstName,
                    mobile: mobile,
                    userRole: userRole,
                    timer: timer,
                }).then(res => {
                    setTimeout(() => {
                        props.setShowList(true);
                        setLoading(false);
                    }, 2000)
                }).catch(() => {
                    setLoading(false);
                });
            } else {
                firestore()
                .collection("users")
                .doc(isNewUser)
                .set({
                    userId: userId,
                    password: password,
                    firstName: firstName,
                    mobile: mobile,
                    userRole: userRole,
                    timer: timer,
                }).then(res => {
                    setTimeout(() => {
                        props.setShowList(true);
                        setLoading(false);
                    }, 2000)
                }).catch(() => {
                    setLoading(false);
                });
            }
            
        }
    }

    const resetField = () => {
        setLoading(false);
        setUserId('');
        setPassword('');
        setFirstName('');
        setMobile('');
        setUserRole('');
        setUserIdError('');
        setPasswordError('');
        setFirstNameError('');
        setTimer('')
        setNewUser('');
    }

    const populateValues = user => {
        setUserId(user.userId);
        setPassword(user.password);
        setFirstName(user.firstName);
        setMobile(user.mobile);
        setUserRole(user.userRole);
        setTimer(user.timer)
    }

    useEffect(() => {
        if(Object.keys(props.selectedUser).length > 0) {
            populateValues(props.selectedUser);
            setNewUser(props.selectedUser.id);
        } else {
            resetField();
            setNewUser('');
        }
        return () => {
            resetField();
        }
    }, [props.selectedUser]);
    return loading ? <ActivityIndicator
            style={{}}
            size="large"
            color={AppStyles.color.tint}
        />: 
    <SafeAreaView>
        <ScrollView>
            <View>
                <View>
                    <Text style={{fontSize: 20, textAlign: 'center', backgroundColor: AppStyles.color.main, color: AppStyles.color.white, padding: 5}}>Create New User</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="User Id"
                            onChangeText={text => setUserId(text)}
                            value={userId}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View>
                        <Text style={styles.error}>{userIdError}</Text>
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="Password"
                            onChangeText={text => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View>
                        <Text style={styles.error}>{passwordError}</Text>
                    </View>
                    <View style={styles.container}>
                        <RadioButton PROP={userTypes} setRole={setUserRole} selected={userRole} />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="Timer"
                            onChangeText={text => setTimer(text)}
                            value={timer}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="First Name"
                            onChangeText={text => setFirstName(text)}
                            value={firstName}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View>
                        <Text style={styles.error}>{firstNameError}</Text>
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="Mobile"
                            onChangeText={text => setMobile(text)}
                            value={mobile}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    {/* <View>
                        <Text style={styles.error}>{mobileError}</Text>
                    </View> */}
                    <View style={{flexDirection: 'row'}}>
                        <Button
                            containerStyle={{...styles.loginContainer, width: '40%', marginRight: 10}}
                            style={styles.loginText}
                            onPress={submit}
                        >
                            Submit
                        </Button>
                        <Button
                            containerStyle={{...styles.loginContainer, width: '40%'}}
                            style={styles.loginText}
                            onPress={() => props.setShowList(true)}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>;
}

export default CreateUser;