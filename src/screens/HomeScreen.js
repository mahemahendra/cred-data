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
import { connect } from "react-redux";
import LogoIcon from '../../assets/logo.png';
import Appbanner from '../../assets/appbanner.png';
import {
  AppStyles,
} from "../AppStyles";
import {MenuItems} from "../components/data/MenuItems";

const { width, height } = Dimensions.get("window");
class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.user,
      userInfo: this.props.user,
    };
    this.data = MenuItems;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      userInfo: this.state.currentUser,
    });
  }

  renderDashboardMenu(item) {
    if(item.role === "ADMIN" && this.state.userInfo.userRole !== "ADMIN") {
      return;
    } else {
      return <TouchableOpacity>
          <View key={item.name} style={styles.menuItem} onTouchEndCapture={() => this.props.navigation.navigate(item.component) }>
              <Image resizeMode='contain' source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.name}</Text>
          </View>
      </TouchableOpacity>
    }
  }

  render() {
    let renderItems = null;
    if(true) {
      renderItems = <View flexDirection="column" style={{flex: 1, width: '100%' ,backgroundColor: AppStyles.color.white, justifyContent: 'flex-start'}}>
          <View style={{width: '100%', alignSelf: 'stretch'}}>
            <Image
              resizeMode={FastImage.resizeMode.stretch}
              source={Appbanner}
              style={{width: '100%', height: 150, position: 'relative', bottom: 4}}
              resizeMethod='scale'
            />
          </View>
          <View style={{width: '100%', height: 150}}>
            <Image
              resizeMode={FastImage.resizeMode.contain}
              source={LogoIcon}
              style={{justifyContent: 'center', alignSelf: 'center', height: 150,}}
            />
          </View>
          <View justifyContent="center" flexDirection="column">
            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 20}}>Hi {this.props.user.firstName},</Text>
            </View>
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
    }
    return renderItems;
  }
}

const styles = StyleSheet.create({
  menuItem: {
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  menuLabel: {
    color: '#000',
    fontSize: 16,
  },
  menuIcon: {
    width: 40,
    height: 50,
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeScreen);
