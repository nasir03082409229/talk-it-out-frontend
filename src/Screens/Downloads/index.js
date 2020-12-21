import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { PodcastsSendIcon, PodcastsMinusIcon, SettingIcon, PlayIcon } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Downloads = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', top: 20, left: 10, width: 130, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ width: 50, height: 50, }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={require('../../Assets/images/login_logo.png')} />
                    </View>
                    <Text style={{ marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, }}>BACK</Text>
                </TouchableOpacity>
                <Image style={{ width: 310, height: 310, opacity: 1, position: 'absolute', right: -115, top: -100, }} source={require('../../Assets/images/transparentDesign.png')} />

                <View style={{ marginTop: 130, marginLeft: 20, }}>
                    <Text style={{ color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 22, }}>DOWNLOADS</Text>
                    <Text style={{ color: '#E6E6E650', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, }}>Listen to all your playlists {'\n'}offline right here.</Text>
                </View>



                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 15, }} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,]} renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate('Pray') }} style={{ marginVertical: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={PlayIcon} />
                            </TouchableOpacity>
                            <View style={{ marginLeft: 20, flex: 1, }}>
                                <Text style={{ color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>Episode 148</Text>
                                <Text style={{ color: '#E6E6E640', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, }}>Martin Garrix Show</Text>
                                <Text style={{ color: '#E6E6E640', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, }}>1:42:00</Text>
                            </View>
                            <TouchableOpacity style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={SettingIcon} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }} />




            </ScrollView>
        </SafeAreaView>
    )
}

export default Downloads;