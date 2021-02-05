import React from "react";
import { FlatList, View, Image, StyleSheet, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Profile = ({ navigation }) => {

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

                <View style={styles.headview}>
                    <Text style={styles.downTxt}>PROFILE</Text>
                </View>

                <View>

                    <Image style={styles.ProImg} source={require('../../Assets/images/live.png')} />

                    <View style={{ padding: 20, }}>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.ProfileTxt}>Name </Text>
                            <Text style={styles.ProfileTxt}>TalkItOut</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.ProfileTxt}>Email </Text>
                            <Text style={styles.ProfileTxt}>TalkItOut@gmail.com</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.ProfileTxt}>Address </Text>
                            <Text style={styles.ProfileTxt}>TalkItOut Street city</Text>
                        </View>

                        <TouchableOpacity onPress={() => { navigation.navigate('UpdateProfile') }} style={{ justifyContent: 'center', alignItems: 'center', height: 40, marginVertical: 10, backgroundColor: '#2979FF' }}>
                            <Text style={{ color: '#FFF' }}>EDIT</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity  style={styles.signInView}>
                            <Text style={styles.ProfileTxt}>EDIT</Text>
                        </TouchableOpacity> */}

                    </View>

                </View>




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
    headview: { marginTop: 90, marginLeft: 20, },
    downTxt: { color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 22, },
    subHead: { color: '#E6E6E650', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 12, },
    searchView: { flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', borderColor: '#707070', borderWidth: 1, marginVertical: 20, borderRadius: 60, height: 50, },
    input: { flex: 1, paddingLeft: 25, fontSize: 14, color: '#FFF' },
    icoView: { justifyContent: 'center', alignItems: 'center', marginRight: 10, width: 40, height: 40, },
    listCont: { alignItems: 'center', justifyContent: 'space-around', padding: 15, paddingBottom: 30, flexDirection: 'row', flexWrap: 'wrap' },
    itemTou: { borderRadius: 10, marginHorizontal: 4, marginVertical: 10, },
    itemImg: { width: 100, height: 140, resizeMode: 'contain' },
    name: { marginTop: 5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    viewsTxt: { color: '#E8E8E850', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },
    ProfileTxt: { marginVertical: 5, color: '#fff', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 18, },
    EfitTxt: { fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 18, },
    signInView: { borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 80, width: 80, height: 50, alignSelf: 'center', marginTop: 20, justifyContent: 'center', alignItems: 'center' },
    ProImg: { borderRadius: 500, width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center', },



})


export default Profile;