import React from 'react'

import {
    TouchableOpacity,
    View,
    Text
} from 'react-native'

import DynamicColor from '../../common/Color'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import ImagePlaceHolder from '@react-native-image-placeholder';

const UserItem=({image, email, name, onPress, style})=>{
    const styles=useDynamicStyleSheet(DynamicStyle)
    return(
        <TouchableOpacity disabled={onPress==null} onPress={onPress} style={[styles.container, style]}>
            <ImagePlaceHolder source={image} style={styles.image}/>
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default UserItem;

const DynamicStyle=new DynamicStyleSheet({
    container:{
        backgroundColor:DynamicColor.textInputBack,
        height:60,
        width:'100%',
        // paddingHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor: DynamicColor.borderColor,
        borderBottomWidth:1,
    },
    image:{
        width:40,
        height:40,
        borderRadius:20,
        borderWidth:2,
        borderColor: DynamicColor.primary
    },
    content:{
        marginLeft:10,
        flex:1,
    },
    name:{
        fontSize:16,
        color:DynamicColor.darkText,
        fontWeight:'bold'
    },
    email:{
        fontSize:14,
        color: DynamicColor.lightText,
        marginTop:5
    }
})