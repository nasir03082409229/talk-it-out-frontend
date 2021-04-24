import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, Image, Keyboard, Alert, RefreshControl, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { ArrowLeft, CrossIcon, SendIcon, menu_vertical } from "../../Assets/Icons";
import { Text, EditCommentModal } from "../../Common";
import { logoutAction } from '../../store/AuthAction';
import { Typography } from "../../Styles";


const CommentsList = ({ navigation, route }) => {
    const { post } = route.params;
    const isFocused = useIsFocused();

    const [user, setUser] = useState(null)
    const [interval, setIntervalstate] = useState(null)
    const [postDetail, setPostDetail] = useState(null)
    const [commentList, setCommentList] = useState(null)
    const [loader, setLoader] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [isEditComment, setIsEditComment] = useState(null)


    // var interval;
    useEffect(() => {
        if (commentList !== null) {
            startInterval()
        }
    }, [commentList])

    useEffect(() => {
        if (!isFocused) {
            clearInterval(interval)
        }
        initState()
        const unsubscribe = navigation.addListener('blur', e => {
            clearInterval(interval)
        });
        return unsubscribe
    }, [isFocused])

    const startInterval = () => {
        if (isFocused) {
            interval && clearInterval(interval)
            const intervalRef = setInterval(() => {
                getComments()
            }, 10000);
            setIntervalstate(intervalRef)
        }
    }


    const getComments = async () => {
        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            const { data } = await Axios({
                url: `https://talkitoutqueen.com/dashboard/api/get-comments/${postDetail.id}`,
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            let previousData = commentList.data;
            let newCommentData = { ...data }
            let key = "id";
            let comments = previousData.map((item, i) => Object.assign({}, item, newCommentData.data[i]));

            commentList.data = comments
            setCommentList({ ...commentList })

        } catch (error) {
            if (error.response.status == 401) {
                logoutAction(navigation)
            }
        }
    }

    const loadMoreComments = async () => {
        try {
            setLoader(true)
            const access_token = await AsyncStorage.getItem('@access_token')
            const { data } = await Axios({
                url: `${commentList.links.next}`,
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

        } catch (error) {
            if (error.response.status == 401) {
                logoutAction(navigation)
            }
        }
    }

    const initState = () => {
        const { post, commentList } = route.params;
        setPostDetail({ ...post })
        setCommentList({ ...commentList })
        getUser()
    }

    const onPressSendComment = async (gif_base64) => {
        const access_token = await AsyncStorage.getItem('@access_token')
        let user = await AsyncStorage.getItem('@user')
        user = JSON.parse(user);
        try {
            const { data } = await Axios({
                url: `https://talkitoutqueen.com/dashboard/api/post-comments`,
                method: 'put',
                data: {
                    "user_id": user.id,
                    "post_id": post.id,
                    "comment": gif_base64 ? gif_base64 : commentText,
                    "type": gif_base64 ? 'gif' : 'text'
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            getComments();
            setCommentText('')
            Keyboard.dismiss()

            console.log("🚀 ~ file: index.js ~ commentList ", commentList)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 145 ~ onPressSendComment ~ error", error)
            if (error.response.status == 401) {
                logoutAction(navigation)
            }
        }

    }

    const onPressCommentMenu = (comment_id, comment, type) => {
        Alert.alert(
            "Alert",
            "Are you sure you want to delete comment?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                type == 'text' && ({
                    text: "Edit", onPress: () => {
                        setIsEditComment(comment)
                    }
                }),
                {
                    text: "DELETE", onPress: () => {
                        deleteComment(comment_id)
                    }
                }
            ]
        );
    }

    const deleteComment = async (comment_id) => {
        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            let user = await AsyncStorage.getItem('@user');
            user = JSON.parse(user)
            const { data } = await Axios({
                url: 'https://talkitoutqueen.com/dashboard/api/post-delete-comments',
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: { "id": comment_id }
            })
            getComments()
        } catch (error) {
            if (error.response.status == 401) {
                logoutAction(navigation)
            }
        }
    }
    const getUser = async () => {
        let user = await AsyncStorage.getItem('@user');
        user = JSON.parse(user)
        setUser(user)
    }

    const onPressUpdateComment = async (updatedComment) => {
        console.log("isEditCommentnt", isEditComment, updatedComment)
        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            let user = await AsyncStorage.getItem('@user');
            user = JSON.parse(user)
            const { data } = await Axios({
                url: `https://talkitoutqueen.com/dashboard/api/post-comment/${isEditComment.id}`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: { "comment": updatedComment, type: 'text' }
            })
            console.log("DATA", data)
            onPressCancelEditComment()
            getComments()

        } catch (error) {
            if (error.response.status == 401) {
                logoutAction(navigation)
            }
        }
    }

    const onPressCancelEditComment = () => {
        setIsEditComment(null)
    }
    const _onImageChange = useCallback(({ nativeEvent }) => {
        const { linkUri, data } = nativeEvent;
        console.log("🚀 ~ file: index.js ~ line 234 ~ const_onImageChange=useCallback ~ nativeEvent", nativeEvent)
        onPressSendComment(`data:image/png;base64,${data}`)

    }, []);

    const renderOptionsDots = (item, type) => {
        return user?.id == item.user_id ? <TouchableOpacity onPress={() => onPressCommentMenu(item.id, item, type)}>
            <SvgXml xml={menu_vertical} />
        </TouchableOpacity> : null
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <SvgXml xml={CrossIcon} />
                    </TouchableOpacity>
                </View>
                {commentList && commentList.data.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 180, paddingVertical: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Text style={{ color: 'black', textAlign: 'center' }}>No comments found</Text>
                    </View>
                </View> : null}
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loader}
                            onRefresh={getComments}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, }}
                    data={commentList ? commentList.data : []}
                    ListFooterComponent={() => (<View style={{ height: 25, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                        {commentList && commentList.links?.next ?
                            !loader ? <TouchableOpacity onPress={() => loadMoreComments()} style={{ width: 100, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
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
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.timeTxt}>{moment.utc(item.created_at).fromNow()}</Text>
                                                {renderOptionsDots(item, item.type)}
                                            </View>
                                        </View>
                                        {item.type == 'text' ?
                                            <Text style={styles.commentTxt}>{item.comment}</Text> :
                                            <Image style={styles.gifImage} resizeMode={'contain'} source={{ uri: item.comment }} />}
                                    </View>
                                </View>
                            </View>
                        )
                    }} />

                <View style={styles.mainSearView}>
                    <TextInput
                        value={commentText}
                        onChangeText={(text) => setCommentText(text)}
                        onImageChange={_onImageChange}

                        style={styles.commentinput}
                        placeholder='Write Comment...' />
                    <TouchableOpacity onPress={() => onPressSendComment()} style={styles.sendIcon} >
                        <SvgXml xml={SendIcon} />
                    </TouchableOpacity>
                </View>
            </View>}
            {isEditComment && <EditCommentModal
                onPressUpdateComment={onPressUpdateComment}
                onPressCancelEditComment={onPressCancelEditComment}
                value={isEditComment.comment}
            />}
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
    // mainimg: { resizeMode: 'contain', width: 30, height: 30, marginRight: 10, marginTop: -5, },
    mainimg: {
        marginRight: 10, width: 40, height: 40, borderRadius: 70,
    },
    gifImage: {
        width: 150, height: 150, borderRadius: 10
    },
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