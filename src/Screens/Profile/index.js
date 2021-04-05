import React, { useEffect, useState } from "react";
import { FlatList, View, Image, StyleSheet, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";
import { logo, } from "../../Assets/images";
import { Mic } from "../../Assets/Icons";
import { SvgXml } from "react-native-svg";
import { Typography, Colors } from "../../Styles";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
const Profile = ({ navigation }) => {
    const [user, setUser] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        initState()
    }, [])

    const initState = async () => {
        let user = await AsyncStorage.getItem('@user');
        user = JSON.parse(user)
        setUser(user)
    }

    const onChangeText = (text) => {
        user.name = text;
        setUser({ ...user })
    }

    const updateUser = async () => {
        let access_token = await AsyncStorage.getItem('@access_token');
        const res = await axios({
            method: 'put',
            url: `https://talkitoutqueen.com/dashboard/api/user-profile-update/${user.id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            data: { "name": user.name }
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
        setIsEdit(!isEdit)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2C2939' />
            <ScrollView style={{ backgroundColor: '#2C2939', flex: 1, }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backTouch}>
                    <View style={styles.backTouView}>
                        <Image style={styles.img} source={require('../../Assets/images/login_logo.png')} />
                    </View>
                    <Text style={styles.backtxt}>BACK</Text>
                </TouchableOpacity>
                <View style={styles.headview}>
                    <Text style={styles.downTxt}>PROFILE</Text>
                </View>
                {user &&
                    <View>
                        <Image style={styles.ProImg}
                            source={user.image ? { uri: user.image } : require('../../Assets/images/addimg.png')}
                        />
                        <View style={{ padding: 20, }}>
                            {!isEdit ? <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={styles.ProfileTxt}>Name </Text>
                                <Text style={styles.ProfileTxt}>{user.name}</Text>
                            </View> : <TextInput value={user.name}
                                onChangeText={onChangeText}
                                placeholder='Name'
                                style={{ height: 40, paddingLeft: 10, marginVertical: 10, backgroundColor: '#FFF' }} />}
                            {!isEdit ? <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={styles.ProfileTxt}>Email </Text>
                                <Text style={styles.ProfileTxt}>{user.email}</Text>
                            </View> : <TextInput editable={false} value={user.email} placeholder='Email' style={{ height: 40, paddingLeft: 10, marginVertical: 10, backgroundColor: '#FFF' }} />}
                            <TouchableOpacity onPress={() => { !isEdit ? setIsEdit(!isEdit) : updateUser() }} style={{ justifyContent: 'center', alignItems: 'center', height: 40, marginVertical: 10, backgroundColor: '#2979FF' }}>
                                <Text style={{ color: '#FFF' }}>{isEdit ? 'UPDATE' : 'EDIT'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                }
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
    ProImg: {
        width: 130, height: 130,
        resizeMode: 'contain', alignSelf: 'center', marginTop: 20,
        borderRadius: 200
    },



})


export default Profile;