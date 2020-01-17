import React, { useState, useEffect } from 'react';

import {
    View, Text, ScrollView,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import InfoText from '../../components/general/InfoText';

const Info = (props) => {
    const { navigate, setParams, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    
    const save = () => {

    }

    return (
        <BaseScreen onBack={()=>goBack()} title="Information">
            <ScrollView style={styles.container}>
                <Text style={styles.titleText}>The easy and safe</Text>
                <Text style={styles.titleText}>way to transfer</Text>
                <Text style={styles.titleText}>money worldwide!</Text>
                <InfoText 
                    title='Simple'
                    content='Send to mobile wallets all over World.'
                />
                <InfoText 
                    title='Fast'
                    content='Send anytime. Most transfers are completed in seconds.'
                />
                <InfoText 
                    title='Low fee'
                    content='Every penny saved is a penny more for your loved one.'
                />
                <InfoText 
                    title='Hassle-free'
                    content='Send from whereever you are - no need to visit an agent.'
                />
                <InfoText 
                    title='Secure'
                    content='Your...'
                />
                <View style={{marginBottom: 30}} />
            </ScrollView>
        </BaseScreen>
    )
};

export default Info;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
        padding:20
    },
    titleText: {
        fontSize: 30,
        color: 'black',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});