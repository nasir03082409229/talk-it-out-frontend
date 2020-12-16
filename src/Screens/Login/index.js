import React from "react";
import { View, Image, ImageBackground, SafeAreaView, ScrollView, TextInput } from "react-native";
import { Text } from "../../Common";
import { logo } from "../../Assets/images";
import { Typography, Colors } from "../../Styles";

const Login = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <View style={{ height: 240, flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: 100 }}>
                    <Image resizeMode={'contain'} source={require('../../Assets/images/login_logo.png')} />
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 30 }}>TALK</Text>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 20 }}>IT OUT</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 25 }}>
                    <Text style={{ paddingHorizontal: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, }}>LOGIN</Text>
                    <View style={{ marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                        <TextInput placeholder={'Email'} placeholderTextColor={'#fff'} style={{ paddingHorizontal: 10, fontSize: 14, color: '#fff' }} />
                    </View>
                    <View style={{ marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                        <TextInput secureTextEntry placeholder={'Password'} placeholderTextColor={'#fff'} style={{ paddingHorizontal: 10, fontSize: 14, color: '#fff' }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;