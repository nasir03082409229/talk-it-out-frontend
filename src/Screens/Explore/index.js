import React from "react";
import { FlatList, View, Image, StyleSheet, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Explore = ({ navigation }) => {
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

                <View style={styles.searchView}>
                    <TextInput placeholder={'Search'} placeholderTextColor={'#707070'} style={styles.input} />

                    <TouchableOpacity style={styles.icoView}>
                        <SvgXml xml={Mic} />
                    </TouchableOpacity>

                </View>

                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listCont} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,]} renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate('Player') }} style={styles.itemTou}>
                            <Image style={styles.itemImg} source={index % 2 == 0 ? require('../../Assets/images/design.png') : require('../../Assets/images/pray.png')} />
                            <Text style={styles.name}>{index % 2 == 0 ? 'REPEAT SHOW' : 'PRAY PER DAY'}</Text>
                            <Text style={styles.viewsTxt}>2.5K</Text>
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
    searchView: { flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', borderColor: '#707070', borderWidth: 1, marginVertical: 20, borderRadius: 60, height: 50, },
    input: { flex: 1, paddingLeft: 25, fontSize: 14, color: '#FFF' },
    icoView: { justifyContent: 'center', alignItems: 'center', marginRight: 10, width: 40, height: 40, },
    listCont: { alignItems: 'center', justifyContent: 'space-around', padding: 15, flexDirection: 'row', flexWrap: 'wrap' },
    itemTou: { borderRadius: 10, marginHorizontal: 5, marginVertical: 10, },
    itemImg: { width: 100, height: 140, resizeMode: 'contain' },
    name: { marginTop: 5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    viewsTxt: { color: '#E8E8E850', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, },



})


export default Explore;