import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import SplashScreen from 'react-native-splash-screen';
// import { StatusBar } from 'react-native';
import AppReducer from "./src/reducers";
// import { appColors } from './src/components/Theme';
import { AppNavigator, middleware } from "./src/navigations/AppNavigation";

const store = createStore(AppReducer, applyMiddleware(middleware));

class StarterApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("rn_starter_kit", () => StarterApp);

export default StarterApp;
