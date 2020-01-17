import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    Picker,
    TouchableOpacity,
} from 'react-native';
import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'
import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import CountrySelector from '../../components/general/CountrySelector';
import ExchangeInput from '../../components/general/ExchangeInput'
import GBApi from '../../service/GBApi';
import Cache from '../../utils/cache'

const GBTransfer = (props) => {
    const { navigate, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)    
    const [sendMoney, setSendMoney] = useState('10')
    const [receiveMoney, setReceiveMoney] = useState('')
    const [fee, setFee] = useState('1')
    const [isLoading, setLoading] = useState(true)
    const [currencies, setCurrencies] = useState(null)    
    const [toCurrency, setToCurrency] = useState('EUR')   
    const [fromCurrency, setFromCurrency] = useState ('USD')  
    const [wallets,setWallets] = useState(null)
    const [rCount, setRCount] = useState(0)
    
    const check = () => {       
        if (sendMoney == '') {
            Alert.alert('Information', 'Please input amount you want to send.')
            return
        } else {        
            let wallet = getWallet (fromCurrency);
            if (Number(sendMoney) > wallet) {
                Alert.alert('Information', 'Sending money must be less than Available Wallet')
                setSendMoney(wallet.toString());
                return
            }         }
        send()     
    }

    const getFirstCurrency = (currency) => {
        if (typeof currency == 'string') return currency;
        return currency[0]
    }

    const send = () => {
        setLoading(true)        
        GBApi.setTransfer({
            fromCurrency: getFirstCurrency(fromCurrency),
            toCurrency: getFirstCurrency(toCurrency),
            toUserId: Cache.currentUser.user.id,
            amount: Number(sendMoney)
        }, async (err, res) => {
            if (err == null && res.error == null) {
                Alert.alert("Successfully exchanged from " + 
                                           sendMoney + " " +
                                     fromCurrency + " to " + 
                       res.result.toAmount + " " + toCurrency)
                getWallets()   
                setRCount(1)
                
            } else {
                Alert.alert('Information', 'Failed to exchange currency!')
            }
            setLoading(false)
        })
    }

    const calcFee = (value, flag) => {
        GBApi.calcFee({
            from_currency: getFirstCurrency(fromCurrency),
            to_currency: getFirstCurrency(toCurrency),
            send_amount: flag == 'send' ? Number(value) : 0,
            receive_amount: flag == 'send' ? 0 : Number(value),
        }, async (err, res) => {            
            if (err == null && res.error == null) {                
                flag == 'send' && setReceiveMoney(res.result.receive_amount);
                flag != 'send' && setSendMoney(res.result.send_amount);
                setFee(res.result.fee.toFixed(2))
            }
        })
    }
    const onChangeSendMoney = (value) => {                     
        calcFee(value, 'send')
        setSendMoney(value)
    }

    const onChangeReceiveMoney = (value) => {        
        calcFee(value, 'receive')
        setReceiveMoney(value)
    }

    const getCurrencies = ()=>{
        GBApi.getCurrencies((err, res)=>{
            console.log('currency', err, res)
            if ( err == null && res.error == null ){
                setCurrencies(res.result.map(o=>o.unit))                
            }
        })
    }
    const getWallets = async () => {
        setLoading(true)
        GBApi.getMyWallet((err, res)=>{
            console.log('currency', err, res)
            if ( err == null && res.error == null ){
                setWallets(res)                                
            }
            setLoading(false) 
        })        
    }
    const getWallet = (currency) => {         
        
        if (wallets) {            
             let wallet = wallets.result.filter (item=> item.currency == currency)
             if (wallet.length == 0) return 0             
             else return wallet[0].balance             
        }
        else return 0        
    }      

    useEffect(() => {                
        calcFee(sendMoney, 'send')                   
    }, [fromCurrency, toCurrency])

    useEffect(() => {         
        let wallet = getWallet (fromCurrency)                
        setSendMoney (Math.min(10, wallet).toString())                 
    }, [wallets])

    useEffect(() => {           
        
        if (rCount < 2) {
            calcFee(sendMoney, 'send')
            setRCount(rCount + 1)
        }        
    }, [sendMoney])    

    useEffect(() => {
        setLoading (false)
        getCurrencies()               
        getWallets()
        setLoading (true)
    }, []);
    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} showMenu title="Exchange money">
           
           {wallets ? 
                <View style={styles.container}>
                        <ScrollView>                    
                            <View style={{flexDirection:'row'}} >
                                <ExchangeInput
                                    title="From"                            
                                    onChangeText={onChangeSendMoney}
                                    value={sendMoney}
                                    currencies={currencies}                        
                                    returnKeyType="next" 
                                />
                                <View style={styles.currency} >
                                    <Picker
                                        selectedValue={fromCurrency}                                                 
                                        onValueChange={(currency, itemIndex) => setFromCurrency(currency)}>                    
                                        {currencies? currencies.map((item,index)=>
                                            <Picker.Item label={item} key={index} value={item} />):
                                            <Picker.Item label="USD"  value="USD" />}                        
                                    </Picker>  
                                </View>
                            </View>                    
                            <Text style={{textAlign:'right', paddingRight:5}}>
                                Available balance is {getWallet(fromCurrency)} {fromCurrency}
                            </Text>
                            <View style={{flexDirection:'row'}} >
                                <ExchangeInput
                                    title="To"
                                    onChangeText={onChangeReceiveMoney}
                                    value={receiveMoney}
                                    currencies={currencies}                        
                                    returnKeyType="next" 
                                />
                                <View style={styles.currency} >
                                    <Picker
                                        selectedValue={toCurrency}                                                 
                                        onValueChange={(itemValue, itemIndex) => setToCurrency(itemValue)}>                    
                                        {currencies? currencies.map((item,index)=>
                                            <Picker.Item label={item} key={index} value={item} />):
                                            <Picker.Item label="EUR"  value="EUR" />}                        
                                    </Picker>  
                                </View>
                            </View>              
                            <Text style={styles.fee}>Fee: {fee} {fromCurrency}</Text>
                        <View style={{marginBottom: 100}} />
                        </ScrollView>
                        <Button title="Exchange" primary onPress={check} />
                    </View>           
            : 
            <View style={styles.container}>
                <Text>No money in your wallet</Text>
            </View>
           }
                    
        </BaseScreen>
    )
};

export default GBTransfer;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    },
    currency: {
        width:110,       
        height:44,                       
        fontSize:16,
        marginTop: 29,  
        borderTopWidth:1,
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:'grey',
        borderTopRightRadius:5,  
        borderBottomRightRadius:5,    
        backgroundColor:'white',
        color: DynamicColor.text,           
        backgroundColor:'#f5f5f5',
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
        marginVertical: 5,
    },
    
    link: {
        color: DynamicColor.black
    },
    fee: {
        fontSize: 14,
        color: DynamicColor.black,
        marginTop: 10
    }
});