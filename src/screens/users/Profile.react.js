import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { AppStyles, } from "../../AppStyles";
import { ActivityIndicator } from 'react-native';

const Profile = (props) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        firestore().collection('users').doc(props.user.id).get().then(docs => {
            setUserInfo(docs.data());
            setLoading(false);
        });
    }, []);

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
        <View style={{}}>
            <Text>asdasd</Text>
        </View>
    </SafeAreaView>;
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Profile);