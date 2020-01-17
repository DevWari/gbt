import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    ScrollView,
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
    const [currencies, setCurrencies] = useState(null)
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
    
    const getCurrencies = ()=>{
        GBApi.getCurrencies((err, res)=>{
            if ( err == null && res.error == null ){
                setCurrencies(res.result.map(o=>o.unit))
            }
        })
    }

    useEffect(()=>{
        getCurrencies()
    }, [])

    return (
        <BaseScreen isLoading={isWaiting} onBack={()=>goBack()} showMenu title="Paypal Deposit">
            <View style={styles.container}>
                <ScrollView style={{width: '100%'}}>
                    <View>
                        <GBTextInput
                            title={'Deposit Amount'}
                            onChangeText={text => setChargeAmount(text)}
                            value={chargeAmount}
                            placeholder={'Your charge amount'}
                            placeholderTextColor={'grey'}
                            keyboardType="numeric"
                            returnKeyType="next"
                            // error={isValidAccount}
                        />  
                        <CountrySelector
                            value={country}
                            currencies={currencies}
                            onSelect={value => setCountry(value)}
                            title="I'm charging from (Country/Currency)"
                        /> 
                    </View>
                    <Button title="Done" onPress={deposit} style={{marginTop: 20}}/>
                </ScrollView>
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
        padding: 20
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