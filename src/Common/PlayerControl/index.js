import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Colors, Typography } from "../../Styles";
import { Text, Touchable } from "..";
import Slider from '@react-native-community/slider';
import { SvgXml } from "react-native-svg";
import { SettingIcon, Pause, SeekLeft, SeekRight, Loop, LeftCorner, UpArrow, Cross, play_black } from "../../Assets/Icons";
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';


const PlayerControl = ({ stream, isFromPodcast }) => {
    const { position, duration } = useTrackPlayerProgress();
    console.log("🚀 ~ file: index.js ~ line 14 ~ PlayerControl ~ position, duration ", position, duration)
    const [progress, setProgress] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const videoRef = useRef();

    useEffect(() => {
        setupTrack()
    }, [])

    useEffect(() => {
        resetPlayer();
    }, [position])

    const resetPlayer = async () => {
        if (duration - 1 <= position) {
            await TrackPlayer.seekTo(0)
            setTimeout(() => {
                trackStop();
            }, 800);
        }
    }

    const setupTrack = async () => {
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: 'trackId',
            url: { uri: stream },
            // title: streamObj.trackName,
            // artist: streamObj.singerName,
            // artwork: streamObj.thumbnail
        });
        // await TrackPlayer.updateOptions({
        //     stopWithApp: true
        // });

    }

    const trackStart = async () => {
        await TrackPlayer.play();
        console.log('PLAY')
        setIsPlaying(true)
    };

    const trackStop = () => {
        TrackPlayer.pause();
        setIsPlaying(false)
    }

    const seekTo = async (sec) => {
        await TrackPlayer.seekTo(sec)
    }

    const setVolume = async (level) => {
        await TrackPlayer.setVolume(level)
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

    // const seekTo = (condition) => {
    //     if (condition == 'back') {
    //         let seeked = progress.currentTime - 15;
    //         if (seeked > 0) {
    //             videoRef.current.seek(seeked)
    //             setIsPlaying(true)
    //         }
    //     } else if (condition == 'forward') {
    //         let seeked = progress.currentTime + 15;
    //         if (seeked < progress.seekableDuration) {
    //             videoRef.current.seek(seeked)
    //             setIsPlaying(true)
    //         }
    //     }
    // }
    return <View>
        <View style={styles.sliView}>
            {/* <Video paused={!isPlaying}
                onProgress={({ currentTime, seekableDuration }) => setProgress({ currentTime, seekableDuration })}
                audioOnly
                ref={videoRef}
                source={{ uri: stream }} /> */}
            <Slider value={position}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#707070"
                maximumTrackTintColor="#707070"
                onSlidingComplete={(value) => {
                    seekTo(value)
                    setIsPlaying(true)
                }} />
        </View>
        <View style={styles.conView}>
            <Text style={styles.durationTxt}>{position && secondsToTime(position)}</Text>
            <Text style={styles.durationTxt}>{duration && secondsToTime(duration)}</Text>
        </View>
        <View style={styles.controlView}>
            <View />
            <TouchableOpacity onPress={() => { seekTo(position - 15) }}
                style={styles.icoTho}>
                <SvgXml xml={SeekLeft} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { !isPlaying ? trackStart() : trackStop() }} style={styles.middleIco}>
                {isPlaying ? <SvgXml xml={Pause} /> : <SvgXml xml={play_black} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { seekTo(position + 15) }}
                style={styles.icoTho}>
                <SvgXml xml={SeekRight} />
            </TouchableOpacity>
            <View />
        </View>
    </View>
}
const styles = StyleSheet.create({
    sliView: { marginHorizontal: 8, marginTop: 10, marginBottom: 3, },
    conView: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    durationTxt: { color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },
    controlView: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' },
    icoTho: { width: 55, height: 55, justifyContent: 'center', alignItems: 'center' },
    middleIco: { backgroundColor: '#50E3C2', borderRadius: 50, width: 65, height: 65, justifyContent: 'center', alignItems: 'center' },
})
export default PlayerControl;