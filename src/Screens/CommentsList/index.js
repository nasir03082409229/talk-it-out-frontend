import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { CrossIcon, ArrowLeft, EmojiIcon, SaveIcon, SendIcon, UploadIcon, SearchIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";

const CommentsList = ({ navigation, route }) => {

    const [postDetail, setPostDetail] = useState(null)
    const [commentList, setCommentList] = useState(null)

    useEffect(() => {
        initState()
    }, [])

    const initState = () => {
        const { postDetail, commentList } = route.params;
        console.log("🚀 ~ file: index.js ~ line 20 ~ initState ~ postDetail, commentList", postDetail, commentList)
        setPostDetail(postDetail)
        setCommentList(commentList)
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

                <View style={styles.mainSearView}>
                    <TextInput style={styles.commentinput} placeholder='Write Comment...' />
                    <TouchableOpacity >
                        <Image style={styles.emoji} source={require('../../Assets/images/emojiImg.png')} />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendIcon} >
                        <SvgXml xml={SendIcon} />
                    </TouchableOpacity>
                </View>

                <FlatList keyExtractor={index => index}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    style={{ flex: 1 }}
                    data={commentList ? commentList.data : []}
                    onEndReached={(e) => {
                        alert(JSON.stringify(e))
                    }}
                    renderItem={({ index, item }) => {
                        return (
                            <View key={index} style={styles.maintimelineview}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Image style={styles.mainimg} source={require('../../Assets/images/avatar.png')} />
                                    <View style={{ flex: 1, }}>
                                        <View style={styles.headingView}>
                                            <Text style={styles.titleTxt}>Anthony Newman</Text>
                                            <Text style={styles.timeTxt}>10 mins ago</Text>
                                        </View>
                                        <Text style={styles.commentTxt}>{item.comment}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }} />
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, },
    Createtxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 18, },
    headingView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    maintimelineview: { padding: 10, marginVertical: 5, },
    titleTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 15, },
    timeTxt: { color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 12, },
    commentTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 12, },
    mainimg: { resizeMode: 'contain', width: 30, height: 30, marginRight: 10, marginTop: -5, },

    mainSearView: { zIndex: +10000, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', height: 60, elevation: 10, position: 'absolute', bottom: 58, left: 0, right: 0, },
    commentinput: { paddingLeft: 10, flex: 1, },
    emoji: { width: 25, height: 25, },
    sendIcon: { marginRight: 10, marginLeft: 10, width: 40, alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 30, backgroundColor: '#FF6265' },


})

export default CommentsList;