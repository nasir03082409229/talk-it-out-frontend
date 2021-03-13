import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';

this.playerRef = null
this.streamRef = '';
const startAudio = (stream) => {
    console.log("🚀 ~ file: Action.js ~ line 6 ~ playRadio ~ playerRef", this.playerRef)
    console.log("o ~ playerRef", this.streamRef, stream, this.streamRef !== stream)
    if (this.streamRef !== stream) {
        if (this.playerRef) {
            this.playerRef.destroy()
        }
        this.streamRef = stream;
        this.playerRef = new Player(stream, {
            continuesToPlayInBackground: true,
        })
        this.playerRef.play()
    }
}
const stopAudio = () => {
    console.log("stopAudio")
    if (this.playerRef) {
        this.playerRef.stop()
    }
    this.playerRef = null
    this.streamRef = ''
}
const pauseAudio = () => {
    if (this.playerRef) {
        this.playerRef.stop()
    }
}
const playAudio = () => {
    if (this.playerRef) {
        this.playerRef.stop()
    }
}

export {
    startAudio, stopAudio, playAudio, pauseAudio
}