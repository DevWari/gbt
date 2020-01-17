import React from 'react'
import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';

const AmountInput = ({ title, currency, style, ...props }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    return (
        <View style={styles.container}>
            {title = !null && title != '' && <Text style={styles.title}>{title}</Text>}
            <View style={styles.currencyContainer}>
                <TextInput
                    {...props}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    keyboardType="decimal-pad"
                    style={[styles.input, style]}
                />
                <Text style={styles.currency}>{currency}</Text>
            </View>
        </View>
    )
}

export default AmountInput;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        marginVertical: 5
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
        marginBottom: 5,
    },
    currencyContainer: {
        flexDirection: 'row',  
        alignItems: 'center',
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        backgroundColor: DynamicColor.textInputBack,
    },
    currency: {
        right: 10,
        color: DynamicColor.text
    },
    input: {
        backgroundColor: DynamicColor.textInputBack,
        height: 44,
        flex:1,
        paddingHorizontal: 10,
        fontSize: 16,
    }
})