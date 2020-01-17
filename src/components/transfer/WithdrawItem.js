import React, { useState } from 'react';

import { TouchableOpacity, Text, View, ScrollView, TextInput, ActivityIndicator, Image } from 'react-native'

import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';
import Constant from '../../common/Constant';
import GBTextInput from '../general/GBTextInput';
import Button from '../general/Button';
import Images from '../../common/Images';

const WithdrawItem = ({ logoImg, myWalletList, name, account, withdrawAmount, onChangeAccount, 
    onChangeAmount, onPress, selected, onChangeCurrency }) => {
    const [isValidAccount, setAccountError] = useState(null)
    const styles = useDynamicStyleSheet(dynamicStyles)

    // const isValid = account.isValidEmail();
    // if ( isValid != null ) {
    //     setAccountError(isValid)
    //     return;
    // } else {
    //     setAccountError(null)
    // }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topImageContainer}>
                    <Image source={logoImg} style={styles.topImage} />
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.labelText}>Available</Text>
                    {myWalletList != null && myWalletList.length > 0 && myWalletList.map((item, index)=>(
                        <TouchableOpacity onPress={()=>onChangeCurrency(index)} style={styles.currencyContainer} key={index}>
                            <View style={styles.optionContainer}>
                                {index==selected&&<View style={styles.optionInner}/>}
                            </View>
                            <Text style={styles.currency}>{item.currency}</Text>
                            <View style={{flex:1}}/>
                            <Text style={styles.amount}>{item.balance.toFixed(2)}</Text>
                        </TouchableOpacity> 
                        ))} 
                    <View style={{marginTop: 20}}>
                        <GBTextInput
                            title={'Account'}
                            onChangeText={text => onChangeAccount&&onChangeAccount(text)}
                            value={account}
                            placeholder={'john@doh.com'}
                            placeholderTextColor={'grey'}
                            keyboardType="email-address"
                            returnKeyType="next"
                            // error={isValidAccount}
                        />    
                        <GBTextInput
                            title={'Withdraw Amount'}
                            onChangeText={text => onChangeAmount&&onChangeAmount(text)}
                            value={withdrawAmount}
                            placeholder={myWalletList.length>0?myWalletList[selected].currency:'Not available'}
                            placeholderTextColor={'grey'}
                            keyboardType={'numeric'}
                            returnKeyType="next"
                            // error={isValidAccount}
                        />      
                    </View>  
                </View>
            <View style={{marginTop: 150}} />
            </ScrollView>
            <Button title="Withdraw" onPress={() => onPress()}/> 
        </View >
    )
}

export default WithdrawItem;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20,
    },
    topImageContainer: {
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    topImage: {
        width: '50%',
        height: '100%',
        resizeMode: 'contain'
    },
    labelText: {
        color: DynamicColor.black,
        fontSize: 14,
        marginTop: 25,
        fontWeight:'bold'
    },
    availableAmountText: {
        fontSize: 16,
        marginTop: 5,
        color: '#333',
        marginLeft:30
    },
    input: {
        height: 44,
        backgroundColor: 'transparent',
        width: '100%',
        alignItems: 'center',
        fontSize: 16,
    },
    bodyContainer: {
        flex: 1,
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        marginLeft:30,
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DynamicColor.darkPrimary,
        marginTop: 15,
        flexDirection:'row'
    },
    buttonLogo: {
        width: 40,
        height: 30,
        left: 20,
        top: 10,
        resizeMode: 'contain',
        position: 'absolute',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    currencyContainer:{
        marginLeft:30,
        borderBottomWidth:1,
        color:'#ccc',
        alignItems:'center',
        flexDirection:'row',
        height:48,
    },
    optionContainer:{
        width:20,
        height:20,
        borderWidth:1,
        borderColor:DynamicColor.darkPrimary,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    optionInner:{
        width:12,
        height:12,
        borderRadius:6,
        backgroundColor:DynamicColor.darkPrimary,
    },
    currency:{
        fontSize:14,
        fontWeight:'bold',
        color:'black',
        marginLeft:10
    },
    amount:{
        fontSize:14,
        color:'#333'
    }
})