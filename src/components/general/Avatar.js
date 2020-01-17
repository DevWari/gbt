import React, { useState } from 'react'

import { View, TouchableOpacity } from 'react-native'
import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import DynamicColor from '../../common/Color'
import ImagePlaceHolder from '@react-native-image-placeholder';
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker';
import GBApi from '../../service/GBApi'

const Avatar = ({ image, onChange, setLoading }) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const whiteColor = useDynamicValue(DynamicColor.white)
    const primaryColor = useDynamicValue(DynamicColor.darkPrimary)
    let ref_action = null;

    const onPickImage = () => {

        if (ref_action) {
            ref_action.show()
        }
    }

    const uploadImage = (uri) => {
        setLoading&&setLoading(true)
        GBApi.photoUpload(uri, (err, res) => {
            if (err == null && res.error == null) {
                if ( onChange ) onChange({uri:res.path})
            }
            setLoading&&setLoading(false)
        })
    }

    const takePicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image => {
            uploadImage(image.path)
        });
    }

    const fromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            uploadImage(image.path)
        });
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={onPickImage}>
                <View style={styles.outline}>
                    <ImagePlaceHolder source={image} style={styles.image} />
                </View>
                <View style={styles.smallCircle}>
                    <Feather
                        name={"camera"}
                        size={16}
                        color={whiteColor} />
                </View>
            </TouchableOpacity>
            <ActionSheet
                ref={o => ref_action = o}
                // title={'Which one do you like ?'}
                options={['Take a Picture', 'From Photo Library', 'Cancel']}
                cancelButtonIndex={2}
                tintColor={primaryColor}
                destructiveButtonIndex={0}
                onPress={(index) => {
                    if (index == 0) takePicture()
                    if (index == 1) fromLibrary()
                }}
            />
        </View>
    )
}

export default Avatar;

const dynamicStyles = new DynamicStyleSheet({
    outline: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: DynamicColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: DynamicColor.white
    },
    smallCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: DynamicColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingLeft: 1,
        paddingTop: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
})