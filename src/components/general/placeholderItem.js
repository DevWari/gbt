import React from 'react'

import { TouchableOpacity, Text, View, TextInput } from 'react-native'

import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';

const PlaceholderItem = ({duration=1500}) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    return (
    <View style={styles.itemContainer}>
        <ShimmerPlaceHolder duration={duration} autoRun style={styles.image} />
        <ShimmerPlaceHolder duration={duration} autoRun style={styles.title} />
        <ShimmerPlaceHolder duration={duration} autoRun style={styles.description} />
        <ShimmerPlaceHolder duration={duration} autoRun style={styles.description} />
        <ShimmerPlaceHolder duration={duration} autoRun style={styles.description} />
        <ShimmerPlaceHolder duration={duration} autoRun style={styles.description} />
    </View>
    )
}

export default PlaceholderItem;

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
    itemContainer: {
        marginBottom:30,
    },
    date:{
        width: 100,
        height: 15,
        backgroundColor: 'grey',
        marginTop:15,
    },
    image:{
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
    },
    description: {
        width: '80%',
        height: 10,
        backgroundColor: 'grey',
        marginTop:5,
        marginLeft:15
    },
})