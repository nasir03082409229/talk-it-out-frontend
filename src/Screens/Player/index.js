import React from "react";
import { FlatList, View, Image, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { SettingIcon, Pause, SeekLeft, SeekRight, Loop, LeftCorner, UpArrow, Cross, } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

const Player = ({navigation}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <View style={{
                    
                    top: -20, left: 0, right: 0, bottom: -50,
                    position: 'absolute'
                }}>
                    <Image
                        style={{  width: '100%', height: '100%', }}
                        source={require('../../Assets/images/prayback.png')}
                    />
                </View>


                <View style={{zIndex:+1111, right: 0, left: 0, position: 'absolute', top: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ width: 50, height: 50, }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={require('../../Assets/images/login_logo.png')} />
                        </View>
                        <Text style={{ marginLeft: 10, color: '#fff', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 18, }}>BACK</Text>
                    </TouchableOpacity>
                </View>



                <LinearGradient colors={['rgba(44,41,57,0)', 'rgba(44,41,57,0.01)', 'rgba(44,41,57,0.1)', 'rgba(44,41,57,0.2)', 'rgba(44,41,57,0.5)', 'rgba(44,41,57,0.9)', 'rgba(44,41,57,0.99)', 'rgba(44,41,57,1)',]} style={{ justifyContent: 'flex-end', paddingBottom: 230, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>

                    <Text style={{ marginBottom: 30, backgroundColor: '#2C293980', padding: 7, width: 120, textAlign: 'right', paddingRight: 15, fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, color: '#50E3C2', textAlignVertical: 'center', borderTopRightRadius: 30, borderBottomRightRadius: 30, }}>NOW PLAYING</Text>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 20, }}>
                        <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View>
                                <Text style={{ color: '#fff', fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: 18, }}>Lets Pray</Text>
                                <Text style={{ color: '#FFFFFF80', fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 14, }}>EPISODE - 14</Text>
                            </View>
                            <TouchableOpacity style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={SettingIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: 8, marginTop: 10, marginBottom: 3, }}>
                            <Slider
                                style={{}}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#707070"
                                maximumTrackTintColor="#707070"
                            />
                        </View>
                        <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, }}>1:02:50</Text>
                            <Text style={{ color: '#FFFFFF', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, }}>1:02:50</Text>
                        </View>



                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={LeftCorner} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={SeekLeft} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#50E3C2', borderRadius: 50, width: 65, height: 65, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={Pause} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={SeekRight} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                <SvgXml xml={Loop} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}} style={{alignSelf:'center',marginTop:15, flexDirection: 'row', width: 90, height: 30, backgroundColor:'#FFFFFF20', borderRadius:40, justifyContent: 'center', alignItems: 'center', }}>
                            <SvgXml xml={UpArrow} />
                            <Text style={{marginLeft:10, color: '#fff', fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, fontSize: 12, }}>QUEUE</Text>
                        </TouchableOpacity>

                    </View>

                </LinearGradient>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Player;