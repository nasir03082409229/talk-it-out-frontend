import React from "react";
import { StyleSheet, ImageBackground, View, Image, StatusBar, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { SettingIcon, Pause, SeekLeft, SeekRight, Loop, LeftCorner, UpArrow, Cross, plus_icon } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import Carousel from 'react-native-snap-carousel';


const CardsPremium = ({ navigation }) => {

    let cards = [
        {
            route: 'Playing',
            image: require('../../Assets/images/card1.png'),
            imageSource: require('../../Assets/images/house_cover.png'),
            playerImage: require('../../Assets/images/house_player.png'),
        },
        {
            route: 'Playing',
            image: require('../../Assets/images/card2.png'),
            imageSource: require('../../Assets/images/school_cover.png'),
            playerImage: require('../../Assets/images/school_player.png'),
        },
        {
            route: 'Playing',
            image: require('../../Assets/images/card3.png'),
            imageSource: require('../../Assets/images/women_cover.png'),
            playerImage: require('../../Assets/images/women_player.png'),
        },
        {
            image: require('../../Assets/images/card4.png'),
            imageSource: require('../../Assets/images/card4_player.png'),
            route: 'Player'
        },
        {
            route: 'Playing',
            image: require('../../Assets/images/card5.png'),
            imageSource: require('../../Assets/images/card5_cover.png'),
            playerImage: require('../../Assets/images/card5_player.png'),
        },
    ]

    let _carousel;
    const _renderItem = ({ item, index }) => {
        return (
            <View style={[styles.card, { width: '100%', }]}>
                <ImageBackground resizeMode={'stretch'} style={styles.img} source={item.image} >
                    <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate(item.route, { imageSource: item.imageSource, playerImage: item.playerImage }) }} style={{ position: 'absolute', bottom: 26, right: 5 }}>
                        <SvgXml xml={plus_icon} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>

                <View style={styles.main}>
                    <Text style={styles.headTxt}>TALK IT OUT</Text>
                    <Text style={styles.preTxt}>PREMIUM</Text>
                </View>

                <Carousel
                    // layout={'default'}
                    ref={(c) => { _carousel = c; }}
                    data={cards}
                    hasParallaxImages
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width * .75}
                    itemHeight={Dimensions.get('screen').height - 100}
                    height={500}
                // layoutCardOffset={100}
                />
                {/* <View style={styles.cardView}> */}


                {/* <TouchableOpacity onPress={() => { navigation.navigate('PlayingPremium') }} activeOpacity={1} style={[styles.card, { width: Dimensions.get('screen').width - 0 }]}>
                        <Image style={styles.img} source={require('../../Assets/images/shade.png')} />
                    </TouchableOpacity> */}
                {/* <TouchableOpacity style={[styles.card, { marginTop: -160, width: Dimensions.get('screen').width - 20, marginLeft: 10, }]}>
                        <Image style={styles.img} source={require('../../Assets/images/pray.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.card, { marginTop: -160, }]}>
                        <Image style={styles.img} source={require('../../Assets/images/elder.png')} />
                    </TouchableOpacity> */}
                {/* </View> */}



            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headTxt: { color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 25, },
    preTxt: { color: '#1592E6', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 23, marginTop: -15, },
    main: { justifyContent: 'center', alignItems: 'center', marginTop: 45, marginBottom: 50, },
    card: {},
    img: { width: '100%', height: '92%', resizeMode: 'stretch', borderRadius: 0, },
    cardView: {},

})

export default CardsPremium;