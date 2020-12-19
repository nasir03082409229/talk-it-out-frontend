import React from "react";
import { View, Image, StatusBar } from "react-native";
import { Text } from "../../Common";
import { logo } from "../../Assets/images";
import { Typography, Colors } from "../../Styles";

const Splash = () => {
    return (
        <View style={{
            backgroundColor: '#2C2939',
            flex: 1, justifyContent: 'space-around', alignItems: 'center'
        }}>
            <StatusBar backgroundColor='#2C2939'/>
            <Image
                style={{
                    flex: 1, width: '100%', height: '100%'
                    , position: 'absolute'
                }}
                source={require('../../Assets/images/queen.png')}
            />
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                <Image resizeMode={'contain'} style={{ height: 175, }} source={require('../../Assets/images/logo.png')} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: Typography.FONT_SIZE_30 }}>TALK IT OUT</Text>
                <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: Typography.FONT_SIZE_14 }}>ONE DREAM, ONE TEAM</Text>
            </View>
        </View>
    )
}

export default Splash;