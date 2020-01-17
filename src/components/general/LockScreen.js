import React from 'react'

import { View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';
import Button from './Button';

const LockScreen = ({onPress})=>{
    const styles = useDynamicStyleSheet(dynamicStyles)
    const blackColor = useDynamicValue(DynamicColor.black)
    return(
        <View style={styles.container}>
            <Feather name="lock" size={120} color={blackColor}/>
            <View style={{height:50}}/>
            <Button title="Unlock" onPress={onPress}/>
        </View>
    )
}

export default LockScreen;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex:1,
        backgroundColor:DynamicColor.lightPrimary,
        alignItems:'center',
        justifyContent:'center',
        padding:20
    },
})