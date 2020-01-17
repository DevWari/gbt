import React, { useState, useEffect } from 'react';

import {
    View, Text, ScrollView, Alert, TouchableOpacity, TextInput
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import Cache from "../../utils/cache";
import GBApi from '../../service/GBApi';
import Avatar from '../../components/general/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserAction, GetRecipient } from '../../redux/actions'

var moment = require("moment")

const Home = (props) => {
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [isLoading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [code, setCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [walletId, setWalletId] = useState('')
    const [updated, setUpdated] = useState('')
    const [image, setImage] = useState({uri:''})

    const save = () => {
        setLoading(true)
        GBApi.updateProfile({
            data: {
                id: Cache.currentUser.user.id,
                name: name,
                email: email,
                country: country,
                city: city,
                phone: phone,
                code: code,
                address: address1,
                image:image.uri
            }
        }, (err, res) => {
            if (err == null && res.error == null) {
                setLoading(false)
                Cache.currentUser.user.name = name
                setTimeout(() => Alert.alert('Profile is updated successfully!'), 100)
            }
        })
    }

    const getUser = () => {
        setLoading(true)
        const myId = Cache.currentUser.user.id
        GBApi.getUser(myId, (err, res) => {
            if (err == null && res.error == null) {
                setName(res.result.name)
                setEmail(res.result.email)
                setPhone(res.result.phone)
                setCode(res.result.code)
                setCountry(res.result.country)
                setCity(res.result.city)
                setAddress1(res.result.address)
                setWalletId(res.result.walletId.toString())
                setUpdated(moment(res.result.updatedAt).format('DD-MMM-YYYY'))
                setImage({uri:res.result.image})
            }
            setLoading(false)
        })
    }

    const gotoChangePass = () => {
        navigate('ChangePassword');
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} title="Profile">
            <View style={styles.container}>
                <ScrollView>
                    <Avatar
                        image={image}
                        onChange={(image)=>setImage(image)}
                        setLoading={setLoading}
                    />
                    <GBTextInput
                        title="Name:"
                        onChangeText={text => setName(text)}
                        value={name}
                    />
                    <GBTextInput
                        title="Email:"
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                        value={email}
                    />
                    <GBTextInput
                        title="Phone number:"
                        onChangeText={text => setPhone(text)}
                        keyboardType="phone-pad"
                        value={phone}
                    />
                    <GBTextInput
                        title="Country:"
                        onChangeText={text => setCountry(text)}
                        value={country}
                    />
                    <GBTextInput
                        title="City:"
                        onChangeText={text => setCity(text)}
                        value={city}
                    />
                    <GBTextInput
                        title="Address:"
                        onChangeText={text => setAddress1(text)}
                        value={address1}
                    />
                    <GBTextInput
                        title="Postal Code:"
                        onChangeText={text => setCode(text)}
                        keyboardType={'numeric'}
                        returnKeyType="next"
                        value={code}
                    />
                    <GBTextInput
                        title="Wallet Id:"
                        onChangeText={text => setWalletId(text)}
                        value={walletId}
                        editable={false}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <GBTextInput
                            title="Updated Date:"
                            onChangeText={text => setUpdated(text)}
                            value={updated}
                            style={{ width: '50%' }}
                            editable={false}
                        />
                        <TouchableOpacity onPress={() => gotoChangePass()} style={styles.changePassContainer}>
                            <Text style={styles.changePass}>Change Password</Text>
                        </TouchableOpacity>
                        <View styles={{ flex: 1 }} />
                    </View>
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <Button title="Save" primary onPress={save} style={{ marginTop: 30 }} />
            </View>
        </BaseScreen>
    )
};

export default Home;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    },
    changePassContainer: {
        right: 10,
        bottom: 0,
        position: 'absolute'
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
    },
    changePass: {
        textDecorationLine: 'underline',
        textDecorationColor: DynamicColor.darkPrimary,
        color: DynamicColor.black,
        marginVertical: 8
    },
});