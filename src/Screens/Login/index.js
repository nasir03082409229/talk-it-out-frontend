import React from "react";
import { View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
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
                <View style={{ height: 240, flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: 100 }}>
                    <Image resizeMode={'contain'} source={require('../../Assets/images/login_logo.png')} />
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 33 }}>TALK</Text>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 25, marginLeft: 8, marginTop: -22, }}>IT OUT</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 25 }}>
                    <Text style={{ paddingLeft: 15, fontSize: 18, color: '#fff', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, }}>LOGIN</Text>
                    <View style={{ marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                        <TextInput placeholder={'Email'} placeholderTextColor={'#707070'} style={{ paddingLeft: 25, fontSize: 14, color: '#FFF' }} />
                    </View>
                    <View style={{ marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                        <TextInput secureTextEntry placeholder={'Password'} placeholderTextColor={'#707070'} style={{ paddingLeft: 25, fontSize: 14, color: '#FFF' }} />
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate('BottomStackComp') }} style={{ borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, alignSelf: 'center', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <SvgXml xml={SignInLeftArrow} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={{ fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 14, color: '#FFFFFF40', textAlign: 'center', marginTop: 40, }}>SUBSCRIBE</Text>
                    </TouchableOpacity>


                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;