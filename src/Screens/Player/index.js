import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text, PlayerControl } from "../../Common";
import { logo, } from "../../Assets/images";
import { SettingIcon, Pause, SeekLeft, SeekRight, Loop, LeftCorner, UpArrow, Cross, play_black } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';

const Player = ({ route }) => {
    const [isPlaying, setIsPlaying] = useState(true);

    const navigation = useNavigation()
    const { item, isFromPodcast } = route.params;
    console.log("🚀 ~ file: index.js ~ line 14 ~ Player ~ item", item)


    console.log(isPlaying)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>
                {isPlaying ? <Video source={{ uri: item.radio_stream }} /> : null}

                <View style={styles.backImgView}>
                    <Image
                        style={styles.backImg}
                        source={isFromPodcast ? { uri: item.podphoto } : { uri: item.big_photo }}
                    />
                </View>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.touBack}>
                        <View style={styles.topBackView}>
                            <Image style={styles.topBackImg} source={require('../../Assets/images/login_logo.png')} />
                        </View>
                        <Text style={styles.topBackTxt}>BACK</Text>
                    </TouchableOpacity>
                </View>



                <LinearGradient colors={['rgba(44,41,57,0)', 'rgba(44,41,57,0.01)', 'rgba(44,41,57,0.1)', 'rgba(44,41,57,0.2)', 'rgba(44,41,57,0.5)', 'rgba(44,41,57,0.9)', 'rgba(44,41,57,0.99)', 'rgba(44,41,57,1)',]}
                    style={styles.linGrad}>
                    <Text style={styles.nowPla}>NOW PLAYING</Text>
                    <View style={styles.main}>
                        <View style={styles.conView}>
                            <View>
                                <Text style={styles.title}>{isFromPodcast ? item.podtitle : item.title}</Text>
                                <Text numberOfLines={1} style={styles.epiTxt}>{isFromPodcast ? item.podsubtitle : item.description}</Text>
                            </View>
                            <TouchableOpacity style={styles.icoTho}>
                                <SvgXml xml={SettingIcon} />
                            </TouchableOpacity>
                        </View>
                        <PlayerControl podstream={item.podstream} isFromPodcast={isFromPodcast} />

                        <TouchableOpacity onPress={() => { navigation.navigate('CreateAccount') }} style={styles.chatView}>
                            <SvgXml xml={UpArrow} />
                            <Text style={styles.queTxt}>CHAT</Text>
                        </TouchableOpacity>

                    </View>

                </LinearGradient>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    backImgView: { top: -20, left: 0, right: 0, bottom: -50, position: 'absolute' },
    backImg: { width: '100%', height: '100%', },
    backView: { zIndex: +1111, right: 0, left: 0, position: 'absolute', top: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    touBack: { alignItems: 'center', flexDirection: 'row' },
    topBackView: { width: 50, height: 50, },
    topBackImg: { width: '100%', height: '100%', resizeMode: 'contain', },
    topBackTxt: { marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, },
    linGrad: { justifyContent: 'flex-end', paddingBottom: 230, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    nowPla: { marginBottom: 30, backgroundColor: '#2C293980', padding: 7, width: 120, textAlign: 'right', paddingRight: 15, fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, color: '#50E3C2', textAlignVertical: 'center', borderTopRightRadius: 30, borderBottomRightRadius: 30, },
    main: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 20, },
    conView: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    title: { color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 18, },
    epiTxt: { color: '#FFFFFF80', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, },
    icoTho: { width: 55, height: 55, justifyContent: 'center', alignItems: 'center' },
    sliView: { marginHorizontal: 8, marginTop: 10, marginBottom: 3, },
    durationTxt: { color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },
    controlView: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' },
    middleIco: { backgroundColor: '#50E3C2', borderRadius: 50, width: 65, height: 65, justifyContent: 'center', alignItems: 'center' },
    chatView: { alignSelf: 'center', marginTop: 15, flexDirection: 'row', width: 90, height: 30, backgroundColor: '#FFFFFF20', borderRadius: 40, justifyContent: 'center', alignItems: 'center', },
    queTxt: { marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },




})

export default Player;