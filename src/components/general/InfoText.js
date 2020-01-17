import React from 'react'

import { TouchableOpacity, Text, View, TextInput } from 'react-native'

import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';

const InfoText = ({ title, content, style }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
        </View>
    )
}

export default InfoText;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        width: '100%',
        marginVertical: 5
    },
    title: {
        marginTop: 20,
        color: DynamicColor.black,
        fontSize: 20,
    },
    content: {
        color: DynamicColor.black,
        fontSize: 16,
    },
})