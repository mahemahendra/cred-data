import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { AppStyles, } from "../../AppStyles";
import { ActivityIndicator, SafeAreaView, View, Text } from 'react-native';
import { styles } from '../../styles/Profile.style';

const Profile = (props) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        firestore().collection('users').doc(props.user.id).get().then(docs => {
            setUserInfo(docs.data());
            setLoading(false);
            console.info(docs.data());
        });
    }, []);

    return loading ? <ActivityIndicator
        style={{}}
        size="large"
        color={AppStyles.color.tint}
    />
    :
    <SafeAreaView
        style={styles.surface}
        forceInset={{top: 'always', horizontal: 'never'}}
    >
        <View style={{width: '100%'}}>
            <View>
                <Text style={styles.pageHeading}>User Profile</Text>
            </View>
            <View style={styles.container}>
                <View>
                    <View style={styles.userRow}>
                        <Text style={styles.userInfoRow}>User Id <Text style={styles.userInfoRowValue}>{userInfo.userId}</Text></Text>
                    </View>
                    <View style={styles.userRow}>
                        <Text style={styles.userInfoRow}>Full Name <Text style={styles.userInfoRowValue}>{userInfo.firstName}</Text></Text>
                    </View>
                    <View style={styles.userRow}>
                        <Text style={styles.userInfoRow}>Mobile <Text style={styles.userInfoRowValue}>{userInfo.mobile}</Text></Text>
                    </View>
                    <View style={styles.userRow}>
                        <Text style={styles.userInfoRow}>Address <Text style={styles.userInfoRowValue}>{userInfo.address}</Text></Text>
                    </View>
                </View>
            </View>
        </View>
    </SafeAreaView>;
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Profile);