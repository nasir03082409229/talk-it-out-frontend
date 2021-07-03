import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Alert, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { CrossIcon, ArrowLeft, EmojiIcon, SaveIcon, SendIcon, UploadIcon } from "../../Assets/Icons";
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Image from 'react-native-fast-image'
import { CommonActions } from "@react-navigation/routers";
import { logoutAction } from "../../store/AuthAction";

const CreateAccount = ({ navigation }) => {

    const [avatarImage, setAvatarImage] = useState(null)
    const [name, setName] = useState('')

    useEffect(() => {
        initState()
    }, [])

    const initState = async () => {
        try {
            const access_token = await AsyncStorage.getItem('@access_token')
            console.log("🚀 ~ file: index.js ~ line 25 ~ initState ~ access_token", access_token)
            let user = await AsyncStorage.getItem('@user');
            user = JSON.parse(user);
            console.log("🚀 ~ file: index.js ~ line 24 ~ initState ~ user", user)
            setName(user.name)
            if (user.image) {
                setAvatarImage(user.image)
            }

            const { data } = await axios({
                url: 'https://talkitoutqueen.com/dashboard/api/profile', method: 'get',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log("datatata", data.user)
            setName(data.user.name)
            if (data.user.image) {
                setAvatarImage(data.user.image)
            }
            AsyncStorage.setItem('@user', JSON.stringify(data.user))
        } catch (error) {
            if (error?.response?.status == 401) {
                logoutAction(navigation)
            }
        }
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
    console.log(avatarImage)

    const onPressProceed = async () => {
        try {
            let user = await AsyncStorage.getItem('@user');
            const access_token = await AsyncStorage.getItem('@access_token')
            console.log("🚀 ~ file: index.js ~ line 59 ~ onPressProceed ~ access_token", access_token)

            user = JSON.parse(user);
            if (avatarImage?.path) {
                try {
                    let formData = new FormData();
                    formData.append('image',
                        { uri: avatarImage.path, name: `${name}.png`, type: 'image/jpg' });
                    const { data } = await axios({
                        method: 'post',
                        url: `https://talkitoutqueen.com/dashboard/api/user-profile-update/${user.id}`,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${access_token}`
                        },
                        data: formData
                    })
                    console.log("🚀 ~ file: index.js ~ line 66 ~ onPressProceed ~ data", data)
                } catch (err) {
                    console.log("🚀 ~ ferrerrerr", err.response)

                }
            }
            const res = await axios({
                method: 'put',
                url: `https://talkitoutqueen.com/dashboard/api/user-profile-update/${user.id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: { "name": name }
            })
            const userDetailRes = await axios({
                method: 'get',
                url: `https://talkitoutqueen.com/dashboard/api/user/${user.id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            await AsyncStorage.setItem('@user', JSON.stringify(userDetailRes.data.data));
            navigation.navigate('PostTimeLine')

        } catch (error) {
            if (error?.response?.status == 401) {
                logoutAction(navigation)
            }
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
                    <Image style={styles.img}
                        source={avatarImage && avatarImage.path ? { uri: avatarImage.path } : avatarImage ? { uri: avatarImage } : require('../../Assets/images/addimg.png')}
                    />
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
    img: {
        width: 130, height: 130,
        resizeMode: 'contain', alignSelf: 'center', marginTop: 20,
        borderRadius: 200
    },
    btnView: { width: '90%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: '#FF6265', borderRadius: 5, },
    btnTxt: { color: '#FFF', fontFamily: Typography.FONT_FAMILY_LIGHT, fontSize: 14, },
    inputSty: { borderRadius: 2, borderWidth: 1, borderColor: '#F1F1F1', textAlign: 'center', marginVertical: 20, marginHorizontal: 20, height: 45, padding: 0, },
})

export default CreateAccount;