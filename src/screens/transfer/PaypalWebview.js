import React, { useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'
import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import GBApi from '../../service/GBApi';

import {withNavigation} from 'react-navigation'

const parseQueryString = function(queryString) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
  };

const PaypalWebview = (props) => {
    const { navigate, goBack, getParam } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [isWaiting, setLoading] = useState(false)
    var approvalUrl = getParam('approvalUrl')
    var payerId = getParam('payerId')

    const _onNavigationStateChange = (webViewState) => {
        // http://localhost:3000/?paymentId=PAYID-LTUQJMI54952106W0274941G&token=EC-1SF46454G5823450E&PayerID=AU8554UR7FZRN
        var urlParams = parseQueryString(webViewState.url.substr(webViewState.url.indexOf('?')+1));
        console.log('urlParams', urlParams)
        if(urlParams['paymentId'] && urlParams['PayerID']) {
            const token = getParam('token');
            console.log('request', JSON.stringify({
                paymentID:urlParams['paymentId'],
                payerID:urlParams['PayerID'],
                token: token,
            }))
            setLoading(true)
            GBApi.executePaypalPayment({
                paymentID:urlParams['paymentId'],
                payerID:urlParams['PayerID'],
                token: token,
            }, (error, result)=>{
                setLoading(false)
                console.log('error, result on executepaypal', error, JSON.stringify(result))
            })
            navigate('PaypalChargeDone')
        }
    }
    

    return (
        <BaseScreen isLoading={isWaiting} onBack={()=>goBack()} showMenu title="Paypal Webview">
            <View style={styles.container}>
                <WebView
                    source={{ uri: approvalUrl }}
                    onNavigationStateChange={_onNavigationStateChange.bind(this)}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={false}
                />
            </View>
        </BaseScreen>
    )
};

export default withNavigation(PaypalWebview);

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
        marginVertical: 5,
    },
    recipientBt: {
        width: '100%',
        height: 48,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: DynamicColor.white,
        marginVertical:5,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        paddingHorizontal: 10,
    },
    recipientText: {
        width: '100%',
    },
    link: {
        color: DynamicColor.black
    }
});