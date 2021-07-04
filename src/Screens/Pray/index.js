import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';

const Pray = ({ navigation, route }) => {
    StatusBar.setHidden = false
    const { item } = route.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar backgroundColor='transparent' /> */}
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: 'red', flex: 1, }}>
                <View style={styles.backImgView}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: item.big_photo }}
                    />
                </View>


                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.touBack}>
                        <View style={styles.topBackView}>
                            <Image style={styles.topBackImg} source={require('../../Assets/images/login_logo.png')} />
                        </View>
                        <Text style={styles.topBackTxt}>BACK</Text>
                    </TouchableOpacity>
                </View>


                <LinearGradient colors={['#00000000', '#00000030', '#000000EE', '#000000']}
                    style={styles.linGrad}>
                    <View style={styles.detailView}>
                        <Text style={styles.title}>{item.title}</Text>
                        <ScrollView>
                            <Text style={styles.detailTxt}>{item.description}</Text>
                        </ScrollView>
                    </View>
                </LinearGradient>


            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    backImgView: { top: -20, left: 0, right: 0, bottom: -50, position: 'absolute' },
    backImg: { width: '100%', height: '100%', resizeMode: 'contain' },
    backView: { zIndex: +1111, right: 0, left: 0, position: 'absolute', top: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    touBack: { alignItems: 'center', flexDirection: 'row' },
    topBackView: { width: 50, height: 50, },
    topBackImg: { width: '100%', height: '100%', resizeMode: 'contain', },
    topBackTxt: { marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, },
    linGrad: { justifyContent: 'flex-end', paddingBottom: 150, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    detailView: { marginTop: 300, marginLeft: 20, paddingRight: 20, },
    title: { color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 18, },
    detailTxt: { color: '#E6E6E6', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, },


})

export default Pray;