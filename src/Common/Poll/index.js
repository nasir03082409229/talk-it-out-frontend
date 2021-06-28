import React from "react";
import { StyleSheet, View, TouchableOpacity, } from "react-native";
import { Colors, Typography } from "../../Styles";
import { Text, Touchable } from "..";
import { MessageIcon } from '../../Assets/Icons'
import { SvgXml } from 'react-native-svg'
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient'
import * as Progress from 'react-native-progress';
import RNPoll, { IChoice } from "react-native-poll";


const Poll = ({ }) => {

    return <TouchableOpacity
        style={styles.maintimelineview}>
        <Text style={styles.titleTxt}>{`What you like in TakeitOut App?`}</Text>
        <RNPoll
            totalVotes={30}

            choices={[
                { id: 1, choice: "Nike", votes: 12 },
                { id: 2, choice: "Adidas", votes: 1 },
                { id: 3, choice: "Puma", votes: 3 },
                { id: 4, choice: "Reebok", votes: 5 },
                { id: 5, choice: "Under Armour", votes: 9 },
            ]}
            onChoicePress={(selectedChoice) =>
                console.log("SelectedChoice: ", selectedChoice)
            }
        />

    </TouchableOpacity>
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

export default Poll;