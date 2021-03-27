import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Image, StatusBar, SafeAreaView, Keyboard, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { CrossIcon, ArrowLeft, EmojiIcon, SaveIcon, SendIcon, UploadIcon, SearchIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { useLayoutEffect } from "react";
import moment from 'moment'
const CommentsList = ({ navigation, route }) => {
    const { post } = route.params;

    const [postDetail, setPostDetail] = useState(null)
    const [commentList, setCommentList] = useState(null)
    const [loader, setLoader] = useState(null)
    const [commentText, setCommentText] = useState('')


    useEffect(() => {
        initState()
    }, [post])

    const getComments = async () => {
        setLoader(true)
        const access_token = await AsyncStorage.getItem('@access_token')
        const { data } = await Axios({
            url: `${commentList.next_page_url}`,
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
        setLoader(false)
        let previousData = commentList.data;
        let newCommentData = { ...data }
        newCommentData.data = [...previousData, ...data.data]
        setCommentList(newCommentData)
    }

    const initState = () => {
        const { post, commentList } = route.params;
        setPostDetail(post)
        setCommentList(commentList)
    }
    const onPressSendComment = async () => {
        const access_token = await AsyncStorage.getItem('@access_token')
        let user = await AsyncStorage.getItem('@user')
        user = JSON.parse(user);
        console.log("🚀 ~ file: ind", user)
        console.log("🚀 ~ file: ind", commentList)
        try {
            const { data } = await Axios({
                url: `https://talkitoutqueen.com/dashboard/api/post-comments`,
                method: 'put',
                data: {
                    "user_id": user.id,
                    "post_id": post.id,
                    "comment": commentText
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            commentList.data.unshift({
                comment: commentText,
                user_id: user.id,
                post_id: post.id,
                user_name: user.name,
                user_photo: user.image
            })
            console.log("🚀 ~ file: index.js ~ line 71 ~ onPressSendComment ~ commentList", commentList)
            setCommentList({ ...commentList })
            setCommentText('')
            Keyboard.dismiss()

            console.log("🚀 ~ file: index.js ~ commentList ", commentList)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line ", error)
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, }}>

            <StatusBar barStyle={'dark-content'} backgroundColor='#FFF' />
            {postDetail && <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ padding: 5 }}>
                        <SvgXml xml={ArrowLeft} />
                    </TouchableOpacity>
                    <Text style={styles.Createtxt}>{postDetail.title}</Text>
                    <TouchableOpacity >
                        <SvgXml xml={CrossIcon} />
                    </TouchableOpacity>
                </View>
                {commentList && commentList.data.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 180, paddingVertical: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Text style={{ color: 'black', textAlign: 'center' }}>No comments found</Text>
                    </View>
                </View> : null}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, }}
                    data={commentList ? commentList.data : []}
                    ListFooterComponent={() => (<View style={{ height: 25, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                        {commentList.next_page_url ?
                            !loader ? <TouchableOpacity onPress={() => getComments()} style={{ width: 100, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <Text style={{ color: 'black', textAlign: 'center' }}>Load More</Text>
                            </TouchableOpacity> : <ActivityIndicator color={'#000'} size={20} style={{ alignSelf: 'center' }} /> : null}
                    </View>)}
                    renderItem={({ index, item }) => {
                        return (
                            <View key={`${index}${item.id}-postdetail`} style={styles.maintimelineview}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Image style={styles.mainimg} source={{ uri: item.user_photo ? item.user_photo : `https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png` }} />
                                    <View style={{ flex: 1, }}>
                                        <View style={styles.headingView}>
                                            <Text style={styles.titleTxt}>{item.user_name}</Text>
                                            <Text style={styles.timeTxt}>{moment(item.created_at).fromNow()}</Text>
                                        </View>
                                        <Text style={styles.commentTxt}>{item.comment}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }} />

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
            </View>}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, },
    Createtxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 18, },
    headingView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    maintimelineview: {
         marginVertical: 5, paddingHorizontal: 10
    },
    titleTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 15, },
    timeTxt: { color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 12, },
    commentTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 12, },
    mainimg: { resizeMode: 'contain', width: 30, height: 30, marginRight: 10, marginTop: -5, },

    mainSearView: {
        // zIndex: +10000,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        elevation: 10,
        // position: 'absolute', bottom: 58, left: 0, right: 0,
    },
    commentinput: { paddingLeft: 10, flex: 1, },
    emoji: { width: 25, height: 25, },
    sendIcon: { marginRight: 10, marginLeft: 10, width: 40, alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 30, backgroundColor: '#FF6265' },


})

export default CommentsList;