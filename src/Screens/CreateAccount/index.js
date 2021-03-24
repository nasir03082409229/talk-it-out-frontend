import React from "react";
import { FlatList, StyleSheet, View, Image, Alert, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { CrossIcon, ArrowLeft, EmojiIcon, SaveIcon, SendIcon, UploadIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import ImagePicker from 'react-native-image-crop-picker';

const CreateAccount = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#FFF' />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }} style={{ backgroundColor: '#FFF', flex: 1, }}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ padding: 5 }}>
                        <SvgXml xml={ArrowLeft} />
                    </TouchableOpacity>
                    <Text style={styles.Createtxt}>Create Account</Text>
                    <TouchableOpacity style={{}}>
                    </TouchableOpacity>
                </View>
                <Text style={styles.UploadImageTxt}>Fill in required  wall name and add your Picture then click Proceed.</Text>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Upload Image",
                        "",
                        [
                            {
                                text: "OPEN CAMERA",
                                onPress: () => {
                                    ImagePicker.openCamera({}).then((images) => {
                                        console.log("🚀 ~ file: index.js ~ line 34 ~ ImagePicker.openCamera ~ images", images)
                                    })
                                },
                                style: "cancel"
                            },
                            {
                                text: "OPEN GALLERY", onPress: () => {
                                    ImagePicker.openPicker({}).then((images) => {
                                        console.log("🚀 ~ file: index.js ~ line 34 ~ ImagePicker.openCamera ~ images", images)
                                    })
                                }
                            }
                        ]
                    );

                }}>
                    <Image style={styles.img} source={require('../../Assets/images/addimg.png')} />
                </TouchableOpacity>

                <TextInput placeholderTextColor='#4A4A4A50' placeholder='Enter Wall Name' style={styles.inputSty} />

                <Text style={styles.UploadImageTxt}>
                    By Creating Account, you are automatically accepting all the <Text style={{ color: '#FF6265', textDecorationLine: 'underline' }}>Terms & Conditions</Text> related to Talk It Out
                    </Text>


                <TouchableOpacity style={styles.btnView} onPress={() => { navigation.navigate('PostTimeLine') }} >
                    <Text style={styles.btnTxt}>Proceed</Text>
                </TouchableOpacity>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, },
    Createtxt: { color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 16, },
    UploadImageTxt: { marginHorizontal: 25, marginVertical: 20, color: '#4A4A4A', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 12, },
    img: { width: 130, height: 130, resizeMode: 'contain', alignSelf: 'center', marginTop: 20, },
    btnView: { width: '90%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: '#FF6265', borderRadius: 5, },
    btnTxt: { color: '#FFF', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 14, },
    inputSty: { borderRadius: 2, borderWidth: 1, borderColor: '#F1F1F1', textAlign: 'center', marginVertical: 20, marginHorizontal: 20, height: 45, padding: 0, },
})

export default CreateAccount;