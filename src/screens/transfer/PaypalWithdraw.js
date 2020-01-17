import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'
import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import NavBar from '../../components/general/NavBar';
import Button from '../../components/general/Button';
import GBTextInput from '../../components/general/GBTextInput';
import WithdrawItem from '../../components/transfer/WithdrawItem';
import Images from '../../common/Images';
import Constant from '../../common/Constant';
import GBApi from '../../service/GBApi';
import moment from 'moment'

const PaypalWithdraw = (props) => {
    const { navigate, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [account, setAccount] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [withdrawableTime, setWithdrawableTime] = useState('')
    const [isWaiting, setLoading] = useState(false)
    const [selected, setSelected] = useState(0)
    const [myWalletList, setMyWalletList] = useState([])

    useEffect(()=>{
        setLoading(false)
        GBApi.getMyWallet((err, res) => {            
            if (err == null && res.error == null) {
                setMyWalletList(res.result)
            }
        })  
        
    },[])

    withdraw = () => {
        setLoading(true)

        GBApi.requestWithdraw({
            paymentType: 'paypal',
            amount: withdrawAmount,
            paymentLink: account,
            currency: myWalletList[selected].currency
        },(err, res) => {
            setLoading(false)
            if (err == null && res.error == null) {
                alert(withdrawAmount+' '+myWalletList[selected].currency+' will be processed  during 1~3 work days from '+moment(new Date(res.result)).format('YYYY-MM-DD hh:mm'))
                goBack()
                // if(!!this.props.refreshPage){
                //     this.props.refreshPage()                   
                // }
               
            }
        })
    }


    return (
        <BaseScreen  isLoading={isWaiting} onBack={()=>goBack()} showMenu title="Paypal Withdraw">
            <View style={styles.container}>
                <WithdrawItem 
                    logoImg={Images.icons.paypal_logo}
                    name='paypal'
                    myWalletList={myWalletList}
                    account={account}
                    withdrawAmount={withdrawAmount}
                    onChangeAccount={(text)=>setAccount(text)}
                    onChangeAmount={(text)=>setWithdrawAmount(text)}
                    onPress={withdraw}
                    selected={selected}
                    onChangeCurrency={selected=>setSelected(selected)}
                 />
            </View>
        </BaseScreen>
    )
};

export default PaypalWithdraw;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
        marginVertical: 5,
    },
    recipientBt: {
        width: '100%',
        height: 48,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: DynamicColor.white,
        marginVertical:5,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        paddingHorizontal: 10,
    },
    recipientText: {
        width: '100%',
    },
    link: {
        color: DynamicColor.black
    }
});