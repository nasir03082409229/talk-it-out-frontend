import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, View, StatusBar, Linking, SafeAreaView, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { SettingIcon, Pause, SeekLeft, SeekRight, Loop, LeftCorner, UpArrow, Cross, plus_icon } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import Image from 'react-native-fast-image'

const CardsPremium = ({ navigation }) => {
    const [error, setError] = useState('')
    const [premiumData, setPremiumData] = useState([])

    useEffect(() => {
        initState()
    }, [])

    const initState = async () => {
        //"Please subscribe to premium plan to access it "
        //
        let access_token = await AsyncStorage.getItem('@access_token');
        let user = await AsyncStorage.getItem('@user');
        user = JSON.parse(user)
        const { data } = await Axios({
            url: `https://talkitoutqueen.com/dashboard/api/user/${user.id}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
        let userDetails = data.data
        await AsyncStorage.setItem('@user', JSON.stringify(userDetails))
        if (userDetails.subscription_plan == 'premium' && userDetails.subscription_active == 1) {
            const { data } = await Axios({
                url: 'https://talkitoutqueen.com/dashboard/api/premium',
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            let normalizePodcasts = data.podcasts.map(x => ({ ...x, type: 'podcast' }))
            let normalizeRadios = data.radios.map(x => ({ ...x, type: 'radio' }))
            setPremiumData([...normalizeRadios, ...normalizePodcasts])
        } else {
            setError('Please subscribe to premium plan to access it')
        }
    }



    let _carousel;
    const navigate = (item) => {
        if (item.type == 'radio') {
            navigation.navigate('RadioPlayer', { item: item })
        } else if (item.type == 'podcast') {
            navigation.navigate('Playing', { item: item })
        }
    }
    const _renderItem = ({ item, index }) => {
        return (
            <View style={[styles.card, { width: '100%', borderRadius: 20 }]}>
                <Image resizeMode={'stretch'} style={styles.img}
                    source={{ uri: item.small_photo }}  >
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            navigate(item)
                        }} style={{ position: 'absolute', bottom: 26, right: 5 }}>
                        <SvgXml xml={plus_icon} />
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
    console.log('ERROR', error)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>

                <View style={styles.main}>
                    <Text style={styles.headTxt}>TALK IT OUT</Text>
                    <Text style={styles.preTxt}>PREMIUM</Text>
                </View>

                {premiumData.length > 0 && <Carousel
                    // layout={'default'}
                    ref={(c) => { _carousel = c; }}
                    data={premiumData}
                    hasParallaxImages
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width * .75}
                    itemHeight={Dimensions.get('screen').height - 100}
                    height={500}
                // layoutCardOffset={100}
                />}
                {error ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 20, paddingHorizontal: 20, textAlign: 'center' }}>{error}</Text>
                    <TouchableOpacity
                        onPress={() => { Linking.openURL('https://talkitoutqueen.com/') }}
                        style={{ borderWidth: 1, borderColor: 'white', borderRadius: 10, marginVertical: 20 }}>
                        <Text style={{ color: '#fff', paddingHorizontal: 10, paddingVertical: 10, }}>{'Go to talkitoutqueen.com'}</Text>
                    </TouchableOpacity>
                </View> : <ActivityIndicator color={'#fff'} size={20} style={{ alignSelf: 'center' }} />}
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
    img: { width: '100%', height: '92%', resizeMode: 'stretch', borderRadius: 15, },
    cardView: {},

})

export default CardsPremium;