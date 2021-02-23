import React, { useState } from "react";
import { FlatList, StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { InActiveHeart, PlusIcon, ActiveHeart, MessageIcon, SearchIcon, } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";

const PostTimeLine = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#FFF' />
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>

                <View style={styles.header}>
                    <TouchableOpacity style={{}}>
                    </TouchableOpacity>
                    <Text style={styles.Createtxt}>Talk it out Wall</Text>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{}}>
                        <SvgXml xml={SearchIcon} />
                    </TouchableOpacity>
                </View>
                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }} style={{ flex: 1 }} data={[1, 2, 3, 4, 5]} renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('PostDetails')} style={styles.maintimelineview}>
                            <View style={styles.titletimeview}>
                                <Text style={styles.titleTxt}>Talk it Out Live - Mad a dutty gyal!!!</Text>
                                <Text style={styles.timeTxt}>10 mins ago</Text>
                                <Image style={styles.img} source={require('../../Assets/images/imageplaceholder.png')} />

                            </View>
                            <View style={styles.lowerview}>
                                <View style={styles.imgdetailview}>
                                    <Image style={styles.mainimg} source={require('../../Assets/images/avatar.png')} />
                                    <View>
                                        <Text style={styles.titleTxt}>Talk it Out Live </Text>
                                        <Text style={styles.timeTxt}>10 mins ago</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <TouchableOpacity >
                                        <SvgXml xml={MessageIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <SvgXml style={{ marginLeft: 10, }} xml={ActiveHeart} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )
                }} />


                <TouchableOpacity onPress={() => navigation.navigate('CreatePost')} style={{ position: 'absolute', bottom: 60, right: 20 }}>
                    <SvgXml style={{}} xml={PlusIcon} />
                </TouchableOpacity>


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
    img: { marginVertical: 10, borderRadius: 2, width: '100%', height: 130, resizeMode: 'stretch', },
    emojiimg: { width: 25, height: 25, resizeMode: 'contain', },
    uploadView: { backgroundColor: '#A4B7B560', justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 300, margin: 10, },
    topicView: { paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: '#97979730', borderBottomWidth: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    saveBtn: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, borderColor: '#FF6265', justifyContent: 'center', alignItems: 'center', width: 140, height: 40 },
    SaveIconTxt: { marginLeft: 10, color: '#FF6265', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 16, },
    btnView: { margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },




})

export default PostTimeLine;