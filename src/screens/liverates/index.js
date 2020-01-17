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
import CountrySelector from '../../components/general/CountrySelector';

import { TransactionItem } from '../../components/general/TransactionItem';
import { useSelector } from 'react-redux'
import { TRANSACTION_TYPE } from '../../components/general/TransactionAvatar';
import GBApi from '../../service/GBApi';
import Cache from '../../utils/cache'
import moment from 'moment'
import * as Config from "../../config";

const LiveRates = (props) => {
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [isLoading, setLoading] = useState(false)
    const [rates, setRates] = useState([])
    const [currencies, setCurrencies] = useState(null)
    const [country, setCountry] = useState({
        cca2: 'US',
        name: 'USA',
        currency: 'USD'
    })

    const getRates = (value) => {
        
        setCountry(value)
        setLoading(true)
        GBApi.getExchangeRate(value.currency, (err, res) => {
            if (err == null && res.error == null) {                
                setRates(res.rates)
            }
            setLoading(false)
        })
    }

    const getCurrencies = ()=>{
        GBApi.getCurrencies((err, res)=>{
            if ( err == null && res.error == null ){
                setCurrencies(res.result.map(o=>o.unit))
            }
        })
    }

    useEffect(() => {
        getCurrencies()
        setLoading(true)
        GBApi.getExchangeRate(country.currency, (err, res) => {
            if (err == null && res.error == null) {
                setRates(res.rates)
            }
            setLoading(false)
        })
    }, [])


    return (
        <BaseScreen isLoading={isLoading} onBack={() => goBack()} title="Live Rates">
            <View style={styles.container}>
                <CountrySelector
                    value={country}
                    currencies={currencies}
                    onSelect={value => getRates(value)}
                    title="Base Currency:"
                />
                <View style={styles.tableContainer}>
                    <View style={styles.tableBodyContainer}>
                        <View style={styles.headRowContainer}>
                            <Text style={styles.headText}>
                                Currency Name
                            </Text>
                            <Text style={styles.headText}>
                                Rates
                            </Text>
                        </View>
                        <View style={styles.bodyRowContainer}>
                            <ScrollView>
                                {Object.keys(rates).map((item, index) => (
                                    <View key={index} style={styles.rowContainer}>
                                        <Text style={styles.cellText}>{item}</Text>
                                        <Text style={styles.cellText}>{rates[item].toFixed(3)}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </BaseScreen>
    )
};

export default LiveRates;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding: 20
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'rgb(200,255,200)',
        borderRadius: 3,
    },
    tableBodyContainer: {
        backgroundColor:DynamicColor.primary, 
        borderRadius:3, 
        overflow:'hidden', 
        flex: 1
    },
    headRowContainer: {
        height:40, 
        alignItems:'center', 
        flexDirection:'row', 
        borderBottomColor:DynamicColor.darkPrimary, 
        borderBottomWidth:1
    },
    headText: {
        flex:1, 
        fontSize:12, 
        color:'#333', 
        fontWeight:'bold', 
        textAlign:'center'
    },
    bodyRowContainer: {
        marginTop:5, 
        padding:8, 
        flex:1
    },
    cellText: {
        fontSize: 14, 
        color:'#333', 
        flex:1, 
        textAlign:'center'
    },
    rowContainer: {
        height:32, 
        flexDirection: 'row', 
        alignItems:'center', 
        paddingHorizontal:10, 
        borderBottomColor:'#ccc', 
        borderBottomWidth:1
    },
});