import React from "react";
import { View, Image, StatusBar, SafeAreaView, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo } from "../../Assets/images";
import { SignInLeftArrow } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Login = ({ navigation }) => {
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
                    <Text style={styles.loginTxt}>LOGIN</Text>
                    <View style={styles.inputView}>
                        <TextInput placeholder={'Email'} placeholderTextColor={'#707070'} style={styles.input} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput secureTextEntry placeholder={'Password'} placeholderTextColor={'#707070'} style={styles.input} />
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate('BottomStackComp') }} style={styles.signInView}>
                        <SvgXml xml={SignInLeftArrow} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.subTxt}>SUBSCRIBE</Text>
                    </TouchableOpacity>


                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logoView: { height: 240, flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: 100 },
    talkTxt: { textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 33 },
    itOutTxt: { textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 25, marginLeft: 8, marginTop: -22, },
    loginTxt: { paddingLeft: 15, fontSize: 18, color: '#fff', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, },
    inputView:{ marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' },
    input:{ paddingLeft: 25, fontSize: 14, color: '#FFF' },
    signInView:{ borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, alignSelf: 'center', marginTop: 20, justifyContent: 'center', alignItems: 'center' },
    subTxt:{ fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 14, color: '#FFFFFF40', textAlign: 'center', marginTop: 40, },



})

export default Login;