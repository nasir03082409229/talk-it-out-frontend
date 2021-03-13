import Slider from '@react-native-community/slider';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from "react-native-svg";
import { Pause, play_black, SeekLeft, SeekRight, SettingIcon, UpArrow } from "../../Assets/Icons";
import { Text } from "../../Common";
import {
    pauseAudio, playAudio, startAudio, stopAudio,
    startPodcastPlayer, pausePodcastPlayer, seekToPodcastPlayer, playPodcastPlayer
} from '../../store/Action';
import { Typography } from "../../Styles";
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';


const Player = ({ route }) => {
    const { position, duration } = useTrackPlayerProgress();

    const [isPlaying, setIsPlaying] = useState(true);
    const [player, setPlayer] = useState(null);

    const navigation = useNavigation()
    const { item, isFromPodcast } = route.params;

    useEffect(() => {
        startPodcastPlayer(item)
        return () => {
            // stopAudio()
        }
    }, [])

    const toogleStartStopAudio = () => {
        console.log("isPlaying", isPlaying)
        if (isPlaying) {
            setIsPlaying(!isPlaying)
            pausePodcastPlayer()
        } else {
            setIsPlaying(!isPlaying)
            playPodcastPlayer()
        }
    }
    function secondsToTime(secs) {
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        var obj = { "h": hours, "m": minutes, "s": seconds };
        return `${hours}:${minutes}:${seconds}`;

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>
                {/* {isPlaying ? <Video source={{ uri: item.radio_stream }} /> : null} */}

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
                        <View>
                            <View style={styles.sliView}>
                                {/* {isPlaying && <Video
                                        disableFocus={true}
                                        playWhenInactive={true}
                                        playInBackground={true}
                                        audioOnly
                                        // style={{ height: 100, width: 100, borderWidth: 2 }}
                                        source={{ uri: stream }} />} */}
                                <Slider value={position}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    minimumTrackTintColor="#707070"
                                    maximumTrackTintColor="#707070"
                                    onSlidingComplete={(value) => {
                                        seekToPodcastPlayer(value)
                                        setIsPlaying(true)
                                    }} />
                            </View>
                            <View style={styles.conView}>
                                <Text style={styles.durationTxt}>{position && secondsToTime(position)}</Text>
                                <Text style={styles.durationTxt}>{duration && secondsToTime(duration)}</Text>
                            </View>
                            <View style={styles.controlView}>
                                <View />
                                <TouchableOpacity onPress={() => { seekToPodcastPlayer(position - 15); setIsPlaying(true) }} style={styles.icoTho}>
                                    <SvgXml xml={SeekLeft} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { toogleStartStopAudio() }} style={styles.middleIco}>
                                    {isPlaying ? <SvgXml xml={Pause} /> : <SvgXml xml={play_black} />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { seekToPodcastPlayer(position + 15); setIsPlaying(true) }} style={styles.icoTho}>
                                    <SvgXml xml={SeekRight} />
                                </TouchableOpacity>
                                <View />
                            </View>
                        </View>
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