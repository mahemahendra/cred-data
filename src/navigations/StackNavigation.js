import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Barcode from "../screens/barcode/Barcode.react";
import MyReports from "../screens/reports/MyReports.react";
import Reports from "../screens/reports/Reports.react";
import UserWrapper from "../screens/users/UserWrapper.react";
import Profile from "../screens/users/Profile.react";

export default Project = StackNavigator({
    Home: { screen: HomeScreen },
    MyReports: { screen: MyReports }
});