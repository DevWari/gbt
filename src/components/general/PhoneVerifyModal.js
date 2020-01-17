import React from 'react'

import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native'

import CodeInput from 'react-native-confirmation-code-input';
import GBApi from '../../service/GBApi';

export default class PhoneVerifyModal extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            resending: false,
            verifying: false,
            isError: false
        }
    }

    _onFinishCheckingCode2(code) {
        this.setState({ verifying: true, isError: false })
        GBApi.verifyCode(code, (err, res) => {
            if ( err == null ){
                this.setState({ verifying: false, visible:false })
                setTimeout(()=>this.props.onSuccess&&this.props.onSuccess(), 50)
            }else{
                this.setState({verifying: false, isError:true})
            }
            
        })
    }

    resend() {
        console.log('-------->', this.props.phoneNumber)
        this.setState({ resending: true })
        GBApi.sendVerifyCode(this.props.phoneNumber||'+447794653925', (err, res) => {
            console.log(err, res)
            this.setState({ resending: false })
        })
    }

    cancel() {
        this.setState({ visible: false })
    }

    showModal(){
        this.resend()
        this.setState({visible:true})
    }

    render() {
        let { visible, resending, verifying, isError } = this.state
        return (
            <Modal
                transparent
                visible={visible}
            >
                <View style={styles.container}>
                    <View style={styles.modalContainer}>
                        <View style={styles.body}>
                            <View style={{ height: 50 }}>
                                <CodeInput
                                    ref="codeInputRef2"
                                    keyboardType="numeric"
                                    codeLength={6}
                                    className='border-b'
                                    size={30}
                                    inactiveColor={'#333'}
                                    activeColor={'black'}
                                    autoFocus={false}
                                    codeInputStyle={{ fontWeight: '800' }}
                                    onFulfill={(code) => this._onFinishCheckingCode2(code)}
                                />
                            </View>
                            <View style={styles.row}>
                                {verifying && <ActivityIndicator size='small' color={'#333'} style={{marginRight:8}}/>}
                                <Text style={[styles.verifyCode,{color:isError?'red':'#333'}]}>
                                    {isError?'Invalid code. Please input correctly.':'Please input your verification code.'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity disabled={resending} onPress={() => this.resend()} style={styles.bottomButton}>
                                {!resending && <Text style={styles.buttonText}>Resend a code</Text>}
                                {resending && <ActivityIndicator size='small' color={'#333'} />}
                            </TouchableOpacity>
                            <View style={styles.spacer} />
                            <TouchableOpacity onPress={() => this.cancel()} style={styles.bottomButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: 'rgba(255,255,255,0.97)',
        borderRadius: 10,
        height: 150,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 4,
        width: '80%'
    },
    bottom: {
        height: 44,
        width: '100%',
        backgroundColor: 'rgba(252,252,252,0.97)',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row'
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 14,
        color: 'black',
        // fontWeight:'bold'
    },
    verifyCode: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center'
    },
    spacer: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc',
        height: '100%'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15,
    }
})