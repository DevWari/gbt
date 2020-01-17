import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBApi from '../../service/GBApi';

const Transfer = (props) => {
    const { navigate, goBack, reset } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [isLoggedIn, setLogin] = useState(GBApi.isLoggedIn())
    
    const onGoDetail=(link)=>{
        if ( GBApi.isLoggedIn()){
            navigate(link)
        }else{
            navigate('Login', {update:()=>{
                setLogin(true)
            }})
        }
    }

    return (
        <BaseScreen onBack={!isLoggedIn?()=>goBack():null} title="Transfer from:">
            <View style={styles.container}>
                <Button title="Greenbay Transfer" onPress={()=>onGoDetail('GBTransfer')}/>                
                <Button title="Exchange" onPress={()=>onGoDetail('Exchange')}/>
                <Button title="Paypal" onPress={()=>onGoDetail('PaypalMenu')}/>
                <Button title="Credit Card" onPress={()=>onGoDetail('StripeCharge')}/>
                <Button title="Bank Account" onPress={()=>{}}/>
            </View>
        </BaseScreen>
    )
};

export default Transfer;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20,
    }
});