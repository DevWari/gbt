import React, { useState, useEffect } from 'react';

import {
    View,
    Image,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Modal,
    StatusBar
} from 'react-native';

import {
    DynamicStyleSheet,
    DynamicValue,
    useDynamicStyleSheet,
    useDynamicValue
} from 'react-native-dark-mode'

import DynamicColor from '../../common/Color'
import Constant from '../../common/Constant';
import Images from '../../common/Images';
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import { LogoutAction } from '../../redux/actions'
import GBApi from '../../service/GBApi';
// import ZendeskSupport from '@synapsestudios/react-native-zendesk-support';
import * as Zendesk from 'react-native-zendesk'
import ZendeskChat from 'react-native-zendesk-chat';

Feather.loadFont()

const { ScreenHeight, ScreenWidth } = Constant

const MenuItem = ({ icon, title, styles, onPress, index }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={index % 2 == 0 ? styles.lightMenu : styles.darkMenu}
    >
        <Feather name={icon} size={30} color={useDynamicValue(DynamicColor.white)} />
        <Text style={styles.whiteText}>{title}</Text>
    </TouchableOpacity>
)

const menus = [
    { icon: 'user', title: 'My Profile', goTo: 'MyProfile' },
    // { icon: 'settings', title: 'Settings', goTo: 'Login' },
    { icon: 'dollar-sign', title: 'My Wallet', goTo: 'MyWallet' },
    { icon: 'file-text', title: 'My Transfers', goTo: 'MyTransfers' },
    { icon: 'users', title: 'My Recipients', goTo: 'MyRecipient' },
    { icon: 'activity', title: 'Live Rates', goTo: 'LiveRates' },
    { icon: 'info', title: 'How does it work?', goTo: 'HowTo' },
    { icon: 'help-circle', title: 'Get Help', goTo: 'NONE' },
    { icon: 'log-out', title: 'Log out', goTo: 'Welcome' }
]

const NavBar = (props) => {
    const styles = useDynamicStyleSheet(dynamicStyles)
    const [showMenu, toggleMenu] = useState(false)
    const dispatch = useDispatch()
    const whiteColor = useDynamicValue(DynamicColor.white)

    const onPress = () => {
        if (GBApi.isLoggedIn()) {
            toggleMenu(true)
        } else {
            // Zendesk.showHelpCenter({
            //     hideContactSupport: false
            // })

            ZendeskChat.startChat({
                name: '',
                email: '',
                phone: '',
                tags: ['chat'],
                department: "greenbay transfer"
            });
        }
    }



    const Menu = menus.map((item, index) =>
        <MenuItem
            key={index}
            index={index}
            {...item}
            onPress={() => {
                console.log(props)
                if (props.navigation && item.goTo != 'NONE') {
                    if (item.icon == 'log-out') {
                        dispatch(LogoutAction())
                        // props.scene.descriptor.navigation.goBack()
                        props.navigation.navigate(item.goTo)
                    } else {
                        props.navigation.navigate(item.goTo)
                    }
                } else {
                    if (item.icon == 'help-circle') {
                        // setTimeout(() => ZendeskSupport.callSupport({
                        //     customFieldId: 'test'
                        // }), 100)
                        // ZendeskSupport.supportHistory()
                        // Zendesk.showHelpCenter({
                        //     hideContactSupport: false
                        // })

                        setTimeout(() => ZendeskChat.startChat({
                            name: '',
                            email: '',
                            phone: '',
                            tags: ['chat'],
                            department: "greenbay transfer"
                        }), 100);
                    }
                }
                toggleMenu(false)
            }}
            styles={styles} />)
    return (
        <View style={styles.header}>
            <StatusBar backgroundColor={useDynamicValue(DynamicColor.primary)} />
            <Image source={Images.icons.logo} style={styles.logo} />
            <TouchableOpacity onPress={onPress}>
                <Feather name={GBApi.isLoggedIn() ? "menu" : "help-circle"} size={30} color={whiteColor} />
            </TouchableOpacity>

            <Modal
                visible={showMenu}
                transparent
            >
                <TouchableOpacity activeOpacity={0.8} style={styles.coverWholeScreen} onPress={() => toggleMenu(false)}>
                    <View style={styles.menu}>
                        {Menu}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View >
    )
};

export default NavBar;

const dynamicStyles = new DynamicStyleSheet({
    header: {
        height: Constant.NavBarHeight + Constant.ToolbarHeight,
        paddingTop: Constant.ToolbarHeight,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: DynamicColor.primary,
    },
    logo: {
        width: 48,
        height: 48,
        resizeMode: 'contain'
    },
    menu: {
        position: 'absolute',
        right: 0,
        top: Constant.NavBarHeight + Constant.ToolbarHeight + 40,
        width: 250,
        backgroundColor: DynamicColor.white,
        elevation: 3,
        shadowOpacity: 0.4,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 3
    },
    darkMenu: {
        backgroundColor: DynamicColor.darkPrimary,
        width: '100%',
        paddingHorizontal: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    lightMenu: {
        backgroundColor: DynamicColor.primary,
        width: '100%',
        paddingHorizontal: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    whiteText: {
        fontSize: 18,
        color: DynamicColor.white,
        marginLeft: 15
    },
    coverWholeScreen: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: ScreenWidth,
        height: ScreenHeight
    }
});