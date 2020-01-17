import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    Alert,
    ScrollView,
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
import RecipientSelector from '../../components/general/RecipientSelector';
import AmountInput from '../../components/general/AmountInput'
import GBApi from '../../service/GBApi';
import PhoneVerifyModal from '../../components/general/PhoneVerifyModal';

const GBTransfer = (props) => {
    const { navigate, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [recipient, setRecipient] = useState({})
    const [phone, setPhone] = useState('')
    const [sendMoney, setSendMoney] = useState('')
    const [receiveMoney, setReceiveMoney] = useState('')
    const [fee, setFee] = useState('1')
    const [isLoading, setLoading] = useState(false)
    const [currencies, setCurrencies] = useState(null)
    const [rcountry, setRCountry] = useState({
        cca2: 'US',
        name: 'USA',
        currency: 'USD'
    })
    const [scountry, setSCountry] = useState({
        cca2: 'US',
        name: 'USA',
        currency: 'USD'
    })
    let phoneModal = null;

    const check = () => {
        console.log("recipient---", recipient)
        if (recipient == null || recipient.id == null) {
            Alert.alert('Information', 'Please select recipient.')
            return;
        }
        if (sendMoney == '') {
            Alert.alert('Information', 'Please input amount you want to send.')
            return
        }

        if (phone == '') {
            Alert.alert('Information', 'Please input your phone number.')
            return;
        }        
        if (phoneModal) {
            phoneModal.showModal()
        }        
    }

    const getFirstCurrency = (currency) => {
        if (typeof currency == 'string') return currency;
        return currency[0]
    }

    const send = () => {
        setLoading(true)        
        GBApi.setTransfer({
            fromCurrency: getFirstCurrency(scountry.currency),
            toCurrency: getFirstCurrency(rcountry.currency),
            toUserId: recipient.id,
            amount: Number(sendMoney)
        }, (err, res) => {
            if (err == null && res.error == null) {
                Alert.alert(recipient.name + " will receive " + res.result.toAmount + " " + getFirstCurrency(rcountry.currency))
            } else {
                Alert.alert('Information', 'Failed to send money!')
            }
            setLoading(false)
        })
    }

    const calcFee = (value, flag) => {

        GBApi.calcFee({
            from_currency: getFirstCurrency(scountry.currency),
            to_currency: getFirstCurrency(rcountry.currency),
            send_amount: flag == 'send' ? Number(value) : 0,
            receive_amount: flag == 'send' ? 0 : Number(value),
        }, (err, res) => {
            console.log(err, res)
            if (err == null && res.error == null) {
                flag == 'send' && setReceiveMoney(res.result.receive_amount);
                flag != 'send' && setSendMoney(res.result.send_amount);
                setFee(res.result.fee.toFixed(2))
            }
        })
    }

    const onChangeSendMoney = (value) => {
        calcFee(value, 'send')
        setSendMoney(value)
    }

    const onChangeReceiveMoney = (value) => {
        calcFee(value, 'receive')
        setReceiveMoney(value)
    }

    const getCurrencies = ()=>{
        GBApi.getCurrencies((err, res)=>{
            console.log('currency', err, res)
            if ( err == null && res.error == null ){
                setCurrencies(res.result.map(o=>o.unit))
            }
        })
    }

    useEffect(()=>{
        getCurrencies()
    }, [])

    useEffect(() => {
        calcFee(sendMoney, 'send')
    }, [rcountry, scountry])

    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} showMenu title="Transfer money">
            <View style={styles.container}>
                <ScrollView>
                    <CountrySelector
                        value={scountry}
                        currencies={currencies}
                        onSelect={value => setSCountry(value)}
                        title="I'm sending from (Country/Currency)"
                    />
                    <CountrySelector
                        value={rcountry}
                        currencies={currencies}
                        onSelect={value => setRCountry(value)}
                        title="To someone in"
                    />
                    <RecipientSelector
                        title="Type or select a saved recipient"
                        value={recipient}
                        onSelect={recipient => setRecipient(recipient)}
                    />
                    <GBTextInput
                        title="Sender phone number"
                        onChangeText={text => setPhone(text)}
                        keyboardType="phone-pad"
                        value={phone}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <AmountInput
                            title="Send"
                            onChangeText={onChangeSendMoney}
                            value={sendMoney}
                            currency={scountry.currency}
                            returnKeyType="next" 
                        />
                        <View style={{ width: 5 }} />
                        <AmountInput
                            title="Recipient will receive"
                            onChangeText={onChangeReceiveMoney}
                            value={receiveMoney}
                            currency={rcountry.currency}
                            returnKeyType="next" 
                        />
                    </View>
                    <Text style={styles.fee}>Fee: {fee} {scountry.currency}</Text>
                <View style={{marginBottom: 100}} />
                </ScrollView>
                <Button title="Send" primary onPress={check} />
            </View>
            <PhoneVerifyModal
                phoneNumber={phone}
                ref={e => phoneModal = e}
                onSuccess={() => send()}
            />
        </BaseScreen>
    )
};

export default GBTransfer;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
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
        backgroundColor: DynamicColor.textInputBack,
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
    },
    fee: {
        fontSize: 14,
        color: DynamicColor.black,
        marginTop: 10
    }
});