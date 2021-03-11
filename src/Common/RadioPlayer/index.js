import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Colors, Typography } from "../../Styles";
import { Text, Touchable } from "..";
import Slider from '@react-native-community/slider';
import { SvgXml } from "react-native-svg";
import { SettingIcon, Pause, SeekLeft, SeekRight, Loop, LeftCorner, UpArrow, Cross, play_black } from "../../Assets/Icons";
import Video from 'react-native-video'
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';


class RadioPlayer extends React.Component {
    state = {
        isPlaying: true
    }

    componentWillMount() {
        this.initState()
    }

    initState = () => {
        const { stream } = this.props
        this.player = null;
        this.player = new Player(stream, {
            continuesToPlayInBackground: true
        }).play();
    }
    playPauseToogle = (condition) => {
        console.log("🚀 ~ file: index.js ~ line 27 ~ playPauseToogle ~ condition", condition)
        if (condition) {
            this.setState({ isPlaying: false })
            this.player.stop()
        } else {
            this.setState({ isPlaying: true })
            this.initState()
        }
    }

    render() {
        const { isPlaying } = this.state
        return (
            <View>
                <View style={styles.sliView}>
                    {/* {isPlaying && <Video
                    disableFocus={true}
                    playWhenInactive={true}
                    playInBackground={true}
                    audioOnly
                    // style={{ height: 100, width: 100, borderWidth: 2 }}
                    source={{ uri: stream }} />} */}
                    <Slider
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#707070"
                        maximumTrackTintColor="#707070"
                    />
                </View>
                <View style={styles.conView}>
                    <Text style={styles.durationTxt}>1:02:50</Text>
                    <Text style={styles.durationTxt}>1:02:50</Text>
                </View>
                <View style={styles.controlView}>
                    <View />
                    <TouchableOpacity style={styles.icoTho}>
                        <SvgXml xml={SeekLeft} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.playPauseToogle(this.player && this.player.isPlaying)
                        }}
                        style={styles.middleIco}>
                        {this.state.isPlaying ? <SvgXml xml={Pause} /> : <SvgXml xml={play_black} />}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icoTho}>
                        <SvgXml xml={SeekRight} />
                    </TouchableOpacity>
                    <View />
                </View>
            </View>
        )
    }
}

// const RadioPlayer = ({ stream, isFromPodcast }) => {
//     const [isPlaying, setIsPlaying] = useState(true);
//     const [player, setPlayer] = useState(null)

//     useEffect(() => {
//         initState()
//     }, [])
//     const initState = () => {
//         const playerRef = new Player(stream, {
//             continuesToPlayInBackground: true
//         }).play();
//         setPlayer(playerRef)
//     }

//     const playPauseToogle = (condition) => {
//         console.log("🚀 ~ file: index.js ~ line 27 ~ playPauseToogle ~ condition", condition)
//         if (condition) {
//             player.play()
//         } else {
//             // player.pause()
//             new Player(stream, {
//                 continuesToPlayInBackground: true
//             }).pause();
//         }
//     }

//     // const videoRef = useRef()
// return <View>
//     <View style={styles.sliView}>
//         {/* {isPlaying && <Video
//             disableFocus={true}
//             playWhenInactive={true}
//             playInBackground={true}
//             audioOnly
//             // style={{ height: 100, width: 100, borderWidth: 2 }}
//             source={{ uri: stream }} />} */}
//         <Slider
//             minimumValue={0}
//             maximumValue={1}
//             minimumTrackTintColor="#707070"
//             maximumTrackTintColor="#707070"
//         />
//     </View>
//     <View style={styles.conView}>
//         <Text style={styles.durationTxt}>1:02:50</Text>
//         <Text style={styles.durationTxt}>1:02:50</Text>
//     </View>
//     <View style={styles.controlView}>
//         <View />
//         <TouchableOpacity style={styles.icoTho}>
//             <SvgXml xml={SeekLeft} />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => { setIsPlaying(!isPlaying); playPauseToogle(player && player.isPlaying) }} style={styles.middleIco}>
//             {isPlaying ? <SvgXml xml={Pause} /> : <SvgXml xml={play_black} />}
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.icoTho}>
//             <SvgXml xml={SeekRight} />
//         </TouchableOpacity>
//         <View />
//     </View>
// </View>
// }

const styles = StyleSheet.create({
    sliView: { marginHorizontal: 8, marginTop: 10, marginBottom: 3, },
    conView: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    durationTxt: { color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },
    controlView: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' },
    icoTho: { width: 55, height: 55, justifyContent: 'center', alignItems: 'center' },
    middleIco: { backgroundColor: '#50E3C2', borderRadius: 50, width: 65, height: 65, justifyContent: 'center', alignItems: 'center' },


})


export default RadioPlayer;