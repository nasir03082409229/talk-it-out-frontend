import React, { useState, useEffect } from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { PlayIcon, SettingIcon, Cross, PauseActive } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import SoundPlayer from 'react-native-sound-player'



const Playing = ({ navigation }) => {
    const [isPlay, setIsPlay] = useState(false);
    SoundPlayer.loadSoundFile('birdsound', 'mp3');
    useEffect(() => {

        if (isPlay) {
            AudioPlay();
        } else {
            AudioStop();
        }

    }, [isPlay]);


    const AudioPlay = () => {
        // setTimeout(() => {
        //     setIsPlay(true);
        // }, 3000)
        SoundPlayer.play()
    }
    const AudioStop = () => {
        // setTimeout(() => {
        //     setIsPlay(false);
        // }, 1000)
        SoundPlayer.pause();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>


                <View style={{

                    top: 0, left: 0, right: 0,
                    height: 300,
                }}>
                    <Image
                        style={{ resizeMode: 'stretch', backgroundColor: '#000', width: '100%', height: '100%', }}
                        source={require('../../Assets/images/pray.png')}
                    />


                    <LinearGradient colors={['rgba(44,41,57,0)', 'rgba(44,41,57,0.01)', 'rgba(44,41,57,0.1)', 'rgba(44,41,57,0.2)', 'rgba(44,41,57,0.5)', 'rgba(44,41,57,0.9)', 'rgba(44,41,57,0.99)', 'rgba(44,41,57,1)',]} style={{ justifyContent: 'flex-end', paddingBottom: 150, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>

                        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, }}>
                            <Text style={{ marginHorizontal: 20, borderRadius: 10, backgroundColor: '#2C2939', width: 100, textAlign: 'center', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, color: '#50E3C2', textAlignVertical: 'center' }}>NOW PLAYING</Text>
                            <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View>
                                    <Text style={{ color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 18, }}>Lets Pray</Text>
                                    <Text style={{ color: '#FFFFFF80', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, }}>EPISODE - 14</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    if (isPlay) {
                                        setIsPlay(false);
                                    } else {
                                        setIsPlay(true);
                                    }

                                }} style={{ borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        isPlay ?
                                            <SvgXml xml={PauseActive} />
                                            :
                                            <SvgXml xml={PlayIcon} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginHorizontal: 8, marginTop: 10, }}>
                                <Slider
                                    style={{}}
                                    minimumValue={0}
                                    maximumValue={1}
                                    minimumTrackTintColor="#707070"
                                    maximumTrackTintColor="#707070"
                                />
                            </View>
                            <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={{ color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, }}>1:02:50</Text>
                                <Text style={{ color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, }}>1:02:50</Text>
                            </View>


                        </View>

                    </LinearGradient>
                </View>

                <View style={{ right: 0, left: 0, position: 'absolute', top: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ width: 50, height: 50, }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={require('../../Assets/images/login_logo.png')} />
                        </View>
                        <Text style={{ marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, }}>BACK</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginLeft: 20, marginTop: 5, color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, }}>UP NEXT</Text>

                <FlatList keyExtractor={index => index.toString()} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, }} data={[1, 2, 3, 4, 5, 6,]} renderItem={({ index, item }) => {
                    return (
                        <View style={{ marginVertical: 10, alignItems: 'center', flexDirection: 'row', }}>
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
                        </View>
                    )
                }} />

                <View style={{ position: 'absolute', bottom: 15, alignSelf: 'center', backgroundColor: '#FFFFFF20', borderRadius: 40, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <SvgXml xml={Cross} />
                </View>

                {/* <LinearGradient colors={['#00000000', '#00000030', '#000000EE', '#000000']} style={{ justifyContent: 'flex-end', paddingBottom: 150, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <View style={{ marginTop: 300, marginLeft: 20, paddingRight: 20, }}>
                        <Text style={{ color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 18, }}>PRAYER OF THE DAY</Text>
                        <Text style={{ color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, }}>Grant us patience, O Lord, to follow the road you have taken. Let our confidence not rest in our own understanding but in your guiding hand; let our desires not be for our own comfort, but for the joy of your kingdom; for your cross is our hope and our joy now and unto the day of eternity. Amen.</Text>
                    </View>
                </LinearGradient> */}


            </ScrollView>
        </SafeAreaView>
    )
}

export default Playing;