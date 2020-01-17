import React, { useState, useEffect } from 'react';

import {
    View,
    Image,
    Text,
    ScrollView,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../common/Color';
import Button from '../components/general/Button';
import Images from '../common/Images';
import GBApi from '../service/GBApi';

import { useDispatch } from 'react-redux'
import { GetRecipient, LockAction } from '../redux/actions'
import BaseScreen from '../components/general/BaseScreen';



const Welcome = (props) => {
    const { navigate, setParams } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const title = `The easy and safe\nway to transfer\nmoney worldwide`
    const logo = useDynamicValue(Images.icons.logo, Images.icons.dark_logo)
    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const goLogin = () => {
        navigate('Login')
    }

    const callback = (params) => {
        navigate('Login', { ...params })
    }

    const goRegister = () => {
        navigate('Register', { update: callback })
    }

    const goTransfer = () => {
        navigate('Transfer')
    }

    const goHowTo = () => {
        navigate('HowTo')
    }

    useEffect(() => {
        GBApi.init((err, user) => {
            if (user != null) {
                navigate('Transfer')
                dispatch(GetRecipient())
                dispatch(LockAction(false))
            }
            setLoading(false)
        })




        

    }, [])

    return (
        <BaseScreen isLoading={isLoading} style={styles.container}>
            <View style={styles.darkBack} />
            <>
                <View style={styles.logoContainer}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <Image source={logo} style={styles.image} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Button title="Direct Transfer" onPress={goTransfer} />
                </View>
                <View style={styles.bottom}>
                    <Button title="Login" onPress={goLogin} />
                    <Button title="Create Account" onPress={goRegister} />
                    <Button title="How does it work?" onPress={goHowTo} />
                </View>
            </>
        </BaseScreen>
    )
};

export default Welcome;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: DynamicColor.darkPrimary,
        padding: 20
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        color: DynamicColor.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
        marginVertical: 5
    },
    bottom: {
        padding: 20,
        backgroundColor: DynamicColor.lightPrimary
    },
    darkBack: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 300,
        backgroundColor: DynamicColor.darkPrimary
    }
});