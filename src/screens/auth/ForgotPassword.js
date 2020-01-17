import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    ScrollView,
    Alert,
    Keyboard
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
import GBApi from '../../service/GBApi';

import { useDispatch, useSelector } from 'react-redux'
import { LoginAction, GetRecipient } from '../../redux/actions'
import Cache from '../../utils/cache'

const ForgotPassword = (props) => {
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

    const resetPass = () => {
        Keyboard.dismiss();
        const isValid = email.isValidEmail();
        if (isValid != null) {
            setEmailError(isValid)
            return;
        } else {
            setEmailError(null)
        }
        
        if (Cache.currentUser&&Cache.currentUser.user.email != email) {
            alert("Please enter current email correctly!")
            return
        }
        setLoading(true);

        GBApi.forgotPassword({
            email: email,
        }, (err, res) => {
            if (err == null && res.error == null) {
                alert("Please go to your email and get new password! ")
            }
            setLoading(false)
        })

    }

    useEffect(() => {
       
    }, [])

    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} showMenu title={"Forgot Password"}>
            <View style={styles.container}>
                <GBTextInput
                    title="Email Address:"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    error={isValidEmail}
                />
                <Button title="Reset Password" onPress={resetPass} />
            </View>
        </BaseScreen>
    )
};

export default ForgotPassword;

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