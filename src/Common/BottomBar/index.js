import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Bottom1Icon, Bottom2Icon, Bottom3IconSetting, Bottom3Icon, Bottom4Icon, Bottom1IconActive, Bottom2IconActive, Bottom3IconActive, Bottom4IconActive } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";


const BottomBar = ({ state, navigation }) => {
    // console.log(state.state.index);

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.iconview} onPress={() => { navigation.navigate('Explore') }} style={styles.iconview}>
                {
                    state.state.index === 0 ?
                        <SvgXml xml={Bottom1IconActive} />
                        :
                        <SvgXml xml={Bottom1Icon} />
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconview} onPress={() => {
                navigation.navigate('CardsPremium')
            }} style={styles.iconview}>
                {
                    state.state.index === 1 ?
                        <SvgXml xml={Bottom2IconActive} />
                        :
                        <SvgXml xml={Bottom2Icon} />
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconview} onPress={() => {
                navigation.openDrawer();
            }} style={styles.iconview}>
                {
                    state.state.index === 2 ?
                        <SvgXml xml={Bottom3IconSetting} />
                        :
                        <SvgXml xml={Bottom3IconSetting} />
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconview} onPress={() => {
                navigation.navigate('Profile')
            }} style={styles.iconview}>
                {
                    state.state.index === 3 ?
                        <SvgXml xml={Bottom4IconActive} />
                        :
                        <SvgXml xml={Bottom4Icon} />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 20, paddingTop: 3, backgroundColor: '#2C2838', elevation: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
        // position: 'absolute', bottom: 0, left: 0, right: 0,
    },
    iconview: { width: 55, height: 55, justifyContent: 'center', alignItems: 'center' },
    icon: { resizeMode: 'contain', width: '100%', height: '100%' },
})


export default BottomBar;