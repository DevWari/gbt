import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
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
import AmountInput from '../../components/general/AmountInput'
import Images from '../../common/Images';

import { useDispatch, useSelector } from 'react-redux'
import { CurrencyAction } from '../../redux/actions'

const ChargeMoney = (props) => {
    const { navigate, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [amount, setAmount] = useState('')
    const [isWaiting, setLoading] = useState(false)
    const [isValidAmount, setAmountError] = useState(null)
    const [currencies, setCurrencies] = useState(null)
    const dispatch = useDispatch()

    const [country, setCountry] = useState({
        cca2: 'US',
        name: 'USA',
        currency: 'USD'
    })

    const charge = () => {
        const isValid = amount.isEmptyText();
        if (isValid != null) {
            setAmountError(isValid)
            return;
        } else {
            setAmountError(null)
        }
        setLoading(true)
        const product = {
            name: "Greenbay",
            currency:country.currency[0],
            price: Number(amount),
            description: "Stripe charge"
        }
        var token = props.navigation.state.params&&props.navigation.state.params.token
        console.log("charge info--->", token, product)
        GBApi.chargeStripe({ token, product }, (err, res)=>{
            setLoading(false)
            if ( err == null ){
                alert('Charged money successfully!')
                goBack()
            }else{
                alert('Failed!')
                console.log(err, res)
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
        <BaseScreen isLoading={isWaiting} onBack={() => goBack()} showMenu title="Charge Money">
            <View style={styles.container}>
                <View style={{flex: 1, width: '100%'}}>
                    <GBTextInput
                        title={'Account'}
                        onChangeText={setAmount}
                        value={amount}
                        placeholder={'You send exactly'}
                        placeholderTextColor={'grey'}
                        returnKeyType="next"
                        keyboardType="numeric"
                        error={isValidAmount}
                    />  
                    <CountrySelector
                        value={country}
                        currencies={currencies}
                        onSelect={value => setCountry(value)}
                        title="I'm charging from (Country/Currency)"
                    /> 
                </View>
                <Button title="Done" onPress={charge}/>
            </View>
        </BaseScreen>
    )
};

export default ChargeMoney;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    },
    buttonContainer: {
        width: '100%',
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DynamicColor.white,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor
    },
    buttonText: {
        color: DynamicColor.black,
        fontWeight: 'bold'
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
        marginVertical: 5,
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