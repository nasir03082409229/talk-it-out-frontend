import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Image, Alert, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { CrossIcon, ArrowLeft, EmojiIcon, SaveIcon, SendIcon, UploadIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CreateAccount = ({ navigation }) => {

    const [avatarImage, setAvatarImage] = useState(null)
    const [name, setName] = useState('')

    useEffect(() => {
        initState()
    }, [])

    const initState = async () => {
        let user = await AsyncStorage.getItem('@user');
        user = JSON.parse(user);
        setName(user.name)
    }

    const onPressSelectImage = () => {
        Alert.alert(
            "Upload Image",
            "Choose image for avatar",
            [
                {
                    text: "OPEN CAMERA",
                    onPress: () => {
                        ImagePicker.openCamera({}).then((images) => {
                            setAvatarImage(images)
                            console.log("🚀 ~ file: index.js ~ line 34 ~ ImagePicker.openCamera ~ images", images)
                        })
                    },
                    style: "cancel"
                },
                {
                    text: "OPEN GALLERY", onPress: () => {
                        ImagePicker.openPicker({}).then((images) => {
                            setAvatarImage(images)
                            console.log("🚀 ~ file: index.js ~ line 34 ~ ImagePicker.openCamera ~ images", images)
                        })
                    }
                }
            ]
        );
    }


    const onPressProceed = async () => {
        navigation.navigate('PostTimeLine')
        return;
        let user = await AsyncStorage.getItem('@user');
        user = JSON.parse(user);
        let data = new FormData();
        data.append('image',
            {
                uri: 'file://data/user/0/com.talkitout/cache/react-native-image-crop-picker/Screenshot_20210318-233240.png',
                name: `${name}.png`,
                type: 'image/jpg'
            });
        try {
            const { data } = await axios({
                method: 'post',
                url: `https://talkitoutqueen.com/dashboard/api/user-profile-update/${user.id}`,
                data: data
            })
            console.log("🚀 ~ file: index.js ~ line 66 ~ onPressProceed ~ data", data)
        } catch (err) {
            console.log("🚀 ~ ferrerrerr", err)

        }
    }

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
                <TouchableOpacity onPress={onPressSelectImage}>
                    <Image style={styles.img} source={avatarImage ? { uri: avatarImage.path } : require('../../Assets/images/addimg.png')} />
                </TouchableOpacity>

                <TextInput value={name} onChangeText={(text) => setName(text)} placeholderTextColor='#4A4A4A50' placeholder='Enter Wall Name' style={styles.inputSty} />

                <Text style={styles.UploadImageTxt}>
                    By Creating Account, you are automatically accepting all the <Text style={{ color: '#FF6265', textDecorationLine: 'underline' }}>Terms & Conditions</Text> related to Talk It Out
                    </Text>


                <TouchableOpacity style={styles.btnView} onPress={onPressProceed} >
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