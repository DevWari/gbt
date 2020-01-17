/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { DarkModeProvider } from 'react-native-dark-mode';
import { YellowBox } from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'

import { Provider } from 'react-redux'
import Store from './src/redux/store'

import OneSignal from 'react-native-onesignal';
const ONESIGNAL_APP_ID = "5a1bfa16-9a43-44ad-a29c-6afc84b3610a"

import Cache from './src/utils/cache'
// import ZendeskSupport from '@synapsestudios/react-native-zendesk-support';
import * as Zendesk from 'react-native-zendesk'


const App = () => {

  const onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  const onIds = (device) => {
    console.log('Device info: ', device);
    Cache.pushToken = device.pushToken
    SplashScreen.hide();
  }

  const initZendesk = () => {
    const config = {
      appId: '738437f6af0e47481ea490317c9c4276cc4425dd8d89c54f',
      zendeskUrl: 'https://westindiatech.zendesk.com',
      clientId: 'mobile_sdk_client_693cffd200bbb0a08273'
    }
    // ZendeskSupport.initialize(config)
    // ZendeskSupport.setupIdentity(null)

    Zendesk.initialize(config)
    Zendesk.identifyAnonymous()
    

  }

  useEffect(() => {

    console.disableYellowBox = true;

    OneSignal.init(ONESIGNAL_APP_ID);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    initZendesk()

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }


  }, [])

  return (
    <Provider store={Store}>
      <DarkModeProvider>
        <AppNavigator />
      </DarkModeProvider>
    </Provider>
  );
};
export default App;

YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]` is deprecated and will be deleted soon.',]);