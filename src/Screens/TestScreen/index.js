import React from 'react';
import { View, Text } from 'react-native'
import Video from 'react-native-video'


const TestScreen = () => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Video
            source={{ uri: 'https://aud1.sjamz.com/9111/stream' }}
            // audioOnly={true}
            playInBackground={true}
        />
        <Text>
            GO TO HOME
        </Text>
    </View>)
}

export default TestScreen