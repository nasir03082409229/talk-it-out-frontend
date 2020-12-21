import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';

const Store = ({navigation}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <View style={{
                    
                    top: -20, left: 0, right: 0, bottom: -50,
                    position: 'absolute'
                }}>
                    <Image
                        style={{  width: '100%', height: '100%', }}
                        source={require('../../Assets/images/prayback.png')}
                    />
                </View>


                <View style={{zIndex:+11111, right: 0, left: 0, position: 'absolute', top: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ width: 50, height: 50, }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={require('../../Assets/images/login_logo.png')} />
                        </View>
                        <Text style={{ marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, }}>BACK</Text>
                    </TouchableOpacity>
                </View>

                <LinearGradient colors={['#00000000', '#00000040', '#000000', '#000000' ]} style={{ justifyContent:'flex-end', paddingBottom:150, position:'absolute',top:0, bottom:0, left:0, right:0}}>
                    <View style={{  }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 18, }}>CHECK OUT DI STORE</Text>
                        <Text style={{ textAlign: 'center', color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, }}>COMING SOON</Text>
                        <Text style={{ textAlign: 'center', color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, }}>WITH KOOL NEW CUSTOMISED PRODUCTS</Text>
                    </View>
                </LinearGradient>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Store;