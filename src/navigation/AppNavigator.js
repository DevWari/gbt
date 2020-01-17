import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Welcome from '../screens/Welcome';
import Login from '../screens/auth/Login';
import BiometricLogin from '../screens/auth/BiometricLogin';
import Register from '../screens/auth/Register'
import ForgotPassword from '../screens/auth/ForgotPassword';
import Transfer from '../screens/transfer'
import GBTransfer from '../screens/transfer/GBTransfer'
import Exchange from '../screens/transfer/Exchange'
import PaypalMenu from '../screens/transfer/PaypalMenu'
import PaypalWithdraw from '../screens/transfer/PaypalWithdraw'
import PaypalWebview from '../screens/transfer/PaypalWebview'
import PaypalCharge from '../screens/transfer/PaypalCharge'
import PaypalChargeDone from '../screens/transfer/PaypalChargeDone'
import StripeCharge from '../screens/transfer/StripeCharge'
import ChargeMoney from '../screens/transfer/ChargeMoney'
import QRScan from '../screens/transfer/QRScan'
import MyProfile from '../screens/myprofile' 
import ChangePassword from '../screens/myprofile/ChangePassword' 
import MyRecipient from '../screens/myrecipient'
import NewRecipient from '../screens/myrecipient/NewRecipient'
import HowTo from '../screens/howto'
import Info from '../screens/howto/Info'
import MyWallet from '../screens/mywallet'
import MyTransfers from '../screens/mytransfers'
import LiveRates from '../screens/liverates'

import NavBar from '../components/general/NavBar'

export default createAppContainer(
  createStackNavigator(
    {
      Welcome,
      Login,
      BiometricLogin,
      Register,
      ForgotPassword,
      Transfer,
      GBTransfer,     
      Exchange,
      PaypalMenu,
      PaypalWithdraw,
      PaypalCharge,
      PaypalChargeDone,
      StripeCharge,
      ChargeMoney,
      QRScan,
      MyProfile,
      ChangePassword,
      MyRecipient,
      NewRecipient,
      HowTo,
      Info,
      MyWallet,
      MyTransfers,
      PaypalWebview,
      LiveRates,
    },
    {
      initialRouteName: 'Welcome',
      defaultNavigationOptions: {
        header: props => <NavBar {...props} />,
        gesturesEnabled: false,
      },
      
    },
  ),
);
