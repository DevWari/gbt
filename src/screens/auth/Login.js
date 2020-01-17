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

const Login = (props) => {
    const { navigate, goBack, getParam } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [email, setEmail] = useState(getParam('email') || '')
    const [password, setPassword] = useState(getParam('password') || '')
    const [isLoading, setLoading] = useState(false)
    const [isValidEmail, setEmailError] = useState(null)
    const [isValidPassword, setPasswordError] = useState(null)
    const [canCheckLogin, setCanCheckLogin] = useState(false)
    const loginResult = useSelector(state => state.login)
    const dispatch = useDispatch()
    const redColor = useDynamicValue(DynamicColor.red)

    const alertText = 'Please input email and password correctly!'
    const passwordError = 'Please input password.'

    const checkLogin = async () => {
        if (!canCheckLogin) return;

        if (loginResult && (loginResult.error != null || loginResult.user != null)) {
            
            if (loginResult.error == null) {
                navigate('Transfer')
                dispatch(GetRecipient())
                const update = getParam('update')
                if (update) update()
            } else {
                setCanCheckLogin(false)
                Alert.alert('Information', alertText)
            }
        }

    }

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

        setCanCheckLogin(true)
        dispatch(LoginAction(email, password))

    }

    const callback = (params) => {
        setEmail(params.email)
        setPassword(params.password)
    }

    const gotoRegister = () => {
        navigate('Register', { update: callback })
    }

    const touchLogin = () => {
        navigate('BiometricLogin');
    }

    const gotoForgotPass = () => {
        navigate('ForgotPassword');
    }

    useEffect(() => {
        checkLogin()
    }, [loginResult])

    return (
        <BaseScreen isLoading={loginResult && loginResult.isLoading} onBack={() => goBack()} showMenu title={"Login"}>
            <View style={styles.container}>
                <GBTextInput
                    title="Email Address:"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    error={isValidEmail}
                />
                <GBTextInput
                    title="Password:"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                    error={isValidPassword}
                    returnKeyType="next"
                />
                <Text style={{ marginTop: 50 }}>New user?</Text>
                <Button title="Login" onPress={login} />
                <Button title="Create Account" onPress={gotoRegister} />
                <TouchableOpacity onPress={() => touchLogin()} style={styles.touchId}>
                    <Ionicons name="ios-finger-print" size={40} color={redColor} />
                    <Text style={styles.touchText}>or Use Touch ID</Text>
                </TouchableOpacity>
                <View style={{flex: 1}} />
                <TouchableOpacity onPress={() => gotoForgotPass()}>
                    <Text style={styles.forgotPass}>Forgot Password</Text>
                </TouchableOpacity>
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
    touchId: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'center'
    },
    touchText: {
        fontSize: 16,
        color: DynamicColor.black,
        marginLeft: 10
    },
    forgotPass: {
        textDecorationLine: 'underline',
        textDecorationColor: DynamicColor.darkPrimary,
        color: DynamicColor.black,
        marginVertical:8
    },
});