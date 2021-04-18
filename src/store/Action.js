import TrackPlayer from 'react-native-track-player';

this.playerRef = null
this.streamRef = '';

const startAudio = async (stream) => {
    if (this.streamRef !== stream.radio_stream) {
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: stream.id,
            url: stream.radio_stream,
            title: stream.title,
            artwork: stream.small_photo
        });
        await TrackPlayer.play();
        TrackPlayer.updateOptions({ stopWithApp: true })
        this.streamRef = stream.radio_stream
    }

}

const updateOption = async (id, cover, title) => {
    await TrackPlayer.updateMetadataForTrack(id, {
        artwork: cover,
        title: title,
        // artist: 'Artis'
    })
}
const stopAudio = async () => {
    await TrackPlayer.stop()
    await TrackPlayer.reset()
    this.streamRef = ''
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
    startAudio, stopAudio, updateOption,
    startPodcastPlayer, seekToPodcastPlayer, pausePodcastPlayer, playPodcastPlayer
};

