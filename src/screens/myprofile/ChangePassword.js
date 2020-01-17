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

const ChangePassword = (props) => {
    const { navigate, goBack, getParam } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [oldPassword, setOldPassword] = useState(getParam('')) 
    const [newPassword, setNewPassword] = useState(getParam('')) 
    const [newConfirm, setNewConfirm] = useState(getParam('')) 
    const [isLoading, setLoading] = useState(false)
    const [isValidEmail, setEmailError] = useState(null)
    const [isValidNewPassword, setNewPasswordError] = useState(null)
    const [isValidOldPassword, setOldPasswordError] = useState(null)
    const [isValidRePassword, setRePasswordError] = useState(null)
    const loginResult = useSelector(state => state.login)
    const dispatch = useDispatch()
    const redColor = useDynamicValue(DynamicColor.red)
    const passwordError = 'Please input password.'

    const changePass = () => {
        Keyboard.dismiss();
        var isValid;
        if (oldPassword == '') {
            setOldPasswordError(passwordError)
            return;
        }
        if (Cache.currentUser&&Cache.currentUser.user.password != oldPassword) {
            setOldPasswordError("Please enter current password correctly!")
            return
        }
        
        isValid = newPassword.isValidPassword();
        if (isValid != null) {
            setNewPasswordError(isValid)
            return;
        } else {
            setNewPasswordError(null)
        }
        if (newPassword != newConfirm) {
            setRePasswordError('Password mismatch.')
            return;
        }
        
        setLoading(true);

        GBApi.resetPassword({
            data: {
                id: Cache.currentUser.user.id,
                oldPassword: Cache.currentUser.user.password,
                newPassword: newPassword
            }
        }, (err, res) => {
            if (err == null && res.error == null) {
                alert("Password was updated successfully!")
            } else {
                alert("Update failed!")
            }
            setLoading(false)
        })

    }

    useEffect(() => {
       
    }, [])

    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} showMenu title={"Change Password"}>
            <View style={styles.container}>
                <GBTextInput
                    title="Old Password:"
                    secureTextEntry
                    onChangeText={text => setOldPassword(text)}
                    value={oldPassword}
                    error={isValidOldPassword}
                />
                <GBTextInput
                    title="New Password:"
                    secureTextEntry
                    onChangeText={text => setNewPassword(text)}
                    value={newPassword}
                    error={isValidNewPassword}
                />
                <GBTextInput
                    title="Confirm Password:"
                    secureTextEntry
                    onChangeText={text => setNewConfirm(text)}
                    value={newConfirm}
                    error={isValidRePassword}
                />
                <Button title="Change" onPress={changePass} style={{marginTop: 50}}/>
            </View>
        </BaseScreen>
    )
};

export default ChangePassword;

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