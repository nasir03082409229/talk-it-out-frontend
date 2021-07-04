import TrackPlayer from 'react-native-track-player';

module.exports = async function() {
    alert('TRACKEREE')
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    // ...

};