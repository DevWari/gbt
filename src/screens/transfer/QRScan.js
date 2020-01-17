import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import {
    DynamicStyleSheet,
    useDynamicStyleSheet
} from 'react-native-dark-mode'

import BaseScreen from '../../components/general/BaseScreen';
import DynamicColor from '../../common/Color';
import Button from '../../components/general/Button';
import GBApi from '../../service/GBApi';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const QRScan = (props) => {

    
    
    const { navigate, goBack, getParam } = props.navigation;
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [isLoggedIn, setLogin] = useState(GBApi.isLoggedIn())
    const [showCamera, setShowCamera] = useState(true)

    const _onBarCodeRead = (e) => {
        setShowCamera(false)
        const callback = getParam('update')
        callback(JSON.parse(e.data))
        goBack()
      }

    return (
        <BaseScreen onBack={() => goBack()} title="QR Scanner">
            <View style={styles.container}>
                {showCamera&&<RNCamera
                    style={{
                    flex: 1,
                    width: '100%',
                    }}
                    onBarCodeRead={_onBarCodeRead}
                >
                    <BarcodeMask
                        width={250}
                        height={250}
                        transparency={0.8}
                    />
                </RNCamera>}
                {!showCamera&&<View></View>}
            </View>
        </BaseScreen>
    )
};

export default QRScan;

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: DynamicColor.lightPrimary,
    }
});