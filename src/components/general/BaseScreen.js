import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicValue,
    useDynamicStyleSheet,
    DynamicValue
} from 'react-native-dark-mode'
import Feather from 'react-native-vector-icons/Feather'
import DynamicColor from '../../common/Color'
import LockScreen from './LockScreen'
import GBApi from '../../service/GBApi';

import { useDispatch, useSelector } from 'react-redux'
import { LockAction } from '../../redux/actions'
import UtilService from '../../utils/util';

const BaseScreen = (props) => {
    const blackColor = useDynamicValue(DynamicColor.black)
    const styles = useDynamicStyleSheet(dynamicStyles)
    const whiteColor = useDynamicValue(DynamicColor.white)
    const [isLocked, setLock] = useState(false)
    const dispatch = useDispatch()
    const authStore = useSelector(state => state.login)

    const lockScreen = () => {
        // const myInterval = setInterval(() => {
        //     if (GBApi.isLoggedIn() && !isLocked) {
        //         dispatch(LockAction(true))
        //         clearInterval(myInterval)
        //     }
        // }, 1800000)
    }
    useEffect(() => {
        lockScreen()
    }, [])

    const unLock = async () => {

        const credentials = await UtilService.getKeychain()
        if (credentials && credentials.username) {
            dispatch(LockAction(false))
            lockScreen()
        }
    }

    return authStore.isLocked ? <LockScreen onPress={() => unLock()} /> : (
        <View style={[styles.container, props.style]}>
            {(props.title != null || props.onBack != null) && <View style={styles.navBar}>
                <TouchableOpacity onPress={props.onBack} style={styles.back}>
                    {props.onBack != null && <Feather name="arrow-left" size={24} color={whiteColor} />}
                </TouchableOpacity>
                <Text style={styles.title}>{props.title}</Text>
            </View>}
            {props.children}
            {props.isLoading && <View style={styles.cover}>
                <View style={styles.rect}>
                    <ActivityIndicator size="large" color={blackColor} />
                </View>
            </View>}
        </View>
    )
};

export default BaseScreen;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
    },
    navBar: {
        height: 40,
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: DynamicColor.darkPrimary,
    },
    title: {
        color: DynamicColor.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 30
    },
    back: {
        padding: 5,
        height: '100%',
        width: 30,
        justifyContent: 'center'
    },
    cover: {
        backgroundColor: DynamicColor.darkTransparent,
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rect: {
        backgroundColor: DynamicColor.white,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowOpacity: 0.4,
        shadowColor: DynamicColor.black,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 2 }
    }
});