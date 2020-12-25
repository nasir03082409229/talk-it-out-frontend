import React from "react";
import { FlatList, StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { PodcastsSendIcon, PodcastsMinusIcon, SettingIcon, PlayIcon } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Downloads = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backTouch}>
                    <View style={styles.backTouView}>
                        <Image style={styles.img} source={require('../../Assets/images/login_logo.png')} />
                    </View>
                    <Text style={styles.backtxt}>BACK</Text>
                </TouchableOpacity>
                <Image style={styles.design} source={require('../../Assets/images/transparentDesign.png')} />

                <View style={styles.headview}>
                    <Text style={styles.downTxt}>DOWNLOADS</Text>
                    <Text style={styles.subHead}>Listen to all your playlists {'\n'}offline right here.</Text>
                </View>



                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 15, }} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,]} renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity onPress={() => { }} style={styles.listTouch}>
                            <TouchableOpacity style={styles.playIcoTou}>
                                <SvgXml xml={PlayIcon} />
                            </TouchableOpacity>
                            <View style={styles.txtView}>
                                <Text style={styles.epiTxt}>Episode 148</Text>
                                <Text style={styles.nameTxt}>Martin Garrix Show</Text>
                                <Text style={styles.timerTxt}>1:42:00</Text>
                            </View>
                            <TouchableOpacity style={styles.setIcoTou}>
                                <SvgXml xml={SettingIcon} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }} />




            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backTouch: { position: 'absolute', top: 20, left: 10, width: 130, flexDirection: 'row', alignItems: 'center', },
    backTouView: { width: 50, height: 50, },
    img: { width: '100%', height: '100%', resizeMode: 'contain', },
    backtxt: { marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, },
    design: { width: 310, height: 310, opacity: 1, position: 'absolute', right: -115, top: -100, },
    headview: { marginTop: 130, marginLeft: 20, },
    downTxt: { color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 22, },
    subHead: { color: '#E6E6E650', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },
    listTouch: { marginVertical: 10, alignItems: 'center', flexDirection: 'row', },
    playIcoTou: { borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 40, width: 55, height: 55, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    txtView: { marginLeft: 20, flex: 1, },
    epiTxt: { color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    nameTxt: { color: '#E6E6E640', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },
    timerTxt : { color: '#E6E6E640', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },
    setIcoTou : { width: 55, height: 55, justifyContent: 'center', alignItems: 'center' },



})

export default Downloads;