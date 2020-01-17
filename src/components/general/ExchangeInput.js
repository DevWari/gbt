import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View, TextInput,Picker } from 'react-native'
import {

    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';

const ExchangeInput = ({ title, currencies, style, ...props }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)   
   
    return (
        <View style={styles.container}>
            {title = !null && title != '' && <Text style={styles.title}>{title}</Text>}
            <View style={styles.currencyContainer}>
                <Text style={{width:50, borderWidth:1, 
                               borderColor:'grey',
                               borderTopLeftRadius:5,borderBottomLeftRadius:5,
                               backgroundColor:'#f5f5f5',
                               fontSize:16, textAlign:'center',
                               height: 44, padding:10, justifyContent:'center'}}>$</Text>
                <TextInput
                    {...props}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    keyboardType="decimal-pad"
                    style={[styles.input, style]}
                />                              
            </View>
        </View>
    )
}

export default ExchangeInput;
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
    },    
    input: {
        backgroundColor: DynamicColor.textInputBack,
        height: 44,
        flex:1,
        borderTopWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:'grey',
        paddingHorizontal: 10,
        fontSize: 16,        
    }
})