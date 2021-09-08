import React from "react";
import Button from "react-native-button";
import { View, TextInput,Image, Platform } from "react-native";
import { AppStyles } from "../AppStyles";
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import Logo from '../../assets/logo.png';
import { styles } from '../styles/Login.styles';

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      password: '',
      email: '',
      deviceId: '',
    };
    this.tryToLoginFirst();
  }

  onPressLogin = () => {
    const { email, password, deviceId } = this.state;
    if (email.length <= 0 || password.length <= 0) {
      alert("Please fill out the required fields.");
      return;
    }
    let flag = false;
    firestore().collection('users').where("userId", "==", this.state.email).get().then(docs => {
      docs.forEach(d => {
        const userInfo = {...d.data(), id: d.id};
        if(userInfo.deviceId === undefined || userInfo.deviceId === null) {
          flag = true;
          d.ref.set({
            ...d.data(),
            deviceId: deviceId,
          });
        }
        if(userInfo.password === this.state.password) {
          if(this.state.deviceId === userInfo.deviceId || flag) {
            const { navigation } = this.props;
            AsyncStorage.setItem("@loggedInUserID:id", userInfo.id);
            AsyncStorage.setItem("@loggedInUserID:key", userInfo.userId);
            AsyncStorage.setItem("@loggedInUserID:password", userInfo.password);
            AsyncStorage.setItem("@loggedInUserID:deviceId", userInfo.deviceId);
            navigation.dispatch({ type: "Login", user: userInfo });
          } else {
            alert("User already logged in another device");
          }
        } else {
          alert("User does not exist. Please try again.");
        }
      });
    }).catch(function(error) {
      const { code, message } = error;
      alert(message);
    });
  };

  componentDidMount() {
    if(Platform.OS === 'android') {
      const deviceId = DeviceInfo.getUniqueId();
      this.setState({
        deviceId: deviceId,
      });
    }
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={AppStyles.color.tint}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Image source={Logo} style={{height: 110, width: 260}} />
        <View style={styles.container}>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="User Id"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <Button
            containerStyle={styles.loginContainer}
            style={styles.loginText}
            onPress={() => this.onPressLogin()}
          >
            Log In
          </Button>
        </View>
      </View>
    );
  }

  async tryToLoginFirst() {
    const userId = await AsyncStorage.getItem("@loggedInUserID:key");
    const password = await AsyncStorage.getItem("@loggedInUserID:password");
    const id = await AsyncStorage.getItem("@loggedInUserID:id");
    const deviceId = await AsyncStorage.getItem("@loggedInUserID:deviceId");
    if (
      id != null &&
      id.length > 0 &&
      password != null &&
      password.length > 0
    ) {
      let flag = false;
      firestore().collection('users').where("userId", "==", userId).get().then(docs => {
        docs.forEach(d => {
          const userInfo = {...d.data(), id: d.id};
          if(userInfo.deviceId === undefined || userInfo.deviceId === null) {
            d.ref.set({
              ...d.data(),
              deviceId: this.state.deviceId,
            });
          }
          if(userInfo.password === password) {
            if(this.state.deviceId === userInfo.deviceId || flag) {
              const { navigation } = this.props;
              AsyncStorage.setItem("@loggedInUserID:id", userInfo.id);
              AsyncStorage.setItem("@loggedInUserID:key", userInfo.userId);
              AsyncStorage.setItem("@loggedInUserID:password", userInfo.password);
              AsyncStorage.setItem("@loggedInUserID:deviceId", userInfo.deviceId);
              AsyncStorage.setItem("@loggedInUserID:userRole", userInfo.userRole);
              navigation.dispatch({ type: "Login", user: userInfo });
            } else {
              alert("User already logged in another device");
              this.setState({ isLoading: false });
            }
            
          } else {
            alert("User does not exist. Please try again.");
            this.setState({ isLoading: false });
          }
        });
      }).catch(function(error) {
        const { code, message } = error;
        alert(message);
        this.setState({ isLoading: false });
      });
      return;
    }
    this.setState({ isLoading: false });
  }
}

export default WelcomeScreen;