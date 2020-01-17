import React, { useState, useEffect } from 'react';

import {
    View, Text, ScrollView, Linking, TouchableOpacity
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBApi from '../../service/GBApi';
import QRCode from 'react-native-qrcode-svg';
import Cache from "../../utils/cache";
import * as Config from "../../config";
import Images from '../../common/Images';
import Feather from 'react-native-vector-icons/Feather'

const MyWallet = (props) => {
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [isLoading, setLoading] = useState(false)
    const [wallets, setWallets] = useState('')
    const [currency, setPhone] = useState('')
    const darkPrimary = useDynamicValue(DynamicColor.darkPrimary)
    const logo = useDynamicValue(Images.icons.logo, Images.icons.dark_logo)

    useEffect(() => {
        setLoading(true)
        GBApi.getMyWallet((err, res) => {            
            if (err == null) {
                if (res.result == null) {
                    res.result = []
                } else {
                    setWallets(res)
                }
            }
            setLoading(false)
        })
    }, [])

    const openBlochchainExplorer = (address) => {
        const url = Config.blockchainExplorer + 'address/' + address + '?t=wer'
        Linking.openURL(url)        
    }
    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} title="My Wallet">
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.qrcodeContainer}>
                        <QRCode
                            value={JSON.stringify({
                                id: Cache.currentUser.user.id,
                                name: Cache.currentUser.user.name,
                                email: Cache.currentUser.user.email,
                                image: Cache.currentUser.user.image,
                            })}
                            // logo={logo}
                            // logoSize={50}
                            size={250}
                            color={darkPrimary}
                            backgroundColor={'white'} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.title, { flex: 1 }]}>Balance</Text>
                        <Text style={[styles.title, { width: 100 }]}>Lock Amount</Text>
                        <Text style={[styles.title, { width: 60 }]}>Currency</Text>
                        <Text style={[styles.title, { width: 80, paddingLeft: 5 }]}>Blockchain</Text>
                    </View>

                    {wallets.total > 0 && wallets.result.map((item, index) =>
                        <View style={{ flexDirection: 'row' }} key={index}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.amountContainer}>
                                    <Text >{item.balance.toFixed(2)}</Text>
                                </View>
                            </View>
                            <View style={{ width: 100 }}>
                                <View style={styles.currencyContainer}>
                                    <Text style={{ color: '#984' }}>{item.lockAmount.toFixed(2)}</Text>
                                </View>
                            </View>
                            <View style={{ width: 60 }}>
                                <View style={styles.currencyContainer}>
                                    <Text >{item.currency}</Text>
                                </View>
                            </View>
                            <View style={styles.blockContainer}>
                                <TouchableOpacity style={styles.blockButton}
                                    onPress={() => openBlochchainExplorer(item.address)}>
                                    <Feather name="link" size={20} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    <View style={{ marginBottom: 50 }} />
                </ScrollView>
            </View>
        </BaseScreen>
    )
};

export default MyWallet;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20,
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
    },
    qrcodeContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    amountContainer: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: DynamicColor.white,
        height: 44,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    currencyContainer: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: DynamicColor.white,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockButton: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: DynamicColor.darkPrimary,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
    },
    blockContainer: {
        width: 80,
        paddingLeft: 10,
        backgroundColor: DynamicColor.lightPrimary
    }
});