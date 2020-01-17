import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';

const Button = ({title, icon, onPress, primary, style, ...props}) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const whiteColor = useDynamicValue(DynamicColor.white)
    const primaryColor = {backgroundColor:useDynamicValue(DynamicColor.darkPrimary)}
    return (
        <TouchableOpacity {...props} onPress={onPress} style={[styles.container, primary?primaryColor:{}, style]}>
            {icon!=null&&<Feather name={icon} size={24} color={whiteColor}/>}
            {title!=null&&<Text style={[styles.title, primary?{color:whiteColor}:{}]}>{title}</Text>}
        </TouchableOpacity>
    )
};

export default Button;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        width: '100%',
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DynamicColor.white,
        marginVertical:5,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor
    },
    title:{
        color: DynamicColor.black,
        fontWeight:'bold'
    }
})