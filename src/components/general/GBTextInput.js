import React from 'react'

import { TouchableOpacity, Text, View, TextInput } from 'react-native'

import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';

const GBTextInput = ({ title, style, ...props }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    return (
        <View style={styles.container}>
            {title = !null && title != '' && <Text style={styles.title}>{title}</Text>}
            <TextInput
                {...props}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                style={[styles.input, style]}
                
            />
            {props.error != null && props.error != '' && <Text style={styles.error}>
                {props.error}
            </Text>}
        </View>
    )
}

export default GBTextInput;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        width: '100%',
        marginVertical: 5
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
    },
    input: {
        backgroundColor: DynamicColor.textInputBack,
        height: 44,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        marginTop: 5,
        fontSize: 16
    },
    error:{
        fontSize:12,
        color:DynamicColor.red,
        marginTop:3
    }
})