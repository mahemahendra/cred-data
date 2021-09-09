import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import SplashScreen from 'react-native-splash-screen';
// import { StatusBar } from 'react-native';
import AppReducer from "./src/reducers";
import { StackNavigator } from 'react-navigation';
// import { appColors } from './src/components/Theme';
import Toast from 'react-native-toast-message';
import { AppNavigator, middleware } from "./src/navigations/AppNavigation";

const store = createStore(AppReducer, applyMiddleware(middleware));

class StarterApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("rn_starter_kit", () => StarterApp);

export default StarterApp;
