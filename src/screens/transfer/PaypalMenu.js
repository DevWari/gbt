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
import NavBar from '../../components/general/NavBar';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import CountrySelector from '../../components/general/CountrySelector';
import AmountInput from '../../components/general/AmountInput'
import Images from '../../common/Images';

const PaypalMenu = (props) => {
    const { navigate, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [recipient, setRecipient] = useState('')
    const [phone, setPhone] = useState('')
    const [fee, setFee] = useState('1')
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

    const goPaypalCharge = () => {
        navigate('PaypalCharge')
    }
    
    const goPaypalWithdraw = () => {
        navigate('PaypalWithdraw')
    }

    return (
        <BaseScreen onBack={()=>goBack()} showMenu title="Paypal">
            <View style={styles.container}>
                <Button title="Paypal Deposit" onPress={goPaypalCharge}/>
                <Button title="Paypal Withdraw" onPress={goPaypalWithdraw}/>
            </View>
        </BaseScreen>
    )
};

export default PaypalMenu;

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