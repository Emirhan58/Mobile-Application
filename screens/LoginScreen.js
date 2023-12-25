import React, { useState } from 'react';
import UserService from '../services/UserService';

import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

import { Input, Button } from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from './Global';

import { Flow } from 'react-native-animated-spinkit';
import { emailValidation } from '../functions/inputValidation';

export default function LoginScreen({ navigation }) {

    const [pinSecure, setPinSecure] = useState(true);

    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();

    const [emailErr, setEmailErr] = useState('');
    const [pwdErr, setPwdErr] = useState('');

    const [ loading, setLoading ] = useState(false);


    function handleSubmit(){
        setEmailErr('');
        setPwdErr('');
        var goodToGo = true;
        setLoading(true);
        if(!email){
            goodToGo = false;
            setEmailErr('Required Field');
            setLoading(false);
        }
        if(!pwd){
            goodToGo = false;
            setPwdErr('Required Field');
            setLoading(false);
        }

        if(goodToGo){
            
            const userService = new UserService();
            userService.LogIn({ email , pwd },  () => {
                setLoading(false);
            }, (err) => {
                setPwdErr(`${err}`);
                setLoading(false);
            });
        }
        
    }
    function handleEmail(value){
        setEmail(value);
        setEmailErr('');
    }
    
    function handlePwd(value){
        setPwd(value);
        setPwdErr('');
    }

    function handleForgotPassword(){
        navigation.push('ForgotPassword', {
            insertedValue: email
        });
    }

    function BottomLogin(){
        return (
            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <Text
                style={{
                    color: 'white',
                    borderColor: "black"
                }}
                >
                    Need an account? {' '}
                </Text>
                <TouchableHighlight
                    onPress={() => {
                        navigation.push('Signup');
                    }}
                    underlayColor={'transparent'}
                >
                    <Text style={{
                        color: Global.tabactive
                    }}>Sign Up</Text>                  
                </TouchableHighlight>
            </View>
        )
    }
    
    return (
        <>
        <View style={styles.container}>
            <TouchableHighlight style={styles.arrowStyle} underlayColor={'transparent'} >
                <MaterialCommunityIcons name='' color={'white'} size={24}
                    style={{
                        padding: 0,
                        width: 24,
                        height: 24
                    }}
                />
            </TouchableHighlight>
            <Image 
                style={styles.image}
                source={require('../assets/Images/logo-white.png')}
            />
            <Text style={styles.title} >
                Log In
            </Text>
            <View style={{ alignItems: 'center' }}>
                <Input
                    value={email}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    autoCompleteType={'email'}
                    textContentType={'emailAddress'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="email" size={20} color={"#CCC"} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: '90%',
                        maxWidth: 400,
                        minWidth: 320
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    onChangeText={handleEmail}
                    errorMessage={emailErr}
                    errorStyle={styles.erroStyle}
                />
                <Input
                    value={pwd}
                    placeholder={"Password"}
                    keyboardType={"default"}
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="account-key" size={20} color={"#CCC"} />
                    }
                    rightIcon={
                        <PasswordEyeIcon pinSecure={pinSecure} setPinSecure={setPinSecure} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: '90%',
                        maxWidth: 400,
                        minWidth: 320
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    secureTextEntry={pinSecure}
                    onChangeText={handlePwd}
                    errorMessage={pwdErr}
                    errorStyle={styles.erroStyle}
                />
                <TouchableHighlight underlayColor={'transparent'} onPress={handleForgotPassword} >
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: '#BBB'
                        }}
                    >
                        Forgot Password?
                    </Text>
                </TouchableHighlight>
                <View style={{marginTop: 30, alignItems: 'center', width: '90%', maxWidth: 400}}>
                    <Button 
                        title='LOGIN'
                        containerStyle={styles.buttonstyle}
                        buttonStyle={styles.buttonstyle}
                        titleStyle={loading ? { display: 'none' } : { fontSize: 14 }}
                        icon={ loading && <Flow size={30} color='white' /> }
                        disabled={loading}
                        iconContainerStyle={!loading ? { display: 'none' } : null}
                        onPress={handleSubmit}
                        disabledStyle={{ backgroundColor: "#899B9A" }}
                    />
                </View>
                <BottomLogin />
            </View>
        </View>
        </>
    )
}




function PasswordEyeIcon({ pinSecure, setPinSecure }){

    return (
        <TouchableHighlight
            style={{ padding: 4 }}
            onPress={ () => {
                setPinSecure(!pinSecure)
            } }
            underlayColor={'transparent'}
        >
            {
                (pinSecure === true)? (
                    <MaterialCommunityIcons
                        name='eye'
                        color={"#CCC"}
                        size={20}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name='eye-off'
                        color={"#CCC"}
                        size={20}
                    />
                )
            }
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    arrowStyle: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: '5%'
    },
    container: {
        flexGrow: 1,
        height: '100%',
        padding: '30%',
        backgroundColor: Global.primary,
    },
    image: {
        width: 45,
        height: 45,
        alignSelf: 'center',
        marginBottom: 5
    },
    title: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        marginBottom: 40
    },
    inputcontainer: {
        borderColor: 'transparent',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
        height: 52,
        borderRadius: 25
    },
    input: {
        color: '#CCC',
        marginLeft: 2,
        fontSize: 16
    },
    buttonstyle: {
        width: '100%',
        height: 45,
        borderRadius: 50,
        backgroundColor: Global.buttonbg1
    },
    erroStyle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#F88',
        marginTop: 0,
        marginBottom: 8,
        marginHorizontal: 30
    }
})