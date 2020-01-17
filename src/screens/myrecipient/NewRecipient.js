import React, { useState, useEffect } from 'react';

import {
    View, Text,ScrollView
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';

const Home = (props) => {
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [name, setName] = useState('Mikael Bramstedt')
    const [phone, setPhone] = useState('+46764206525')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expire, setExpire] = useState('')

    const save = () => {
       
    }

    return (
        <BaseScreen onBack={()=>goBack()} title="Recipient">
            <ScrollView style={styles.container}>
                <GBTextInput
                    title="Name:"
                    onChangeText={text=>setName(text)}
                    text={name}
                />
                <GBTextInput
                    title="Phone number:"
                    onChangeText={text=>setPhone(text)}
                    text={phone}
                />
                <GBTextInput
                    title="Address:"
                    onChangeText={text=>setAddress1(text)}
                    text={address1}
                />
                <GBTextInput
                    title="Address line 2:"
                    onChangeText={text=>setAddress2(text)}
                    text={address2}
                />
                <GBTextInput
                    title="Postal Code:"
                    onChangeText={text=>setPostalCode(text)}
                    text={postalCode}
                />
                <GBTextInput
                    title="City:"
                    onChangeText={text=>setCity(text)}
                    text={city}
                />
                <GBTextInput
                    title="Card number:"
                    onChangeText={text=>setCardNumber(text)}
                    text={cardNumber}
                />
                <GBTextInput
                    title="Expire:"
                    onChangeText={text=>setExpire(text)}
                    text={expire}
                    style={{width: '50%'}}
                />
                <Button title="Save" primary onPress={save} style={{marginTop: 30}} />
                <View style={{marginBottom: 50}} />
            </ScrollView>
        </BaseScreen>
    )
};

export default Home;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding:20
    }
});