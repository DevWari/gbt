import React, { useState } from 'react'

import { Text, View, Image, TouchableOpacity } from 'react-native'

import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';
import Feather from 'react-native-vector-icons/Feather'
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../common/Images';

const RecipientSelector = ({ title, value, onSelect, ...props }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const blackColor = useDynamicValue(DynamicColor.black)
    const [recipient, setRecipient] = useState(value || {})
    const onClick = () => {
        props.navigation.navigate('MyRecipient', {
            update: (newValue) => {
                if (onSelect) onSelect(newValue)
                setRecipient(newValue)
            }
        })
    }
    const callback = (param) => {
        if (onSelect) onSelect(param)
        setRecipient(param)
    }

    const qrScan = () => {
        props.navigation.navigate('QRScan', { update: callback })
    }
    return (
        <View style={[styles.container, props.style]}>
            {title = !null && title != '' && <Text style={styles.title}>{title}</Text>}
            <View style={styles.content}>
                <TouchableOpacity onPress={onClick} style={styles.button}>
                    <Image source={{ uri: recipient.image || '' }} style={styles.image} />
                    <Text style={styles.country}>{recipient.name}</Text>
                    <View style={{ flex: 1 }} />
                    <Feather name="chevron-down" size={24} color={blackColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => qrScan()} style={styles.qrbutton}>
                    <Ionicons name="ios-qr-scanner" size={26} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

RecipientSelector.defaultProps = {
    title: 'Select a country',
    value: {
        cca2: 'US',
        currency: 'USD',
        flag: '',
        name: 'United State'
    },
    onSelect: () => alert('Perfect!')
}

export default withNavigation(RecipientSelector);

const dynamicStyles = new DynamicStyleSheet({
    container: {
        width: '100%',
        marginVertical: 5
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
        marginBottom: 3,
    },
    button: {
        height: 50,
        flex:1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: DynamicColor.textInputBack
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: 'contain'
    },
    country: {
        fontSize: 14,
        color: DynamicColor.darkText,
        marginLeft: 10
    },
    currency: {
        fontSize: 12,
        marginRight: 10,
        color: DynamicColor.text
    },
    content:{
        flexDirection:'row'
    },
    qrbutton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DynamicColor.darkPrimary,
        borderRadius: 10,
        marginLeft: 10,
    },
    qrText: {
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10
    },
})