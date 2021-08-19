import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import FastImage from "react-native-fast-image";
import firestore, { firebase } from '@react-native-firebase/firestore';
import { connect } from "react-redux";
import LogoIcon from '../../assets/logo.png';
import {
  AppStyles,
} from "../AppStyles";
import {MenuItems} from "../components/data/MenuItems";

const { width, height } = Dimensions.get("window");
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      currentUser: firebase.app().auth().currentUser,
      userInfo: '',
    };
    this.data = MenuItems;
  }

  componentDidMount() {
    firestore().collection('users').doc(this.state.currentUser.uid).get().then(user => {
      this.setState({
        userInfo: user.data(),
      });
    });
    this.props.navigation.setParams({
      menuIcon: this.state.currentUser.profileURL,
      userInfo: this.state.currentUser,
    });
  }


  renderDashboardMenu(item) {
    if(item.role === "ADMIN" && this.state.userInfo.userRole !== "ADMIN") {
      return;
    } else {
      return <TouchableOpacity>
          <View key={item.name} style={styles.menuItem} onTouchEndCapture={() => this.props.navigation.navigate(item.component) }>
              {/* <Image source={item.icon} style={styles.menuIcon} /> */}
              <Text style={styles.menuLabel}>{item.name}</Text>
          </View>
      </TouchableOpacity>
    }
  }

  render() {
    let renderItems = null;
    if(this.state.userInfo.status === '' || this.state.userInfo.status === 'PENDING') {
      renderItems = <Text>Welcome, your account has not yet Approved. Please contact Admin</Text>
    } else if(this.state.userInfo.status === 'APPROVE' || this.state.userInfo.userRole === 'ADMIN') {
      renderItems = <View justifyContent="center" flexDirection="column" style={{height: height - 180}}>
          <View>
            <Image
              resizeMode={FastImage.resizeMode.cover}
              source={LogoIcon}
              style={{width: width - 100, height: 150,}}
            />
          </View>
          <View justifyContent="center" flexDirection="row">
            <View>
              <FlatGrid
                  spacing={10}
                  itemDimension={130}
                  data={this.data}
                  renderItem={({item}) => this.renderDashboardMenu(item)}
              />
            </View>
          </View>
        </View>
    } else if(this.state.userInfo.status === 'BLOCK') {
      renderItems = <Text>Welcome, your account has been Blocked. Please contact Admin</Text>
    }
    return renderItems;
  }
}

const styles = StyleSheet.create({
  menuItem: {
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: AppStyles.color.main,
    borderRadius: 5,
    justifyContent: 'center',
  },
  menuLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeScreen);
