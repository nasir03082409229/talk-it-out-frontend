import { Player } from '@react-native-community/audio-toolkit';
import TrackPlayer from 'react-native-track-player';

this.playerRef = null
this.streamRef = '';
const startAudio = (stream) => {
    console.log(this.playerRef)
    TrackPlayer.pause();
    if (this.streamRef !== stream) {
        if (this.playerRef) {
            this.playerRef.destroy()
        }
        this.streamRef = stream;
        try {
            this.playerRef = new Player(stream, {
                continuesToPlayInBackground: true,
                autoDestroy: false,
                wakeLock : true,
                // continuesToPlayInBackground: false,
                // category: "Ambient",
                mixWithOthers: true,
            })
        } catch (error) {
            alert(JSON.stringify(error))
            if (this.playerRef) {
                this.playerRef.destroy()
                this.playerRef = new Player(stream, {
                    continuesToPlayInBackground: true,
                    autoDestroy: false,
                wakeLock : true,

                    // continuesToPlayInBackground: false,
                    // category: "Ambient",
                    mixWithOthers: true,
                })
            }

        }
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
    //console.log('this.streamRef', this.streamRef)
    if (this.playerRef) {
        this.playerRef.destroy()
        this.streamRef = ''
    }
    if (this.streamRef !== stream.podstream) {
        console.log("🚀 ~ stream.podstream", stream)
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: 'trackId',
            url: { uri: stream.podstream },
            title: stream.podtitle,
            artist: `${new Date()}`,

            // artist: streamObj.singerName,
            // artwork: stream.podsubtitle
        });
        await TrackPlayer.play();
        this.streamRef = stream.podstream
    }

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
    startAudio, stopAudio, playAudio, pauseAudio, seekTo, getProgress,
    startPodcastPlayer, seekToPodcastPlayer, pausePodcastPlayer, playPodcastPlayer
};
