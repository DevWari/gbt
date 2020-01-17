import React, { useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'
import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import CountrySelector from '../../components/general/CountrySelector';
import GBApi from '../../service/GBApi';

const PaypalCharge = (props) => {
    const { navigate, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [chargeAmount, setChargeAmount] = useState('')
    const [isWaiting, setLoading] = useState(false)
    const [country, setCountry] = useState({
        cca2: 'US',
        name: 'USA',
        currency: 'USD'
    })

    const deposit = () => {
        setLoading(true)
        GBApi.createPaypalPayment({
            //token:token,
            amount:Number(chargeAmount),
            currency:country.currency
        }, (error, result)=>{
            setLoading(false)
            console.log(error, result);
            if(!error && !result.error) {
                var approvalUrl = result.result.result.links.find(o=>o.rel == 'approval_url').href
                var payerId = result.result.result.id
                navigate('PaypalWebview', {
                    approvalUrl: approvalUrl,
                    payerId: payerId,
                    token:result.result.result.access_token,
                })
                Actions.PaypalWebview({
                    approvalUrl: approvalUrl,
                    payerId: payerId,
                    token:result.result.result.access_token,
                })
            }
        })
    }
    
    return (
        <BaseScreen isLoading={isWaiting} onBack={()=>goBack()} showMenu title="Paypal Deposit Done">
            <View style={styles.container}>
                <Text style={styles.title}>
                    Deposit success!
                </Text>
            </View>
        </BaseScreen>
    )
};

export default PaypalCharge;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        color: DynamicColor.black,
        fontSize: 24,
    },
});