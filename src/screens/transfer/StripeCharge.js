import React, { useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import GBApi from '../../service/GBApi';
import * as config from "../../config";

var stripe = require('stripe-client')(config.stripePubKey);

const StripeCharge = (props) => {
    const { navigate, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    var formDate 
    const [showButton, setShowButton] = useState(false)
    
    const onChange = (formData) => {
        setShowButton(formData.valid)
        formDate = formData
    }

    const done = async () => {
        let { values } = formDate
        let exp = values.expiry.split('/')
        var information = {
            card: {
                number: values.number.replace(/\s/g, "") ,
                exp_month: exp[0],
                exp_year: "20"+exp[1],
                cvc: values.cvc,
                name: values.name
            }
        }
        var card = await stripe.createToken(information);
        console.log('card', card)
        var token = card.id;
        if ( token ){
            navigate('ChargeMoney', {token: card})
        }else{
            alert(card.error.message)
        }
    }

    return (
        <BaseScreen onBack={()=>goBack()} showMenu title="Stripe">
            <View style={styles.container}>
                <ScrollView style={{flex: 1, width: '100%'}}>
                    <CreditCardInput
                        autoFocus
                        requiresName
                        requiresCVC
                        labelStyle={styles.label}
                        inputStyle={styles.input}
                        // inputContainerStyle={{backgroundColor:'rgb(200,255,200)'}}
                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}
                        onFocus={()=>{}}
                        onChange={onChange.bind(this)} />
                </ScrollView>   
                <Button title="Charge" onPress={done} />
            </View>
        </BaseScreen>
    )
};

export default StripeCharge;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    },
    cardContainer: {
        flex:1,
        marginTop: 60,
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
    chargeButton: {
        height:50, 
        width:'100%', 
        justifyContent:'center',
        alignItems:'center', 
    },
    chargeText: {
        fontSize:12, 
        fontWeight:'bold', 
        color:'white'
    }
});