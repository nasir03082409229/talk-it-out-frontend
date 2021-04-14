import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, StatusBar, SafeAreaView, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Image from 'react-native-fast-image'
import { logoutAction } from "../../store/AuthAction";

const Explore = ({ navigation }) => {
    const [homeData, setHomeData] = useState(null)
    console.log("🚀 ~ file: index.js ~ line 15 ~ Explore ~ homeData", homeData)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        const access_token = await AsyncStorage.getItem('@access_token')
        console.log("🚀 ~ file: index.js ~ line 23 ~ init ~ access_token", access_token)
        try {
            const response = await Axios({
                url: 'https://talkitoutqueen.com/dashboard/api/home',
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            let normalizePages = response.data.pages.map(x => ({ ...x, type: 'page' })).filter(x => ['2', '3', '4'].indexOf(x.id) === -1)
            let normalizePodcasts = response.data.podcasts.map(x => ({ ...x, type: 'podcast' }))
            let normalizeRadios = response.data.radios.map(x => ({ ...x, type: 'radio' }))
            setHomeData([...normalizeRadios, ...normalizePodcasts, ...normalizePages,])
        } catch (error) {
            if (error.response.status == 401) {
                logoutAction(navigation)
            }
        }

    }


    const navigate = (item) => {
        console.log("🚀 ~ file: index.js ~ line 87 ~ navigate ~ item", item)
        if (item.type == 'radio') {
            navigation.navigate('RadioPlayer', { item: item })
        } else if (item.type == 'podcast') {
            navigation.navigate('Playing', { item: item })
        } else if (item.type == 'page') {
            navigation.navigate('Pray', { item: item })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backTouch}>
                    <View style={styles.backTouView}>
                        <Image style={styles.img} source={require('../../Assets/images/login_logo.png')} />
                    </View>
                    <Text style={styles.backtxt}>BACK</Text>
                </TouchableOpacity>
                <Image style={styles.design} source={require('../../Assets/images/transparentDesign.png')} />
                <View style={styles.headview}>
                    <Text style={styles.downTxt}>EXPLORE</Text>
                    <Text style={styles.subHead}>all your favourite {'\n'} features under one roof!</Text>
                </View>

                <TouchableOpacity style={styles.searchView}>
                    <TextInput
                        // onTouchStart={() => { navigation.navigate('SubscriptionPremium') }}
                        placeholder={'Search'} placeholderTextColor={'#707070'} style={styles.input} />

                    <TouchableOpacity style={styles.icoView}>
                        <SvgXml xml={Mic} />
                    </TouchableOpacity>

                </TouchableOpacity>

                {homeData ? <FlatList showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listCont}
                    data={homeData}
                    numColumns={3}
                    renderItem={({ index, item }) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => { navigate(item) }} style={[styles.itemTou,]}>
                                <Image style={styles.itemImg} source={{ uri: item.small_photo }} />
                                <Text style={styles.name}>{item.title}</Text>
                                {/* <Text style={styles.viewsTxt}>{item.views}</Text> */}
                            </TouchableOpacity>
                        )
                    }} /> : <ActivityIndicator color={'#fff'} size={20} style={{ alignSelf: 'center' }} />}

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    backTouch: { position: 'absolute', top: 20, left: 10, width: 130, flexDirection: 'row', alignItems: 'center', },
    backTouView: { width: 50, height: 50, },
    img: { width: '100%', height: '100%', resizeMode: 'contain', },
    backtxt: { marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, },
    design: { width: 310, height: 310, opacity: 1, position: 'absolute', right: -115, top: -100, },
    headview: { marginTop: 130, marginLeft: 20, },
    downTxt: { color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 22, },
    subHead: { color: '#E6E6E650', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },
    searchView: { flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', borderColor: '#707070', borderWidth: 1, marginVertical: 20, borderRadius: 60, height: 50, },
    input: { flex: 1, paddingLeft: 25, fontSize: 14, color: '#FFF' },
    icoView: { justifyContent: 'center', alignItems: 'center', marginRight: 10, width: 40, height: 40, },
    listCont: {
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15,
        marginBottom: 40,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemTou: { borderRadius: 10, marginHorizontal: 4, marginVertical: 10, },
    itemImg: { width: 100, height: 140, resizeMode: 'contain' },
    name: { marginTop: 5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    viewsTxt: { color: '#E8E8E850', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },



})


export default Explore;