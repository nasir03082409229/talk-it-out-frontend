import TrackPlayer from 'react-native-track-player';
import { AppState } from 'react-native'

let streamRef = '';

const startAudio = async (stream) => {
    let playerState = await TrackPlayer.getState();
    // if 1 means stop
    // if 3 means playing 
    // i f 0 means not playing any
    if (playerState == 0) {
        streamRef = ''
    }

    if (streamRef !== stream.radio_stream) {
        await TrackPlayer.setupPlayer({
            iosCategoryMode: 'default',
            iosCategoryOptions: [],
            waitForBuffer: true
        });
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: 'trackId',
            url: { uri: stream.radio_stream },
            title: stream.title,
            artwork: stream.small_photo,
            artist: ``,
        });
        await TrackPlayer.play();
        TrackPlayer.updateOptions({ stopWithApp: true, })
        streamRef = stream.radio_stream
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
    streamRef = ''
}


// Podcast Actions 

const startPodcastPlayer = async (stream) => {
    //console.log('streamRef', streamRef)

    if (streamRef !== stream.podstream) {
        console.log("🚀 ~ stream.podstream", stream)
        await TrackPlayer.setupPlayer({
            iosCategoryMode: 'default',
            iosCategoryOptions: [],
            waitForBuffer: true
        });
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: 'trackId',
            url: { uri: stream.podstream },
            title: stream.podtitle,
            artist: `${new Date()}`,

            // artist: streamObj.singerName,
            // artwork: stream.podsubtitle
        });
        TrackPlayer.updateOptions({ stopWithApp: true, })

        await TrackPlayer.play();
        streamRef = stream.podstream
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

