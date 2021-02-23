import React from "react";
import { FlatList, StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { CrossIcon, ArrowLeft, EmojiIcon, SaveIcon, SendIcon, UploadIcon, SearchIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";

const CommentsList = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#FFF' />
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>

           

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{}}>
                        <SvgXml xml={ArrowLeft} />
                    </TouchableOpacity>
                    <Text style={styles.Createtxt}>Ms-Lioness Queen Post</Text>
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

                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }} style={{ flex: 1 }} data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} renderItem={({ index, item }) => {
                    return (
                        <View style={styles.maintimelineview}>


                            <View style={{ flexDirection: 'row', }}>
                                <Image style={styles.mainimg} source={require('../../Assets/images/avatar.png')} />
                                <View style={{ flex: 1, }}>
                                    <View style={styles.headingView}>
                                        <Text style={styles.titleTxt}>Anthony Newman</Text>
                                        <Text style={styles.timeTxt}>10 mins ago</Text>
                                    </View>
                                    <Text style={styles.commentTxt}>It was a humorously perilous business for both of us. For, before we proceed further</Text>
                                </View>

                            </View>


                        </View>

                    )
                }} />







            </View>
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

    mainSearView: {zIndex:+10000, backgroundColor:'#FFF', flexDirection: 'row', alignItems: 'center', height: 60, elevation: 10, position: 'absolute', bottom: 58, left: 0, right: 0, },
    commentinput: { paddingLeft: 10, flex: 1, },
    emoji: { width: 25, height: 25, },
    sendIcon: { marginRight: 10, marginLeft: 10, width: 40, alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 30, backgroundColor: '#FF6265' },


})

export default CommentsList;