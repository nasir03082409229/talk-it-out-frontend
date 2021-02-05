import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const ForgetPassword = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>

                <View style={{ right: 0, left: 0, position: 'absolute', top: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ width: 50, height: 50, }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={require('../../Assets/images/login_logo.png')} />
                        </View>
                        <Text style={{ marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, }}>BACK</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 200, }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, }}>Forgot Password</Text>
                    <View style={{ height: 2, marginVertical: 5, backgroundColor: '#FFFFFF' }} />

                    <TextInput placeholder='Email' style={{ height: 40, paddingLeft: 10, marginVertical: 10, backgroundColor: '#FFF' }} />
                    {/* <TextInput placeholder='Room' style={{ height: 40, paddingLeft: 10, backgroundColor: '#FFF' }} /> */}

                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 40, marginVertical: 10, backgroundColor: '#2979FF' }}>
                        <Text style={{ color: '#FFF' }}>Send</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgetPassword;