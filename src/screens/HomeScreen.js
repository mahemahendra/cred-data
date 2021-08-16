import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, View, FlatList, StatusBar, Button } from 'react-native';

import FastImage from "react-native-fast-image";
import firestore, { firebase } from '@react-native-firebase/firestore'
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";

class HomeScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: <Text>Cred Data</Text>,
  //   headerLeft: () => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => {
  //           navigation.openDrawer();
  //         }}
  //       >
  //         {navigation.state.params && navigation.state.params.menuIcon ? (
  //           <FastImage
  //             style={styles.userPhoto}
  //             resizeMode={FastImage.resizeMode.cover}
  //             source={{ uri: navigation.state.params.menuIcon }}
  //           />
  //         ) : (
  //           <FastImage
  //             style={styles.userPhoto}
  //             resizeMode={FastImage.resizeMode.cover}
  //             source={AppIcon.images.defaultUser}
  //           />
  //         )}
  //       </TouchableOpacity>
  //     );
  //   }
  // });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      userList: [],
      reload: false,
      currentUser: firebase.app().auth().currentUser,
      userInfo: '',
    };
  }

  componentDidMount() {
    firestore().collection('users').doc(this.state.currentUser.uid).get().then(user => {
      if(user.data().userRole === 'ADMIN') {
        this._getUserList();
      }
      this.setState({
        userInfo: user.data(),
      });
    });
    // if(this.state.currentUser.userRole === 'ADMIN') {
    //   this._getUserList();
    // }
    this.props.navigation.setParams({
      menuIcon: this.state.currentUser.profileURL
    });
  }

  _getUserList() {
    firestore()
    .collection("users")
    .where('userRole', '==', 'USER')
    .get().then(res => {
      this.setState({
        userList: res.docs.map(e => ({...e.data(), id: e.id})),
      });
    });
  }

  updateStatus(item, newStatus) {
    firestore()
    .collection('users')
    .doc(item.id)
    .update({
      status: newStatus,
    }).then(r => {
      this._getUserList();
    });
  }


  renderItem = ({item}) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.flatListSubCaption}>Email: {item.email}</Text>
        <Text style={styles.flatListSubCaption}>Status: {item.status === '' ? 'PENDING' : item.status}</Text>
      </View>
      <View style={styles.actionView}>
        {item.status !== 'APPROVE' && <Button
          onPress={this.updateStatus.bind(this, item, "APPROVE")}
          title={'APPROVE'}
        ></Button>}
        {item.status !== 'BLOCK' && <Button
          onPress={this.updateStatus.bind(this, item, "BLOCK")}
          style={styles.actionBtn}
          title={'BLOCK'}
        ></Button>}
      </View>
    </View>
  );

  render() {
    let renderItems = null;
    if(this.state.userInfo.userRole === 'ADMIN') {
      renderItems = <FlatList
        data={this.state.userList}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />;
    } else {
      if(this.state.userInfo.status === '' || this.state.userInfo.status === 'PENDING') {
        renderItems = <Text>Welcome, your account has not yet Approved. Please contact Admin</Text>
      } else if(this.state.userInfo.status === 'APPROVE') {
        renderItems = <Text>Welcome, your account has been Approved. Congratulations</Text>
      } else if(this.state.userInfo.status === 'BLOCK') {
        renderItems = <Text>Welcome, your account has been Blocked. Please contact Admin</Text>
      }
    }

    return (
      <ScrollView style={styles.container}>
        {/* {this.state.userList.map(e => {
          return <Text>asd</Text>
        })} */}
        {/* <Button title={'Reload'} onPress={() => this.setState({reload: !this.state.reload})} /> */}
        {renderItems}
        {/* <Text style={styles.title}>Welcome {this.state.userInfo.email}</Text> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: Configuration.home.listing_item.offset
  },
  title: {
    fontWeight: "bold",
    color: AppStyles.color.title,
    fontSize: 25
  },
  userPhoto: {
    width: 30,
    height: 40,
    // borderRadius: 20,
    marginLeft: 5
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

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeScreen);
