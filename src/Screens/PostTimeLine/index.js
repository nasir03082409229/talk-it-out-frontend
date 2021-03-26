import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { InActiveHeart, PlusIcon, ActiveHeart, MessageIcon, SearchIcon, } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import Axios from 'axios'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
const PostTimeLine = ({ navigation }) => {
    const [postData, setPostData] = useState(null);

    console.log("🚀 ~ file: index.js ~ line 14 ~ PostTimeLine ~ postData", postData)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            initState()
            // do something
        });

        return unsubscribe;
    }, [navigation])

    const initState = async () => {

        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            console.log("~ access_token", access_token)
            const { data } = await Axios({
                url: 'https://talkitoutqueen.com/dashboard/api/posts', method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log("🚀 ~ file: index.js ~ line 25 ~ initState ~ data", data)
            setPostData([...data.data])
        } catch (err) {
            console.log("errerrerrerr", err)
        }

    }

    const onPressHeart = async (item, index) => {
        const access_token = await AsyncStorage.getItem('@access_token')
        let user = await AsyncStorage.getItem('@user');
        user = JSON.parse(user)
        const { data } = await Axios({
            url: 'https://talkitoutqueen.com/dashboard/api/post-likes', method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            data: { "user_id": user.id, "post_id": item.id }
        })
        postData[index].is_liked = postData[index].is_liked == 'true' ? 'false' : 'true'
        setPostData([...postData])
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#FFF' />
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={styles.header}>
                    <TouchableOpacity style={{}}>
                    </TouchableOpacity>
                    <Text style={styles.Createtxt}>Talk it out Wall</Text>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ padding: 5 }}>
                        <SvgXml xml={SearchIcon} />
                    </TouchableOpacity>
                </View>
                {postData ? <FlatList
                    // keyExtractor={index => index}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 130 }}
                    style={{ flex: 1 }}
                    data={postData}
                    renderItem={({ index, item }) => {
                        console.log("🚀 ~ file: index.js ~ line 56 ~ PostTimeLine ~ item", item)
                        return (
                            <TouchableOpacity
                                key={`${index.toString() + 'post'}`}
                                onPress={() => navigation.navigate('PostDetails', { post: item, isFromTimeline: true })}
                                style={styles.maintimelineview}>
                                <View style={styles.titletimeview}>
                                    <Text style={styles.titleTxt}>{item.title}</Text>
                                    <Text style={styles.timeTxt}>{moment(item.created_at).fromNow()}</Text>
                                    <Image style={styles.img}
                                        source={{ uri: item.image }} />

                                </View>
                                <View style={styles.lowerview}>
                                    <View style={styles.imgdetailview}>
                                        <Image style={styles.mainimg} source={{ uri: item.creator_photo }} />
                                        <View>
                                            <Text style={styles.titleTxt}>{item.created_by}</Text>
                                            <Text style={styles.timeTxt}>{moment(item.created_at).fromNow()}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('PostDetails')}>
                                            <SvgXml xml={MessageIcon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => onPressHeart(item, index)}>
                                            <SvgXml style={{ marginLeft: 10, }} xml={item.is_liked !== 'false' ? ActiveHeart : InActiveHeart} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} /> : <ActivityIndicator color={'#fff'} size={20} style={{ alignSelf: 'center' }} />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    maintimelineview: { marginVertical: 10, marginHorizontal: 20, },
    // titletimeview:{  },
    lowerview: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    imgdetailview: { flexDirection: 'row', alignItems: 'center' },
    mainimg: { marginRight: 10, width: 50, height: 50, borderRadius: 30, resizeMode: 'contain' },


    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, },
    Createtxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 18, },
    titleTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },
    timeTxt: { color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 10, },
    img: { marginVertical: 10, borderRadius: 2, width: '100%', height: 170, resizeMode: 'contain', },
    emojiimg: { width: 25, height: 25, resizeMode: 'contain', },
    uploadView: { backgroundColor: '#A4B7B560', justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 300, margin: 10, },
    topicView: { paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: '#97979730', borderBottomWidth: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    saveBtn: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, borderColor: '#FF6265', justifyContent: 'center', alignItems: 'center', width: 140, height: 40 },
    SaveIconTxt: { marginLeft: 10, color: '#FF6265', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 16, },
    btnView: { margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },




})

export default PostTimeLine;