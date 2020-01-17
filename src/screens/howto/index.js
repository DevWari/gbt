import React, { useState, useEffect } from 'react';

import {
    View, ScrollView, Image,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import Images from '../../common/Images';

const Howto = (props) => {
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)

    const gotoInformation = () => {
        navigate('Info')
    }

    return (
        <BaseScreen onBack={()=>goBack()} title="How does it work">
            <ScrollView style={styles.container}>
                <Image source={Images.backs.info} style={styles.info}></Image>
                <Button title="Information" onPress={gotoInformation} style={{marginTop: 30, flex: 1}} />
                <View style={{marginBottom: 50}} />
            </ScrollView>
        </BaseScreen>
    )
};

export default Howto;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.primary,
        padding: 10,
    },
    titleText: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'arial',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    info: {
        width: '100%',
        resizeMode: 'contain',
    }
});