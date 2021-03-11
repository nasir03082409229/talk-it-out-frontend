import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';



const App = () => {
    useEffect(() => {
        new Player('https://aud1.sjamz.com/9111/stream',{
            continuesToPlayInBackground: true
        }).play();

    }, [])
    return <View>
        <Text>DEMo</Text>
    </View>
}

export default App;