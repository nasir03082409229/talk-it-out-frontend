import React, { useEffect } from 'react';
import { View, Text } from 'react-native'
import Video from 'react-native-video'
import TrackPlayer from 'react-native-track-player';


const TestScreen = () => {
    useEffect(() => {
        start();
    }, [])
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
            GO TO HOME
        </Text>
    </View>)
}

const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
        id: 'trackId',
        url: 'https://aud1.sjamz.com/9111/stream',
        title: 'Track Title',
        artist: 'Track Artist',
    });

    // Start playing it
    await TrackPlayer.play();
};


export default TestScreen