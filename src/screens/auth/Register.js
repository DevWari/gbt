import React, { useState, useEffect } from 'react';

import {
    View, Alert, ScrollView
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import GBApi from '../../service/GBApi';

const Register = (props) => {
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [email, setEmail] = useState('')

    const [isLoading, setLoading] = useState(false)
    const [isValidUser, setUserError] = useState(null)
    const [isValidEmail, setEmailError] = useState(null)
    const [isValidPassword, setPasswordError] = useState(null)
    const [isValidRepassword, setRepasswordError] = useState(null)
    const [isValidPhone, setPhoneError] = useState(null)
    const alertText = 'Please input user info correctly!'
    const passwordError = 'Please input password.'


    const register = () => {
        const callback = props.navigation.getParam('update')
        // goBack()
        // callback('Perfect')
        // return ;
        var isValid;
        isValid = username.isEmptyText();
        if (isValid != null) {
            setUserError(isValid)
            return;
        } else {
            setUserError(null)
        }

        isValid = email.isValidEmail();
        if (isValid != null) {
            setEmailError(isValid)
            return;
        } else {
            setEmailError(null)
        }

        isValid = password.isValidPassword();
        if (isValid != null) {
            setPasswordError(isValid)
            return;
        } else {
            setPasswordError(null)
        }

        if (password != repassword) {
            setRepasswordError('Password mismatch.')
            return;
        }

        isValid = phone.isValidPhoneNumber();
        if (isValid != null) {
            setPhoneError(isValid)
            return;
        } else {
            setPhoneError(null)
        }

        setLoading(true)

        

        GBApi.signup({
            data: {
                name: username.trim(),
                email: email.trim(),
                password: password.trim(),
                phone: '+' + phone,
            }
        }, (err, res) => {
            if (err == null) {
                Alert.alert('Register Success', 'Verification has been sent to your email. Please check your email.')
                goBack()
                callback({email: email, password: password})
            } else {
                Alert.alert('Information', alertText)
            }
            setLoading(false)
        })
    }

    useEffect(() => {

    }, [])

    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} title="Register">
            <View style={styles.container}>
                <ScrollView>
                    <GBTextInput
                        title="User name:"
                        onChangeText={text => setUsername(text)}
                        text={username}
                        error={isValidUser}
                    />
                    <GBTextInput
                        title="Phone number:"
                        onChangeText={text => setPhone(text)}
                        text={phone}
                        keyboardType="phone-pad"
                        error={isValidPhone}
                    />
                    <GBTextInput
                        title="Password:"
                        onChangeText={text => setPassword(text)}
                        text={password}
                        error={isValidPassword}
                        secureTextEntry={true}
                    />
                    <GBTextInput
                        title="Repeat Password:"
                        onChangeText={text => setRepassword(text)}
                        text={repassword}
                        error={isValidRepassword}
                        secureTextEntry={true}
                    />
                    <GBTextInput
                        title="Email Address:"
                        onChangeText={text => setEmail(text)}
                        text={email}
                        keyboardType="email-address"
                        returnKeyType="next"
                        error={isValidEmail}
                    />
                    <View style={{ marginBottom: 100 }} />
                </ScrollView>
                <Button title="Continue" onPress={register} style={{ marginTop: 30 }} />
            </View>
        </BaseScreen>
    )
};

export default Register;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    }
});