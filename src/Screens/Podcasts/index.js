import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { PodcastsSendIcon, PodcastsMinusIcon } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Podcasts = ({navigation}) => {
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
                    <Text style={{ color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 22, }}>PODCASTS</Text>
                </View>

                <View style={{ marginLeft: 10, flexDirection: 'row', flexWrap: 'wrap' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', marginHorizontal: 5, borderColor: '#707070', borderWidth: 1, marginVertical: 5, borderRadius: 60, height: 40, }}>
                        <View style={{ marginRight: 5, width: 5, height: 5, borderRadius: 10, backgroundColor: '#50E3C2' }} />
                        <Text style={{ color: '#FFF', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>MIX</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', marginHorizontal: 5, borderColor: '#707070', borderWidth: 1, marginVertical: 5, borderRadius: 60, height: 40, }}>
                        <Text style={{ color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>ELDERLY'S</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', marginHorizontal: 5, borderColor: '#707070', borderWidth: 1, marginVertical: 5, borderRadius: 60, height: 40, }}>
                        <Text style={{ color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>SHADE OF THE DAY</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', marginHorizontal: 5, borderColor: '#707070', borderWidth: 1, marginVertical: 5, borderRadius: 60, height: 40, }}>
                        <Text style={{ color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>RNB</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', marginHorizontal: 5, borderColor: '#707070', borderWidth: 1, marginVertical: 5, borderRadius: 60, height: 40, }}>
                        {/* <View style={{ marginRight: 5, width: 5, height: 5, borderRadius: 10, backgroundColor: '#50E3C2' }} /> */}
                        <Text style={{ color: '#50E3C2', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}> + MORE</Text>
                    </View>

                </View>

                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-around', padding: 15, flexDirection: 'row', flexWrap: 'wrap' }} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,]} renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity onPress={()=>{navigation.navigate('Playing')}} style={{  width: 155, borderRadius: 10, marginHorizontal: 5, marginVertical: 10, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                                <Image style={{  width: 100, height: 140, resizeMode: 'contain' }} source={index % 2 == 0 ? require('../../Assets/images/design.png') : require('../../Assets/images/pray.png')} />
                                <View>
                                    <Image style={{ marginLeft: -50, zIndex: -1, width: 100, height: 100, resizeMode: 'contain' }} source={require('../../Assets/images/podcastcircle.png')} />
                                    <View style={{ position: 'absolute', top: 35, left: 15 }}>
                                        <Text style={{ color: '#50E3C2', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, }}>267</Text>
                                        <Text style={{ marginTop: -5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 10, }}>EP</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <Text style={{ marginTop: 5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>{index % 2 == 0 ? 'REPEAT SHOW' : 'PRAY PER DAY'}</Text>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, width: 40, height: 40, }}>
                                    {
                                        index % 2 == 0 ?
                                            <SvgXml xml={PodcastsMinusIcon} />
                                            :
                                            <SvgXml xml={PodcastsSendIcon} />
                                    }
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                    )
                }} />




            </ScrollView>
        </SafeAreaView>
    )
}

export default Podcasts;