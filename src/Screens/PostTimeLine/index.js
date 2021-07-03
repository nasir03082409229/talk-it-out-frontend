import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, RefreshControl, View, StatusBar, SafeAreaView, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { InActiveHeart, PlusIcon, ActiveHeart, MessageIcon, SearchIcon, } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import Axios from 'axios'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Image from "react-native-fast-image";
import { logoutAction } from "../../store/AuthAction";
import RNPoll from "react-native-poll";



const PostTimeLine = ({ navigation }) => {
    const [postData, setPostData] = useState(null);
    const [pollData, setPollData] = useState(null);
    const [loader, setLoader] = useState(false);

    console.log("🚀 ~ file: index.js ~ line 14 ~ PostTimeLine ~ postData", postData)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            initState()

            // do something
        });

        return unsubscribe;
    }, [navigation])

    const initState = async () => {
        setLoader(true)
        getPollList();
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
            setLoader(false)
        } catch (error) {
            setLoader(false)
            if (error?.response?.status == 401) {
                logoutAction(navigation)
            }
        }

    }

    const getPollList = async () => {
        setLoader(true)

        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            const { data } = await Axios({
                url: 'https://talkitoutqueen.com/dashboard/api/polls', method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            setPollData([...data.data])
            setLoader(false)
        } catch (error) {
            setLoader(false)
            if (error?.response?.status == 401) {
                logoutAction(navigation)
            }
        }
    }

    const onPressHeart = async (item, index) => {
        try {
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
        } catch (error) {
            if (error?.response?.status == 401) {
                logoutAction(navigation)
            }
        }
    }

    const submitVote = async ({ poll_id, answer_id }) => {
        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            let user = await AsyncStorage.getItem('@user');
            user = JSON.parse(user)
            const { data } = await Axios({
                url: 'https://talkitoutqueen.com/dashboard/api/savepoll',
                method: 'post',
                data: { "poll_id": poll_id, "user_id": user.id, "answer_id": answer_id },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log("submitVotesubmitVotesubmitVote", data)
        } catch (error) {
            if (error?.response?.status == 401) {
                logoutAction(navigation)
            }
        }
    }

    let postAndPollData = []
    postData && (postAndPollData = [...postData])
    pollData && (postAndPollData = [...pollData, ...postAndPollData,])


    console.log('PostData', postData)
    console.log('PollData', pollData)
    console.log('postAndPollData', postAndPollData)

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
                {postAndPollData ? <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loader}
                            onRefresh={initState}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 130 }}
                    style={{ flex: 1 }}
                    data={postAndPollData}
                    renderItem={({ index, item }) => {
                        if (item.poll) {
                            let poll = item;
                            let choices = JSON.parse(poll.answers);
                            let answers = JSON.parse(poll.poll);
                            choices = choices.map((x, i) => {
                                return {
                                    id: i + 1,
                                    choice: x,
                                    votes: answers[i]
                                }
                            })
                            return (
                                <View style={styles.maintimelineview} key={index + 'poll'}>
                                    <TouchableOpacity>
                                        <Text style={styles.Createtxt}>{poll?.question}</Text>
                                    </TouchableOpacity>
                                    <RNPoll
                                        votedChoiceByID={poll?.voted_index}
                                        hasBeenVoted={poll.is_voted == 'false' ? false : true}
                                        totalVotes={answers.reduce((a, b) => a + b, poll.is_voted == 'false' ? 1 : 0)}
                                        choices={choices}
                                        onChoicePress={(selectedChoice) => {
                                            submitVote({ poll_id: poll.id, answer_id: selectedChoice.id })
                                        }
                                        }
                                    />
                                </View>
                            )
                        } else {
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
                                            <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { post: item, isFromTimeline: true })}>
                                                <SvgXml xml={MessageIcon} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onPressHeart(item, index)}>
                                                <SvgXml style={{ marginLeft: 10, }} xml={item.is_liked !== 'false' ? ActiveHeart : InActiveHeart} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }

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