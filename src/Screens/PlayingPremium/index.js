import React, { useState, useEffect, useRef } from "react";
import { Animated, FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { PlayIcon, DownloadIcon, Cross, PauseActive, AddIconPlaying } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import SoundPlayer from 'react-native-sound-player'



var currentTimerLocal = 0;
const PlayingPremium = ({ navigation }) => {

    const [isPlay, setIsPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const timerToClearSomewhere = useRef(null)
    const [currentTime, setCurrentTime] = useState(0);
    SoundPlayer.loadSoundFile('birdsound', 'mp3');
    var intervalTimer;
    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
        console.log('getInfo init', info)
        setDuration(info.duration)
        // setCurrentTime(info.currentTime)
    }



    useEffect(() => {

        console.log('effect', isPlay);
        if (isPlay) {
            timerToClearSomewhere.current = setInterval(() => {
                console.log('in inter', currentTimerLocal);
                currentTimerLocal = currentTimerLocal + 1;
                setTimeout(() => {
                    setCurrentTime(currentTimerLocal)
                }, 0);
            }, 1000);
            AudioPlay();
            // SoundPlayer.stop()
            SoundPlayer.seek(currentTimerLocal)

        } else {
            console.log('else', currentTimerLocal);
            clearInterval(timerToClearSomewhere.current)
            AudioStop();
            // SoundPlayer.resume()

        }

    }, [isPlay]);

    console.log(currentTimerLocal);

    const AudioPlay = () => {
        // setTimeout(() => {
        //     setIsPlay(true);
        // }, 3000)
        // SoundPlayer.resume()
        SoundPlayer.play()
    }
    const AudioStop = async () => {
        // setTimeout(() => {
        //     setIsPlay(false);
        // }, 1000)
        SoundPlayer.pause();
        const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
        console.log('getInfo in STOP', info)


    }

    const [animation, setAnimation] = useState(new Animated.Value(0));

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: -50,
            duration: 1000
        }).start()

    }

    // setTimeout(() => {
    //     startAnimation();

    // }, 500);



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>


                <View style={styles.backImgView}>
                    <Image
                        style={styles.backImg}
                        source={require('../../Assets/images/pray.png')}
                    />


                    <LinearGradient colors={['rgba(44,41,57,0)', 'rgba(44,41,57,0.01)', 'rgba(44,41,57,0.1)', 'rgba(44,41,57,0.2)', 'rgba(44,41,57,0.5)', 'rgba(44,41,57,0.9)', 'rgba(44,41,57,0.99)', 'rgba(44,41,57,1)',]}
                        style={styles.linGrad}>

                        <View style={styles.main}>
                            <Text style={styles.noePlay}>NOW PLAYING</Text>
                            <View style={styles.detailView}>
                                <View>
                                    <Text style={styles.title}>Lets Pray</Text>
                                    <Text style={styles.epi}>PREMIUM EPISODE - 14</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('PlayerPremium')
                                }} style={styles.controls}>
                                    {
                                        isPlay ?
                                            <SvgXml xml={PauseActive} />
                                            :
                                            <SvgXml xml={PlayIcon} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.sliderView}>
                                <Slider
                                    value={currentTimerLocal}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    minimumTrackTintColor="#707070"
                                    maximumTrackTintColor="#707070"
                                />
                            </View>
                            <View style={styles.durationView}>
                                <Text style={styles.duration}>{0}</Text>
                                <Text style={styles.duration}>{duration}</Text>
                            </View>


                        </View>

                    </LinearGradient>
                </View>

                <View style={styles.topBackView}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.topBackTho}>
                        <View style={styles.topBackImgView}>
                            <Image style={styles.topBackImg} source={require('../../Assets/images/login_logo.png')} />
                        </View>
                        <Text style={styles.topBackTxt}>BACK</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.nextTxt}>UP NEXT</Text>

                <FlatList keyExtractor={index => index.toString()} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, }} data={[1, 2, 3, 4, 5, 6,]} renderItem={({ index, item }) => {
                    return (
                        <View style={styles.listMainView}>
                            <TouchableOpacity style={styles.playIco}>
                                <SvgXml xml={PlayIcon} />
                            </TouchableOpacity>
                            <View style={styles.detailTxt}>
                                <Text style={styles.epiTxt}>Episode 148</Text>
                                <Text style={styles.title}>Martin Garrix Show</Text>
                                <Text style={styles.durationTxt}>1:42:00</Text>
                            </View>

                            <View style={{ backgroundColor: 'rgba(0,0,255,0)', width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ position: 'absolute' }}>
                                    <TouchableOpacity style={[styles.setTou, { backgroundColor: 'rgba(0,255,0,0)', }]}>
                                        <SvgXml xml={AddIconPlaying} />
                                    </TouchableOpacity>
                                </View>
                                <Animated.View

                                    style={[
                                        { position: 'absolute', top:animation },

                                        // {
                                        //     transform: [{
                                        //         translateY: animation,
                                        //     }]
                                        // }
                                    ]}>
                                    <TouchableOpacity onPress={()=>{startAnimation()}}
                                     style={styles.setTou, { backgroundColor: 'rgba(255,0,0,0)', width: 55, height: 55, justifyContent: 'center', alignItems: 'center', }}>
                                        <SvgXml xml={AddIconPlaying} />
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>

                        </View>
                    )
                }} />

                <View style={styles.crossView}>
                    <SvgXml xml={Cross} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backImgView: { top: 0, left: 0, right: 0, height: 300, },
    backImg: { resizeMode: 'stretch', backgroundColor: '#000', width: '100%', height: '100%', },
    linGrad: { justifyContent: 'flex-end', paddingBottom: 150, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    main: { position: 'absolute', bottom: 0, left: 0, right: 0, },
    noePlay: { marginHorizontal: 20, borderRadius: 10, backgroundColor: '#2C2939', width: 100, textAlign: 'center', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, color: '#50E3C2', textAlignVertical: 'center' },
    detailView: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    title: { color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 18, },
    epi: { color: '#FFFFFF80', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, },
    controls: { borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, justifyContent: 'center', alignItems: 'center' },
    sliderView: { marginHorizontal: 8, marginTop: 10, },
    durationView: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    duration: { color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },
    topBackView: { right: 0, left: 0, position: 'absolute', top: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    topBackTho: { alignItems: 'center', flexDirection: 'row' },
    topBackImgView: { width: 50, height: 50, },
    topBackImg: { width: '100%', height: '100%', resizeMode: 'contain', },
    topBackTxt: { marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, },
    nextTxt: { marginLeft: 20, marginTop: 5, color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    listMainView: { marginVertical: 10, alignItems: 'center', flexDirection: 'row', },
    playIco: { borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    detailTxt: { marginLeft: 20, flex: 1, },
    epiTxt: { color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    title: { color: '#E6E6E640', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },
    durationTxt: { color: '#E6E6E640', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },
    setTou: { width: 55, height: 55, justifyContent: 'center', alignItems: 'center' },
    crossView: { position: 'absolute', bottom: 15, alignSelf: 'center', backgroundColor: '#FFFFFF20', borderRadius: 40, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },


})

export default PlayingPremium;