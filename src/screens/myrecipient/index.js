import React, { useState, useEffect } from 'react';

import {
    View, Text, Image,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import UserItem from '../../components/general/UserItem'
import Images from '../../common/Images';
import PlaceholderItem from '../../components/general/placeholderItem';

import ImagePlaceholder from '@react-native-image-placeholder'
import { ScrollView } from 'react-native-gesture-handler';
import Segment from '../../components/general/Segment';
import { useSelector } from 'react-redux'

const MyRecipient = (props) => {
    const { navigate, getParam, goBack } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [selectedTab, setSelectedTab] = useState(0)
    const recipientResult = useSelector(state => state.recipient)


    const onSelect = (item) => {
        goBack()
        const update = getParam('update')
        if (update) {
            update(item) 
        }
    }

    useEffect(()=>{
        console.log('Recipients', recipientResult)
    },[])

    return (
        <BaseScreen onBack={() => goBack()} isLoading={recipientResult.isLoading} title="My Recipients">
            <View style={styles.container}>
                <ScrollView>
                    {recipientResult!=null && recipientResult.recipients.map((item, index) =>
                        <UserItem
                            key={index}
                            image={{uri:item.image||''}}
                            email={item.email}
                            name={item.name}
                            onPress={() => onSelect(item)}
                        />)}
                    <View style={{ marginBottom: 50 }} />
                </ScrollView>
            </View>
        </BaseScreen>
    )
};

export default MyRecipient;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.textInputBack,
        padding: 20
    }
});