import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Explore = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <TouchableOpacity style={{ position: 'absolute', top: 20, left: 10, width: 130, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ width: 50, height: 50, }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={require('../../Assets/images/login_logo.png')} />
                    </View>
                    <Text style={{ marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, }}>BACK</Text>
                </TouchableOpacity>
                <Image style={{ width: 310, height: 310, opacity: 1, position: 'absolute', right: -115, top: -100, }} source={require('../../Assets/images/transparentDesign.png')} />

                <View style={{ marginTop: 130, marginLeft: 20, }}>
                    <Text style={{ color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 22, }}>EXPLORE</Text>
                    <Text style={{ color: '#E6E6E650', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, }}>all your favourite {'\n'}features under one roof!</Text>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', borderColor: '#707070', borderWidth: 1, marginVertical: 20, borderRadius: 60, height: 50, }}>
                    <TextInput placeholder={'Search'} placeholderTextColor={'#707070'} style={{ flex: 1, paddingLeft: 25, fontSize: 14, color: '#FFF' }} />

                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, width: 40, height: 40, }}>
                        <SvgXml xml={Mic} />
                    </TouchableOpacity>

                </View>

                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems:'center', justifyContent: 'space-around', padding: 15, flexDirection: 'row', flexWrap: 'wrap' }} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,]} renderItem={({ index, item }) => {
                    return (
                        <View style={{ borderRadius:10, marginHorizontal:5, marginVertical:10,}}>
                            <Image style={{width:100, height:140, resizeMode:'contain'}} source={index % 2 == 0 ? require('../../Assets/images/design.png') : require('../../Assets/images/pray.png') } />
                            <Text style={{marginTop:5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>{index % 2 == 0 ? 'REPEAT SHOW' : 'PRAY PER DAY'}</Text>
                            <Text style={{ color: '#E8E8E850', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, }}>2.5K</Text>
                        </View>
                    )
                }} />

                {/* <View style={{ paddingHorizontal: 25 }}>
                    <Text style={{ paddingLeft: 15, fontSize: 18, color: '#fff', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, }}>LOGIN</Text>
                    <View style={{ marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                        <TextInput placeholder={'Email'} placeholderTextColor={'#707070'} style={{ paddingLeft: 25, fontSize: 14, color: '#FFF' }} />
                    </View>
                    <View style={{ marginVertical: 10, borderRadius: 60, height: 55, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                        <TextInput secureTextEntry placeholder={'Password'} placeholderTextColor={'#707070'} style={{ paddingLeft: 25, fontSize: 14, color: '#FFF' }} />
                    </View>


                </View> */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Explore;