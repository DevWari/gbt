import React, { useState, useEffect } from 'react';

import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native'
import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';

const Segment = ({ labels, onChange, style }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [selected, setSelected] = useState(0)
    const whiteColor = useDynamicValue(DynamicColor.white)
    const primaryColor = useDynamicValue(DynamicColor.primary)
    
    const onPress = (index) => {
        if ( onChange ){
            onChange(index)
        }
        setSelected(index)
    }
    return (
        <View style={[styles.container, style]}>
            {labels.map((item, index) =>
                <TouchableOpacity 
                    key={index} 
                    style={[styles.button, 
                        {backgroundColor:index==selected?primaryColor:'transparent'},
                        index==0?{borderLeftWidth:0}:{},
                    ]} 
                    onPress={()=>onPress(index)}>
                    <Text style={[styles.buttonText, index==selected?{color:whiteColor, fontWeight:'bold'}:{}]}>{item}</Text>
                </TouchableOpacity>)}
        </View>
    )
}

export default Segment;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        height: 44,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth:1,
        borderLeftColor:DynamicColor.borderColor
    },
    buttonText:{
        color:DynamicColor.darkText,
        fontSize:14,
    }
})