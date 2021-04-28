import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import HSNZ from "react-native-hsnz-marquee";
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from "react-native-svg";
import { Pause, play_black, SettingIcon, UpArrow } from "../../Assets/Icons";
import { Text } from "../../Common";
import { startAudio, stopAudio } from '../../store/Action';
import { logoutAction } from '../../store/AuthAction';
import { Typography } from "../../Styles";

const RadioPlayer = ({ route }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [player, setPlayer] = useState(null);

    const navigation = useNavigation()
    const isFocused = useIsFocused();

    const { item, isFromPodcast } = route.params;
    const [interval, setIntervalstate] = useState(null)
    const [metaData, setMetaData] = useState(null)

    useEffect(() => {
        console.log('isFocusedisFocused', isFocused)
        if (!isFocused) {
            clearInterval(interval)
            return;
        }
        startAudio(item)
        startInterval();
        const unsubscribe = navigation.addListener('blur', e => {
            clearInterval(interval)
        });
    }, [isFocused])

    const startInterval = () => {
        if (isFocused) {

            interval && clearInterval(interval)
            setTimeout(() => {
                getMetaData()
            }, 1000);
            const intervalRef = setInterval(() => {
                getMetaData()
            }, 10000);
            setIntervalstate(intervalRef)
        }
    }

    const getMetaData = async () => {
        console.log('item', item)
        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            var config = {
                method: 'get',
                url: `https://talkitoutqueen.com/dashboard/api/metadata/${item.id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`

                }
            };
            const { data } = await axios(config)
            setMetaData(data)
            // updateOption(item.id, data.cover, item.title)
            console.log('AFTER UPDATE')
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 58 ~ getMetaData ~ error", error)
            if (error.response.status == 401) {
                logoutAction(navigation)
            }
        }
    }

    const toogleStartStopAudio = () => {
        setIsPlaying(!isPlaying)
        if (isPlaying) {
            console.log("🚀 ~ file: index.js ~ line 29 ~ toogleStartStopAudio ~ isPlaying", isPlaying)
            stopAudio()
        } else {
            startAudio(item)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>

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
                                <View>
                                    <Text style={[styles.title,]}>{item.title}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {metaData && <HSNZ
                                        style={{ height: 20, width: 200, }}
                                        loop={-1}
                                        direction={"rtl"}
                                        autoPlay={true}
                                        speed={40}
                                        onEnd={() => null}
                                    >
                                        <Text style={styles.epiTxt}>{metaData && metaData.title}</Text>
                                    </HSNZ>}
                                </View>

                            </View>
                            <TouchableOpacity style={styles.icoTho}>
                                <SvgXml xml={SettingIcon} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={styles.sliView}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={1}
                                    minimumTrackTintColor="#707070"
                                    maximumTrackTintColor="#707070"
                                />
                            </View>

                            <View style={styles.controlView}>
                                <View />

                                <TouchableOpacity onPress={() => { toogleStartStopAudio() }} style={styles.middleIco}>
                                    {isPlaying ? <SvgXml xml={Pause} /> : <SvgXml xml={play_black} />}
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

export default RadioPlayer;