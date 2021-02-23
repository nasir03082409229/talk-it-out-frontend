import React from "react";
import { FlatList, StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { CrossIcon, ArrowLeft, EmojiIcon, SaveIcon, SendIcon, UploadIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";

const CreatePost = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#FFF' />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }} style={{ backgroundColor: '#FFF', flex: 1, }}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{}}>
                        <SvgXml xml={ArrowLeft} />
                    </TouchableOpacity>
                    <Text style={styles.Createtxt}>Create Post</Text>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{}}>
                        <SvgXml xml={CrossIcon} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.uploadView}>
                    <Image style={styles.img} source={require('../../Assets/images/uploadimg.png')} />
                    <Text style={styles.UploadImageTxt}>Upload Image</Text>
                </TouchableOpacity>

                <View style={styles.topicView}>
                    <TextInput color='#999' placeholder='Topic Title' />
                    <TouchableOpacity>
                        <Image style={styles.emojiimg} source={require('../../Assets/images/emojiImg.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.topicView}>
                    <TextInput multiline={true} numberOfLines={10} color='#999' placeholder='Topic Description' />
                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.saveBtn}>
                        <SvgXml xml={SaveIcon} />
                        <Text style={styles.SaveIconTxt}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.saveBtn, {backgroundColor:'#FF6265'}]}>
                        <SvgXml xml={SendIcon} />
                        <Text style={[styles.SaveIconTxt, {color:'#FFF'}]}>Post</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    header: {  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20,paddingVertical:20, },
    Createtxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 18, },
    UploadImageTxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 20, },
    img: { width: 80, height: 80, resizeMode: 'contain', },
    emojiimg: { width: 25, height: 25, resizeMode: 'contain', },
    uploadView: { backgroundColor: '#A4B7B560', justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 300, margin: 10, },
    topicView: { paddingHorizontal: 10,  paddingVertical: 5, borderBottomColor: '#97979730', borderBottomWidth: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    saveBtn:{flexDirection:'row', borderWidth: 1, borderRadius: 10, borderColor: '#FF6265', justifyContent: 'center', alignItems: 'center', width: 140, height: 40 },
    SaveIconTxt: {marginLeft:10, color: '#FF6265', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 16, },
    btnView:{ margin: 10, marginTop:20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },




})

export default CreatePost;