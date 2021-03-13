import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';

this.playerRef = null
this.streamRef = '';
const startAudio = (stream) => {
    console.log(this.playerRef)
    if (this.streamRef !== stream) {
        if (this.playerRef) {
            this.playerRef.destroy()
        }
        this.streamRef = stream;
        this.playerRef = new Player(stream, {
            continuesToPlayInBackground: true,
        }).on('')
        this.playerRef.play()
    }
}
const getProgress = () => {
    return this.playerRef;
}
const stopAudio = () => {
    if (this.playerRef) {
        this.playerRef.stop()
    }
    this.playerRef = null
    this.streamRef = ''
}
const pauseAudio = () => {
    if (this.playerRef) {
        this.playerRef.pause()
    }
}
const playAudio = () => {
    if (this.playerRef) {
        this.playerRef.play()
    }
}

const seekTo = (seconds) => {
    if (this.playerRef) {
        this.playerRef.seek(seconds)
    }
}

// Podcast Actions 

const startPodcastPlayer = async (stream) => {

    await TrackPlayer.reset()
    await TrackPlayer.add({
        id: 'trackId',
        url: { uri: stream.podstream },
        title: stream.podtitle,
        // artist: streamObj.singerName,
        artwork: stream.podsubtitle
    });
    await TrackPlayer.play();
}


const seekToPodcastPlayer = async (sec) => {
    await TrackPlayer.seekTo(sec)
    await TrackPlayer.play();
}
const pausePodcastPlayer = async () => {
    await TrackPlayer.pause();
}
const playPodcastPlayer = async () => {
    await TrackPlayer.play();
}

export {
    startAudio, stopAudio, playAudio, pauseAudio, seekTo, getProgress
    , startPodcastPlayer, seekToPodcastPlayer, pausePodcastPlayer, playPodcastPlayer
}