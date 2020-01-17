import React from 'react'

import {View} from 'react-native'
import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import DynamicColor from '../../common/Color'
import ImagePlaceHolder from '@react-native-image-placeholder';
Ionicons.loadFont()
export const TRANSACTION_TYPE = {
    SENT: 1,
    RECEIVED: 2,
    WITHDRAW: 3,
    DEPOSITE: 4
}

export const TransactionAvatar = ({ image, type }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const isIn = (type==TRANSACTION_TYPE.RECEIVED || type==TRANSACTION_TYPE.DEPOSITE)
    const isWallet = (type==TRANSACTION_TYPE.WITHDRAW || type==TRANSACTION_TYPE.DEPOSITE)
    const greenColor = useDynamicValue(DynamicColor.green)
    return (
        <View>
            <View style={[styles.outline, isIn ? { borderColor: greenColor } : {}]}>
                {isWallet ? <Ionicons name="ios-wallet" size={32} color={useDynamicValue(DynamicColor.primary)} /> :
                    <ImagePlaceHolder source={image} style={styles.image} />}
            </View>
            <View style={[styles.smallCircle, isIn ? { backgroundColor: greenColor } : {}]}>
                <Feather
                    name={isWallet?(isIn ? "arrow-up-left" : "arrow-down-right"):(!isIn ? "arrow-up-left" : "arrow-down-right")}
                    size={16}
                    color={useDynamicValue(DynamicColor.white)} />
            </View>
        </View>
    )
}

const dynamicStyles = new DynamicStyleSheet({
    outline: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: DynamicColor.red,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor:DynamicColor.white
    },
    smallCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: DynamicColor.red,
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        right:0,
        bottom:0,
        paddingLeft:1,
        paddingTop:1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
})