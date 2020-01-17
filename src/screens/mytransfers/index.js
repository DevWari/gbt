import React, { useState, useEffect } from 'react';

import {
    View, Text, ScrollView
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import Segment from '../../components/general/Segment';

import { TransactionItem } from '../../components/general/TransactionItem';
import { useSelector } from 'react-redux'
import { TRANSACTION_TYPE } from '../../components/general/TransactionAvatar';
import GBApi from '../../service/GBApi';
import Cache from '../../utils/cache'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import * as Config from "../../config";

const MyTransfers = (props) => {

    const labels = ['All', 'Transfers', 'Others']
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [tabIndex, setTabIndex] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 20
    const [isLoading, setLoading] = useState(false)
    const [transactions, setTransaction] = useState([])
    const recipientResult = useSelector(state => state.recipient)
    const [startDate, setStartDate] = useState('2016-01-01 00:00:00')
    const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD 23:59:00'))

    const previous = () => {
        if (pageNumber <= 0) setPageNumber(0)
    }

    const next = () => {
        setPageNumber(pageNumber + 1)

    }

    const getOppositePicture = (item) => {
        if (recipientResult == null || recipientResult.recipients == null) return null;
        const myId = Cache.currentUser.user.id
        const oppositeId = (item.senderId == myId) ? item.receiverId : item.senderId
        const opposite = recipientResult.recipients.find(item => item.id == oppositeId)

        return opposite && { uri: opposite.image }
    }

    const getTransaction = () => {
        setLoading(true)
        let from = moment(startDate).format('YYYY-MM-DD 00:00:00')
        let to = moment(endDate).format('YYYY-MM-DD 23:59:59')
        const myId = Cache.currentUser.user.id
        GBApi.getTransactions(pageNumber, pageSize, from, to, (err, res) => {

            if (err == null && res.error == null) {
                setTransaction(res.result.filter(item => item.type != 'Donation').map(item => ({
                    image: getOppositePicture(item),
                    name: (myId == item.senderId) ? item.receiver : item.sender,
                    type: (myId == item.senderId) ? TRANSACTION_TYPE.SENT : TRANSACTION_TYPE.RECEIVED,
                    date: moment(item.updatedAt),
                    amount: (myId == item.senderId) ? item.sendAmount : item.receiveAmount,
                    currency: (myId == item.senderId) ? item.sendCurrency : item.receiveCurrency,
                    blockchaintxid: item.blockchaintxid
                })))
            }
            setLoading(false)
        })
    }

    const filterTrans = () => {

        if (tabIndex == 1) {
            return transactions.filter(item => (item.type == TRANSACTION_TYPE.SENT || item.type == TRANSACTION_TYPE.RECEIVED))
        }
        if (tabIndex == 2) {
            return transactions.filter(item => (item.type != TRANSACTION_TYPE.SENT && item.type == TRANSACTION_TYPE.RECEIVED))
        }
        return transactions;
    }

    useEffect(() => {
        getTransaction()
    }, [])

    useEffect(() => {
        getTransaction()
    }, [startDate, endDate])

    const onChangeStartDate = (date) => {
        setStartDate(date)
    }

    const onChangeEndDate = (date) => {
        let endDate = moment(date).format('YYYY-MM-DD 23:59')
        setEndDate(endDate)
    }

    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} title="My Transfers">
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <View>
                        <Text style={{ marginBottom: 3 }}>From</Text>
                        <DatePicker
                            style={{ width: 140 }}
                            date={startDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2000-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={(date) => onChangeStartDate(date)}
                        />
                    </View>
                    <View style={styles.dash} />
                    <View>
                        <Text style={{ marginBottom: 3 }}>To</Text>
                        <DatePicker
                            style={{ width: 140 }}
                            date={endDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2000-05-01"
                            maxDate="2020-06-01"
                            showIcon={false}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => onChangeEndDate(date)}
                        />
                    </View>
                </View>
                <ScrollView style={{ paddingRight: 10 }}>
                    {filterTrans().map((item, index) => <TransactionItem
                        key={index}
                        {...item}
                    />)}

                </ScrollView>
                {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Button icon={'arrow-left'} primary onPress={previous} style={{ width: 60 }} />
                    <View style={{ flex: 1 }} />
                    <Button icon={'arrow-right'} primary onPress={next} style={{ width: 60 }} />
                </View> */}
            </View>
        </BaseScreen>
    )
};

export default MyTransfers;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:DynamicColor.borderColor
    },
    dash:{ 
        width: 10, 
        height: 1, 
        backgroundColor: DynamicColor.borderColor, 
        margin: 10, 
        marginTop: 30 
    }
});