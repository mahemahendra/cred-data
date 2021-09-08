import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {createBottomTabNavigator, /* BottomTabBar */} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Barcode from "../screens/barcode/Barcode.react";
import MyReports from "../screens/reports/MyReports.react";
import Reports from "../screens/reports/Reports.react";
import UserWrapper from "../screens/users/UserWrapper.react";
import Profile from "../screens/users/Profile.react";
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";

const middleware = createReactNavigationReduxMiddleware(
  state => state.nav
);

// const TabBarComponent = (props) => (props.show ? <BottomTabBar {...props} /> : <BottomTabBar tabStyle={{display: "none"}} {...props} />);
// const TabBarComponent = (props) => (<BottomTabBar {...props} />);

// login stack
const LoginStack = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen }
  },
  {
    initialRouteName: "Welcome",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle,
      cardStyle: { backgroundColor: "#FFFFFF" }
    }),
  }
);

const HomeStack = createStackNavigator(
  {
    UserWrapper: { screen: UserWrapper, navigationOptions: {tabBarLabel: 'Users'} },
    MyReports: { screen: MyReports },
    Reports: { screen: Reports},
  },
  {
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle,
      cardStyle: { backgroundColor: "#FFFFFF" }
    }),
  }
);
const BlackHole = () => [];
const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Barcode: { screen: Barcode },
    Profile: { screen: Profile },
    UserWrapper: { screen: UserWrapper, navigationOptions: {tabBarLabel: 'Users', tabBarButtonComponent: () => false} },
    MyReports: { screen: MyReports, navigationOptions: {
      tabBarButtonComponent: () => false
    }},
    Reports: { screen: Reports, navigationOptions: {
      tabBarButtonComponent: () => false
    }},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = AppIcon.images.home;
        } else if(routeName === "Profile") {
          iconName = AppIcon.images.user;
        } else if(routeName === "Barcode") {
          iconName = AppIcon.images.barcode;
        }
        return (
          <Image
            style={{
              tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
              height: 25,
              width: 25,
            }}
            source={iconName}
          />
        );
      },
    }),
    initialLayout: {
      height: 300,
    },
    // tabBarComponent: (props) => {
    //   // const showMenu = ["Home", "Barcode", "Profile"];
    //   // const index = props.navigation.state.index;
    //   // const menuItem = props.navigation.state.routes[index].key;
    //   return <TabBarComponent {...props} />
    // },
    tabBarOptions: {
      activeTintColor: AppStyles.color.tint,
      inactiveTintColor: "gray",
      showIcon: true,
      style: {
        height: Configuration.home.tab_bar_height,
      },
    }
  },
);

// Manifest of possible screens
const RootNavigator = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: TabNavigator },
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "TabNavigator",
    detachPreviousScreen: true,
    navigationOptions: ({ navigation }) => ({
      color: "black",
    })
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
  }
});

export { RootNavigator, AppNavigator, middleware };
