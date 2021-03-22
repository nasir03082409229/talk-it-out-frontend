import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { LocationIcon, ShareIcon, ArrowLeft, SettingIconHori, ActiveHeart, InActiveHeart, SendIcon, UploadIcon, SearchIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import Image from 'react-native-fast-image'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'


const PostDetails = ({ navigation, route }) => {
    const { post, isFromTimeline, post_id } = route.params;
    console.log("🚀 ~ file: index.js ~ line 12 ~ PostDetails ~ post", post)
    const [postDetail, setPostDetail] = useState(null)
    const [commentList, setCommentList] = useState(null)

    const [commentText, setCommentText] = useState('')
    useEffect(() => {
        initState()
        return () => {
            setPostDetail(null)
            setCommentList(null)
        }
    }, [post])

    const initState = () => {
        if (isFromTimeline) {
            setPostDetail(post)
        } else {
            // post_id will do it later
        }
        getComments()
    }

    const getComments = async () => {
        let post_id = post ? post.id : post_id;
        console.log("🚀 ~ file: index.js ~ line 34 ~ getComments ~ post_id", post_id)
        const access_token = await AsyncStorage.getItem('@access_token')
        const { data } = await Axios({
            url: `https://talkitoutqueen.com/dashboard/api/get-comments/${post_id}`,
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
        console.log('datadata', data)
        setCommentList(data)
    }

    const onPressSendComment = async () => {
        const access_token = await AsyncStorage.getItem('@access_token')
        let user = await AsyncStorage.getItem('@user')
        user = JSON.parse(user);
        console.log({ "user_id": user.id, "post_id": post.id, "comment": commentText, access_token }, '{ "user_id": user.id, "post_id": post.id, "comment": commentText }');
        try {
            const { data } = await Axios({
                url: `https://talkitoutqueen.com/dashboard/api/post-comments`,
                method: 'post',
                data: { "user_id": user.id, "post_id": Number(post.id), "comment": commentText },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log("🚀 ~ file: index.js ~ data ", data)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line ", error)
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#FFF' />
            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }} style={{ backgroundColor: '#FDA', flex: 1, }}> */}
            <View style={styles.mainView}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ padding: 5 }}>
                        <SvgXml xml={ArrowLeft} />
                    </TouchableOpacity>
                    <Text style={styles.Createtxt}>Ms-Lioness Queen Post</Text>
                    <TouchableOpacity >
                        <SvgXml xml={SettingIconHori} />
                    </TouchableOpacity>
                </View>
                {postDetail ? <ScrollView>
                    <View style={styles.maintimelineview}>
                        <View style={styles.lowerview}>
                            <View style={styles.imgdetailview}>
                                <Image style={styles.mainimg} source={require('../../Assets/images/avatar.png')} />
                                <View>
                                    <Text style={styles.titleTxt}>Talk it Out Live </Text>
                                    <Text style={styles.timeTxt}>{moment(postDetail.created_at).fromNow()}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity>
                                    <Image style={styles.smallmainimg} source={require('../../Assets/images/avatar.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image style={styles.smallmainimg} source={require('../../Assets/images/avatar.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image style={styles.smallmainimg} source={require('../../Assets/images/avatar.png')} />
                                </TouchableOpacity>

                            </View>
                        </View>

                        <Text style={styles.heading}>{postDetail.title}</Text>
                        <Text style={styles.detailtxt}>{postDetail.description}</Text>
                        <View style={styles.titletimeview}>
                            <Image style={styles.img} source={{ uri: postDetail.image }} />
                        </View>
                        <View style={styles.locationView}>
                            <TouchableOpacity style={{ marginRight: 10, }}>
                                <SvgXml xml={LocationIcon} />
                            </TouchableOpacity>
                            <Text style={styles.timeTxt}>10 mins ago</Text>
                        </View>
                        <View style={styles.heartShareView}>
                            <TouchableOpacity style={styles.heartIcon}>
                                <SvgXml xml={InActiveHeart} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareIcon}>
                                <SvgXml xml={ShareIcon} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                            <Text style={styles.timeTxt}>21 Comments</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('CommentsList', { post: postDetail, commentList, })}>
                                <Text style={styles.viewalltxt}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        //  keyExtractor={index => index}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120, margin: 20, marginTop: 0, }}
                        style={{ flex: 1 }}
                        data={commentList ? commentList.data : []}
                        renderItem={({ index, item }) => {
                            return (
                                <View key={`${index}${item.id}-postdetail`} style={styles.maintimelineview}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image style={styles.mainimg} source={require('../../Assets/images/avatar.png')} />
                                        <View style={{ flex: 1, }}>
                                            <View style={styles.headingView}>
                                                <Text style={styles.titleTxt}>Anthony Newman</Text>
                                                <Text style={styles.timeTxt}>{moment(item.created_at).fromNow()}</Text>
                                            </View>
                                            <Text style={styles.commentTxt}>{item.comment}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }} />

                </ScrollView> : <ActivityIndicator color={'#fff'} size={20} style={{ alignSelf: 'center' }} />}
            </View>
            <View style={styles.mainSearView}>
                <TextInput
                    value={commentText}
                    onChangeText={(text) => setCommentText(text)}
                    style={styles.commentinput}
                    placeholder='Write Comment...' />
                <TouchableOpacity >
                    <Image style={styles.emoji} source={require('../../Assets/images/emojiImg.png')} />

                </TouchableOpacity>
                <TouchableOpacity onPress={onPressSendComment} style={styles.sendIcon} >
                    <SvgXml xml={SendIcon} />
                </TouchableOpacity>
            </View>

            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: { flex: 1, backgroundColor: '#FFF', },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, },
    Createtxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 18, },
    headingView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    // maintimelineview: {  marginVertical: 5, },
    titleTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 15, },
    timeTxt: { color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 12, },
    commentTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 12, },
    // mainimg: { resizeMode: 'contain', width: 30, height: 30, marginRight: 10, marginTop: -5, },

    mainSearView: {
        zIndex: +10000, backgroundColor: '#FFF',
        flexDirection: 'row', alignItems: 'center', height: 60, elevation: 10,
        /// position: 'absolute', bottom: 58, left: 0, right: 0,
    },
    commentinput: { paddingLeft: 10, flex: 1, },
    emoji: { width: 25, height: 25, },
    sendIcon: { marginRight: 10, marginLeft: 10, width: 40, alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 30, backgroundColor: '#FF6265' },
    img: { marginVertical: 10, borderRadius: 2, width: '100%', height: 170, resizeMode: 'contain', },

    locationView: { marginHorizontal: 20, flexDirection: 'row' },

    heartShareView: { marginVertical: 10, borderTopWidth: 1, borderTopColor: '#CCCCCC30', borderBottomWidth: 1, borderBottomColor: '#CCCCCC30', flex: 1, flexDirection: 'row', },
    heartIcon: { padding: 10, borderRightWidth: 1, borderRightColor: '#CCCCCC30', flex: 1, justifyContent: 'center', alignItems: 'center', },
    shareIcon: { padding: 10, flex: 1, justifyContent: 'center', alignItems: 'center', },

    maintimelineview: { marginVertical: 5, },
    titletimeview: { marginHorizontal: 20, },
    lowerview: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    imgdetailview: { flexDirection: 'row', alignItems: 'center' },
    mainimg: { marginRight: 10, width: 40, height: 40, borderRadius: 30, resizeMode: 'contain' },
    smallmainimg: { marginLeft: 5, width: 25, height: 25, borderRadius: 30, resizeMode: 'contain' },

    heading: { marginHorizontal: 20, textAlign: 'center', color: '#4A4A4A90', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 25, },
    detailtxt: { marginHorizontal: 20, color: '#4A4A4A90', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },
    viewalltxt: { color: '#FF6265', textDecorationLine: 'underline', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },


})

export default PostDetails;