import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Barcode from "../screens/barcode/Barcode.react";
import MyReports from "../screens/reports/MyReports.react";
import Reports from "../screens/reports/Reports.react";
import UserWrapper from "../screens/users/UserWrapper.react";
import Profile from "../screens/users/Profile.react";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
    return (
        <Tab.Navigator
            initialRouteName={HomeScreen}
            tabBarOptions={{
                showLabel: false,
                style:{
                    height: 70,
                    paddingBottom: 10,
                    // backgroundColor: appColors.bottomTabsBG,
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            {/* <Image source={focused ? HomeTabActiveIcon : HomeTabIcon} resizeMode={'contain'} style={{width: 25, height: 25}} /> */}
                            <Text style={{}}>Home</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;