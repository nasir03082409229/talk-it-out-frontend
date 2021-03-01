import React, { useState } from "react";
import { View, Image, StatusBar, SafeAreaView, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "../../Common";
import { logo } from "../../Assets/images";
import { SignInLeftArrow } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import Axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Register = ({ navigation }) => {


    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loader, setLoader] = useState(false)

    const onPressLogin = () => {
        setEmailError('')
        setPasswordError('')
        setPasswordConfirmationError('')
        setNameError('')

        if (name) {
            if (validateEmail(email)) {
                if (password.length >= 6) {
                    if (password === passwordConfirmation) {
                        setLoader(true)

                        Axios({
                            url: 'https://talkitoutqueen.com/dashboard/api/register',
                            method: 'post',
                            data: {
                                "name": name,
                                "email": email,
                                "password": password,
                                "password_confirmation": passwordConfirmation
                            }
                        }).then(async (response) => {
                            console.log(response.data)
                            await AsyncStorage.setItem('@access_token', response.data.access_token)
                            await AsyncStorage.setItem('@user', JSON.stringify(response.data.user))

                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        { name: 'BottomStackComp' },
                                    ],
                                })
                            );
                            setLoader(false)
                        }).catch((err) => {
                            if (err.response.status == 422) {
                                setEmailError(err.response.data.errors.email[0])
                            }
                            setLoader(false)
                        })
                    } else {
                        setPasswordConfirmationError('Password mismatch')
                    }
                } else {
                    setPasswordError('Passowrd should be greater then six characters')
                }
            } else {
                setEmailError('Invalid email')
            }
        } else {
            setNameError('Name is required')
        }
    }
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <View style={styles.logoView}>
                    <Image resizeMode={'contain'} source={require('../../Assets/images/login_logo.png')} />
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={styles.talkTxt}>TALK</Text>
                        <Text style={styles.itOutTxt}>IT OUT</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 25 }}>
                    <Text style={styles.loginTxt}>REGISTER</Text>
                    <View style={styles.inputView}>
                        <TextInput value={name} onChangeText={(text) => setName(text)} placeholder={'Name'} placeholderTextColor={'#707070'} style={styles.input} />
                    </View>
                    {nameError.length > 0 && <Text style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{nameError}</Text>}
                    <View style={styles.inputView}>
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder={'Email'} placeholderTextColor={'#707070'} style={styles.input} />
                    </View>
                    {emailError.length > 0 && <Text style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{emailError}</Text>}
                    <View style={styles.inputView}>
                        <TextInput secureTextEntry value={password} onChangeText={(text) => setPassword(text)} secureTextEntry placeholder={'Password'} placeholderTextColor={'#707070'} style={styles.input} />
                    </View>
                    {passwordError.length > 0 && <Text style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{passwordError}</Text>}
                    <View style={styles.inputView}>
                        <TextInput secureTextEntry value={passwordConfirmation} onChangeText={(text) => setPasswordConfirmation(text)} placeholder={'Password Confirmation'} placeholderTextColor={'#707070'} style={styles.input} />
                    </View>
                    {passwordConfirmationError.length > 0 && <Text style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{passwordConfirmationError}</Text>}
                    <TouchableOpacity disabled={loader} onPress={() => { onPressLogin() }} style={styles.signInView}>
                        {!loader ? <SvgXml xml={SignInLeftArrow} /> : <ActivityIndicator color={'#fff'} size={20} />}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.subTxt}>REGISTER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 20 }}>
                        <Text style={styles.subText}>Already have account? Sign in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    subText: { paddingTop: 10, textAlign: 'center', fontSize: 14, color: 'white', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, },
    logoView: { height: 240, flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: 100 },
    talkTxt: { textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 33 },
    itOutTxt: { textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 25, marginLeft: 8, marginTop: -22, },
    loginTxt: { paddingLeft: 15, fontSize: 18, color: '#fff', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, },
    inputView: { marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' },
    input: { paddingLeft: 25, fontSize: 14, color: '#FFF' },
    signInView: { borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, alignSelf: 'center', marginTop: 20, justifyContent: 'center', alignItems: 'center' },
    subTxt: { fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 14, color: '#FFFFFF40', textAlign: 'center', marginVertical: 10 },



})

export default Register;