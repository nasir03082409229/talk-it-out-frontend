import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import RNPoll from "react-native-poll";
import { Text } from "..";
import { logoutAction } from "../../store/AuthAction";
import { Typography } from "../../Styles";


const Poll = ({ poll }) => {
    let choices = JSON.parse(poll.answers);
    let answers = JSON.parse(poll.poll);
    choices = choices.map((x, i) => {
        return {
            id: i + 1,
            choice: x,
            votes: answers[i]
        }
    })

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
    return (
        <View style={styles.maintimelineview}>
            <Text style={styles.Createtxt}>{poll?.question}</Text>
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
        </View>)
}

const styles = StyleSheet.create({
    maintimelineview: { marginVertical: 10, marginHorizontal: 20, },
    // titletimeview:{  },
    lowerview: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    imgdetailview: { flexDirection: 'row', alignItems: 'center' },
    mainimg: { marginRight: 10, width: 50, height: 50, borderRadius: 30, resizeMode: 'contain' },


    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, },
    Createtxt: { marginBottom: -20, color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 18, },
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

export default Poll;