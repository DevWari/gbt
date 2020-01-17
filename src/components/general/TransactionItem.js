import React, { useState, useEffect } from 'react';

import { View, Text, Linking, TouchableOpacity } from 'react-native' 
import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'

import DynamicColor from '../../common/Color'
import Feather from 'react-native-vector-icons/Feather'
import { TransactionAvatar, TRANSACTION_TYPE } from '../../components/general/TransactionAvatar';
import Images from '../../common/Images';
import * as Config from "../../config";
import moment from 'moment'

const typeString = {
    1: 'SENT',
    2: 'RECEIVED',
    3: 'WITHDRAW',
    4: 'DEPOSITE'
}

export const TransactionItem = ({ image, type, currency, amount, date, name, gateway, blockchaintxid }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const isIn = (type == TRANSACTION_TYPE.RECEIVED || type == TRANSACTION_TYPE.DEPOSITE)
    const isWallet = (type == TRANSACTION_TYPE.WITHDRAW || type == TRANSACTION_TYPE.DEPOSITE)

    const openBlochchainExplorer = (blockchaintxid) => {
        const url = Config.blockchainExplorer + 'transactions/' + blockchaintxid 
        Linking.openURL(url)
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.avatar}>
                    <TransactionAvatar
                        image={image}
                        type={type}
                    />
                </View>
                <View style={styles.firstLine}>
                    <Text style={styles.type}>{typeString[type]}</Text>
                    <Text style={[styles.price, isIn ? { color: useDynamicValue(DynamicColor.green) } : {}]}>
                        {(isIn ? '' : '- ') + currency} {Number(amount).toFixed(2)}
                    </Text>
                </View>
                {!isWallet && <Text numberOfLines={1} style={styles.name}>{isIn ? 'From : ' : 'To : '} {name}</Text>}
                {isWallet && <Text numberOfLines={1} style={styles.name}>{'Gateway :  '+gateway}</Text>}
                <View style={styles.dateblockItem}>
                    <Text style={styles.date}>{moment(date).format('MM-DD-YYYY hh:mm')}</Text>
                    <TouchableOpacity style={styles.blockButton} 
                    onPress={()=>openBlochchainExplorer(blockchaintxid)}>
                        <Feather name="link" size={15} color={'blue'} />
                        <Text numberOfLines={1} style={{ color: 'blue', marginLeft: 5 }}>{blockchaintxid < 15?`${blockchaintxid}`:`${blockchaintxid.substring(0, 12)}...`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const dynamicStyles = new DynamicStyleSheet({
    container: {
        width: '100%',
        height: 100,
        marginVertical:5,
    },
    card: {
        backgroundColor: DynamicColor.textInputBack,
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: DynamicColor.black,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 2 },
        flex: 1,
        marginLeft: 30,
        paddingLeft: 30,
    },
    avatar: {
        position: 'absolute',
        left: -30,
        top: 10,
    },
    firstLine: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    type: {
        fontSize: 12,
        fontWeight: 'bold',
        color: DynamicColor.darkText
    },
    price: {
        fontSize: 16,
        color: DynamicColor.red,
    },
    name: {
        fontSize: 16,
        color: DynamicColor.text,
        marginHorizontal: 10,
    },
    date: {
        fontSize: 12,
        color: DynamicColor.lightText,
        margin: 10,
        // textAlign:'right'
    },
    dateblockItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    blockButton: {
        flexDirection: 'row',
        width: '60%'
    }
})