import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appColors } from './Theme';

import Dashboard from '../screens/dashboard/Dashboard.react';
import Profile from '../screens/profile/Profile.react';

import TrackerTabIcon from '../../assets/bottom_menu_tracker_normal.png';
import TrackerTabActiveIcon from '../../assets/bottom_menu_tracker_active.png';
import HomeTabIcon from '../../assets/bottom_menu_home_normal.png';
import HomeTabActiveIcon from '../../assets/bottom_menu_home_active.png';
import ReportsTabIcon from '../../assets/bottom_menu_reports_normal.png';
import ReportsTabActiveIcon from '../../assets/bottom_menu_reports_active.png';
import NotificationTabIcon from '../../assets/bottom_menu_notifications_normal.png';
import NotificationTabActiveIcon from '../../assets/bottom_menu_notifications_active.png';

import Notifications from '../screens/notifications/Notifications.react';
import MyTracker from '../screens/myTracker/MyTracker.react';
import Reports from '../screens/reports/Reports.react';
import Medications from '../screens/medications/Medications.react';
import DoseScheduling from '../screens/medications/dose-scheduling/DoseScheduling.react';
import AddMedications from '../screens/medications/add-medications/AddMedications.react';

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
    return (
        <Tab.Navigator
            initialRouteName={props.defaultPage}
            tabBarOptions={{
                showLabel: false,
                style:{
                    height: 70,
                    paddingBottom: 10,
                    backgroundColor: appColors.bottomTabsBG,
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={Dashboard}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image source={focused ? HomeTabActiveIcon : HomeTabIcon} resizeMode={'contain'} style={{width: 25, height: 25}} />
                            <Text style={{color: focused ? appColors.primeryColor : appColors.black }}>Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name='MyTracker' component={MyTracker} options={{
                tabBarIcon: ({focused, size}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image source={focused ? TrackerTabActiveIcon : TrackerTabIcon} resizeMode={'contain'} style={{width: 25, height: 25}} />
                        <Text style={{color: focused ? appColors.primeryColor : appColors.black }}>My Tracker</Text>
                    </View>
                )
            }} />

            <Tab.Screen name='Reports' component={Reports} options={{
                tabBarIcon: ({focused, size}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image source={focused ? ReportsTabActiveIcon : ReportsTabIcon} resizeMode={'contain'} style={{width: 25, height: 25}} />
                        <Text style={{color: focused ? appColors.primeryColor : appColors.black }}>Reports</Text>
                    </View>
                )
            }} />

            <Tab.Screen name='Notifications' component={Notifications} options={{
                tabBarIcon: ({focused, size}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image source={focused ? NotificationTabActiveIcon : NotificationTabIcon} resizeMode={'contain'} style={{width: 25, height: 25}} />
                        <Text style={{color: focused ? appColors.primeryColor : appColors.black }}>Notifications</Text>
                    </View>
                )
            }} />

            <Tab.Screen name='Profile' component={Profile} options={{
                tabBarVisible: false, tabBarButton:() => false,
            }} />

            <Tab.Screen name='Medications' component={Medications} options={{
                tabBarVisible: true, tabBarButton:() => true
            }} />

            <Tab.Screen name='DoseTime' component={DoseScheduling} options={{
                tabBarVisible: true, tabBarButton:() => true
            }} />

            <Tab.Screen name='AddMedices' component={AddMedications} options={{
                tabBarVisible: true, tabBarButton:() => true
            }} />

        </Tab.Navigator>
    );
}

export default Tabs;