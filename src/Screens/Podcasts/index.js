import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { PodcastsSendIcon, PodcastsMinusIcon } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";

const Podcasts = ({ navigation }) => {
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
                    <Text style={styles.downTxt}>PODCASTS</Text>
                </View>


                <View style={styles.tagView}>

                    <View style={styles.activeTag}>
                        <View style={styles.activeDot} />
                        <Text style={styles.activeTxt}>MIX</Text>
                    </View>

                    <View style={styles.activeTag}>
                        <Text style={styles.inactiveTxt}>ELDERLY'S</Text>
                    </View>

                    <View style={styles.activeTag}>
                        <Text style={styles.inactiveTxt}>SHADE OF THE DAY</Text>
                    </View>

                    <View style={styles.activeTag}>
                        <Text style={styles.inactiveTxt}>RNB</Text>
                    </View>

                    <View style={styles.activeTag}>
                        <Text style={styles.moreTxt}> + MORE</Text>
                    </View>

                </View>

                <FlatList keyExtractor={index => index} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                 contentContainerStyle={styles.listCont} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,]} renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate('Playing') }} style={styles.listTou}>
                            <View style={styles.itemView}>
                                <Image style={styles.itemImg} source={index % 2 == 0 ? require('../../Assets/images/design.png') : require('../../Assets/images/pray.png')} />
                                <View>
                                    <Image style={styles.desiCircle} source={require('../../Assets/images/podcastcircle.png')} />
                                    <View style={styles.detailView}>
                                        <Text style={styles.epiTxt}>267</Text>
                                        <Text style={styles.epTxt}>EP</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.titleView}>
                                <Text style={styles.title}>{index % 2 == 0 ? 'REPEAT SHOW' : 'PRAY PER DAY'}</Text>
                                <TouchableOpacity style={styles.icoThou}>
                                    {
                                        index % 2 == 0 ?
                                            <SvgXml xml={PodcastsMinusIcon} />
                                            :
                                            <SvgXml xml={PodcastsSendIcon} />
                                    }
                                </TouchableOpacity>
                            </View>

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
    tagView: { marginLeft: 10, flexDirection: 'row', flexWrap: 'wrap' },
    activeTag: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', marginHorizontal: 5, borderColor: '#707070', borderWidth: 1, marginVertical: 5, borderRadius: 60, height: 40, },
    activeDot: { marginRight: 5, width: 5, height: 5, borderRadius: 10, backgroundColor: '#50E3C2' },
    activeTxt: { color: '#FFF', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    inactiveTxt: { color: '#9B9B9B', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    moreTxt: { color: '#50E3C2', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    listCont: { alignItems: 'center', justifyContent: 'space-around', padding: 15, flexDirection: 'row', flexWrap: 'wrap' },
    listTou: { width: 155, borderRadius: 10, marginHorizontal: 5, marginVertical: 10, },
    itemView: { flexDirection: 'row', alignItems: 'center', },
    itemImg: { width: 100, height: 140, resizeMode: 'contain' },
    desiCircle: { marginLeft: -50, zIndex: -1, width: 100, height: 100, resizeMode: 'contain' },
    detailView: { position: 'absolute', top: 35, left: 15 },
    epiTxt: { color: '#50E3C2', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, },
    epTxt: { marginTop: -5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 10, },
    titleView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    title: { marginTop: 5, color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 14, },
    icoThou: { justifyContent: 'center', alignItems: 'center', marginRight: 10, width: 40, height: 40, },




})


export default Podcasts;