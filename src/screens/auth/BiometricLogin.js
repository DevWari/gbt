import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux'
import { LoginAction, GetRecipient } from '../../redux/actions'
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import UtilService from '../../utils/util';

const Login = (props) => {
    const { navigate, goBack, getParam } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [email, setEmail] = useState(getParam('email') || '') 
    const [password, setPassword] = useState(getParam('password') || '')
    const [isLoading, setLoading] = useState(false)
    const [isValidEmail, setEmailError] = useState(null)
    const [isValidPassword, setPasswordError] = useState(null)
    const [canCheckLogin, setCanCheckLogin] = useState(false)
    const [hasKeychain, setKeychainFlag] = useState(true)
    const loginResult = useSelector(state => state.login)
    const dispatch = useDispatch()
    const greyColor = useDynamicValue(DynamicColor.lightText)

    const alertText = 'Please input email and password correctly!'
    const passwordError = 'Please input password.'

    const login = () => {

        const isValid = email.isValidEmail();
        if (isValid != null) {
            setEmailError(isValid)
            return;
        } else {
            setEmailError(null)
        }

        if (password == '') {
            setPasswordError(passwordError)
            return;
        }


        UtilService.touchAuthenticate(() => {
            setCanCheckLogin(true)
            dispatch(LoginAction(email, password, true))
        })
    }

    const checkLogin = async () => {
        if (!canCheckLogin) return;

        if (loginResult && (loginResult.error != null || loginResult.user != null)) {
            if (loginResult.error == null) {
                if (loginResult.isTouchID) {
                    navigate('Transfer')
                    dispatch(GetRecipient())
                    const update = getParam('update')
                    if (update) update()
                    await Keychain.setGenericPassword(email, password, {
                        // accessControl:Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
                    });
                }
            }
        }
    }

    const checkKeychain = async () => {
        const credential = await Keychain.getGenericPassword()
        console.log('credential', credential)
        if (credential && credential.username) {
            setEmail(credential.username)
            setPassword(credential.password)
            setKeychainFlag(true)
        } else {
            setKeychainFlag(false)
        }
    }

    const reset = () => {

        UtilService.touchAuthenticate(() => {
            Keychain.resetGenericPassword()
            setEmail('')
            setPassword('')
            setKeychainFlag(false)
        })
    }

    useEffect(() => {
        checkLogin()
    }, [loginResult])

    useEffect(() => {
        checkKeychain()
    }, [])

    return (
        <BaseScreen isLoading={loginResult && loginResult.isLoading} onBack={() => goBack()} showMenu title={"Login by TouchId"}>
            <View style={styles.container}>
                {!hasKeychain && <GBTextInput
                    title="Email Address:"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    error={isValidEmail}
                />}
                {!hasKeychain && <GBTextInput
                    title="Password:"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                    error={isValidPassword}
                />}
                {hasKeychain && <Ionicons name="ios-finger-print" size={60} color={greyColor} />}
                <View style={{ height: 20 }} />
                <Button title="Login" onPress={login} />
                {hasKeychain && <Button title="Reset" onPress={reset} />}
            </View>
        </BaseScreen>
    )
};

export default Login;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    },
    link: {
        color: DynamicColor.black
    },
});