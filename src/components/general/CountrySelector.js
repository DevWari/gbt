import React, { useState, useEffect } from 'react'

import { Text, View, Image, TouchableOpacity } from 'react-native'

import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import DynamicColor from '../../common/Color';
import CountryPicker from 'react-native-country-picker-modal'
import Feather from 'react-native-vector-icons/Feather'
import { getImageFlagAsync, getCountriesAsync } from 'react-native-country-picker-modal/lib/CountryService';


const CountrySelector = ({ title, value, onSelect, currencies }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const { currency, flag, name, cca2 } = value
    const [flagImage, setFlagImage] = useState('none')
    const [countries, setCountries] = useState(null)
    const blackColor = useDynamicValue(DynamicColor.black)

    const getFlagImage = async () => {
        const flagImage2 = await getImageFlagAsync(value.cca2);
        setFlagImage(flagImage2)
    }
    const getCountries = async () => {
        if (currencies == null) return;
        const countries = await getCountriesAsync()
        console.log(countries, currencies)
        const filtered = countries
            .filter(o => currencies.indexOf(o.currency[0]) >= 0)
            .map(o => o.cca2)
        console.log(filtered)
        setCountries(filtered)
    }
    useEffect(() => {
        getCountries()
    }, [currencies])

    useEffect(() => {        
        getFlagImage()
    })
    return (
        <View style={styles.container}>
            {title = !null && title != '' && <Text style={styles.title}>{title}</Text>}

            {countries ? <CountryPicker
                countryCodes={countries}
                countryCode={cca2}
                withFilter
                withFlag
                withCurrency
                onSelect={onSelect}
                visible={false}
                withCountryNameButton
                withCurrencyButton
                renderFlagButton={({ onOpen }) => (
                    <TouchableOpacity onPress={onOpen} style={styles.button}>
                        <Image source={{ uri: flagImage }} style={styles.flag} />
                        <Text style={styles.country}>{name}</Text>
                        <View style={{ flex: 1 }} />
                        <Text style={styles.currency}>{currency}</Text>
                        <Feather name="chevron-down" size={24} color={blackColor} />
                    </TouchableOpacity>
                )}
            >

            </CountryPicker> :
                <TouchableOpacity disabled={true} style={styles.button}>
                    <Image source={{ uri: flagImage }} style={styles.flag} />
                    <Text style={styles.country}>{name}</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.currency}>{currency}</Text>
                    <Feather name="chevron-down" size={24} color={blackColor} />
                </TouchableOpacity>
            }
        </View>
    )
}

CountrySelector.defaultProps = {
    title: 'Select a country',
    value: {
        cca2: 'US',
        currency: 'USD',
        flag: '',
        name: 'United State'
    },
    onSelect: () => alert('Perfect!')
}

export default CountrySelector;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        width: '100%',
        marginVertical: 5
    },
    title: {
        color: DynamicColor.black,
        fontSize: 14,
        marginBottom: 3,
    },
    button: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: DynamicColor.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: DynamicColor.textInputBack
    },
    flag: {
        width: 50,
        height: 30,
        resizeMode: 'contain'
    },
    country: {
        fontSize: 14,
        color: DynamicColor.darkText,
        marginLeft: 10
    },
    currency: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color: DynamicColor.text
    }
})