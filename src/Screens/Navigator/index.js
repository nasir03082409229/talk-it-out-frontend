import { CommonActions, NavigationContainer, } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Image, Touchable, StatusBar, ScrollView , Linking} from "react-native";
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
    Splash, AboutUs, Login, Explore, SignUp, Profile, UpdateProfile, ForgetPassword,
    Podcasts, Downloads, Pray, Store, Playing, Player, LoginPremium, SubscriptionPremium,
    PlayingPremium, PlayerPremium, CardsPremium, PostTimeLine, CreatePost, PostDetails,
    CommentsList, CreateAccount, Register, RadioPlayer,
} from '..';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomBar, Text } from "../../Common";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Typography, Colors } from "../../Styles";
import { SvgXml } from "react-native-svg";
import { CrossDrawer, SwitchActive, HomeDra, Switch, AboutDra, NotifDra, ShareDra, ProfileDra, ForgetPasswordDra, logout } from "../../Assets/Icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { logoutAction } from '../../store/AuthAction';
import Share from 'react-native-share'
const Stack = createStackNavigator();
const BottomStack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const BottomStackComp = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2C2939' }}>

            <BottomStack.Navigator
                tabBar={(state) => <BottomBar state={state} navigation={state.navigation} />}
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Explore"
           // initialRouteName="PostTimeLine"
            >
                <BottomStack.Screen name="Explore" component={Explore} options={MyTransition} />
                <BottomStack.Screen name="Podcasts" component={SubscriptionPremium} options={MyTransition} />
                <BottomStack.Screen name="Downloads" component={Downloads} options={MyTransition} />
                <BottomStack.Screen name="AboutUs" component={AboutUs} options={MyTransition} />
                <BottomStack.Screen name="Store" component={Store} options={MyTransition} />
                <BottomStack.Screen name="CardsPremium" component={CardsPremium} options={MyTransition} />
                <BottomStack.Screen name="PostTimeLine" component={PostTimeLine} options={MyTransition} />
                <BottomStack.Screen name="CreatePost" component={CreatePost} options={MyTransition} />
                <BottomStack.Screen name="PostDetails" component={PostDetails} options={MyTransition} />
                <BottomStack.Screen name="CommentsList" component={CommentsList} options={MyTransition} />
                {/* <BottomStack.Screen name="CreateAccount" component={CreateAccount} options={MyTransition} /> */}
            </BottomStack.Navigator>
        </SafeAreaView>

    );
};

const Home = () => {

    return (
        <Stack.Navigator initialRouteName='Splash' headerMode={'none'}>
            <Stack.Screen name="Splash" component={Splash} options={MyTransition} />
            {/* <Stack.Screen name="AboutUs" component={AboutUs} options={MyTransition} /> */}
            {/* <Stack.Screen name="Profile" component={Profile} options={MyTransition} /> */}
            {/* <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={MyTransition} /> */}
            <Stack.Screen name="LoginPremium" component={LoginPremium} options={MyTransition} />
            <Stack.Screen name="SubscriptionPremium" component={SubscriptionPremium} options={MyTransition} />
            <Stack.Screen name="PlayingPremium" component={PlayingPremium} options={MyTransition} />
            <Stack.Screen name="PlayerPremium" component={PlayerPremium} options={MyTransition} />
            {/* <Stack.Screen name="CardsPremium" component={CardsPremium} options={MyTransition} /> */}
            <Stack.Screen name="Register" component={Register} options={MyTransition} />
            <Stack.Screen name="Login" component={Login} options={MyTransition} />
            <Stack.Screen name="BottomStackComp" component={BottomStackComp} options={MyTransition} />
            <BottomStack.Screen name="SignUp" component={SignUp} options={MyTransition} />
            <BottomStack.Screen name="Pray" component={Pray} options={MyTransition} />
            <BottomStack.Screen name="Playing" component={Playing} options={MyTransition} />
            <BottomStack.Screen name="Player" component={Player} options={MyTransition} />
            <BottomStack.Screen name="RadioPlayer" component={RadioPlayer} options={MyTransition} />
            <BottomStack.Screen name="CreateAccount" component={CreateAccount} options={MyTransition} />
        </Stack.Navigator>
    )
}


const App = ({ navigation }) => {

    const [active, setActive] = useState(false);
    useEffect(() => {
        StatusBar.setHidden = true;
    }, [])

    const onPressLogout = async () => {
        //await  AsyncStorage.clear();
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             { name: 'Login' },
        //         ],
        //     })
        // );
    }

    const onPressShare = () => {
        Share.open({
            title: 'Thanks for the support and welcome to Talk it out',
            message: `follow link to download our app\n Android App: https://play.google.com/store/apps/details?id=com.talkitout \niOS App: https://apps.apple.com/us/app/talk-it-out-queen/id1562023335`, 
          
        })

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2C2939' }}>
            <NavigationContainer>

                <Drawer.Navigator drawerContent={({ navigation }) => {
                    return (
                        <ScrollView>
                            <TouchableOpacity onPress={() => { navigation.closeDrawer(); }} style={{ width: 30, height: 30, alignSelf: 'flex-end', marginRight: 20, marginTop: 20, }}>
                                <SvgXml xml={CrossDrawer} />
                            </TouchableOpacity>
                            <View style={styles.backTouch}>
                                <View style={styles.backTouView}>
                                    <Image style={styles.img} source={require('../../Assets/images/login_logo.png')} />
                                </View>
                                <Text style={styles.backtxt}>Settings</Text>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={styles.draRaow}>
                                <SvgXml xml={HomeDra} />
                                <Text style={styles.draTxtActive}>HOME</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('AboutUs') }} style={styles.draRaow}>
                                <SvgXml xml={AboutDra} />
                                <Text style={styles.draTxt}>ABOUT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setActive(!active) }} style={styles.draRaow}>
                                <SvgXml xml={NotifDra} />
                                <Text style={styles.draTxt}>NOTIFICATION</Text>
                                <SvgXml style={[{ marginTop: -15, }, active ? { marginLeft: 18, } : null]} xml={active ? SwitchActive : Switch} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Linking.openURL('https://talkitoutqueen.com/dashboard/password/reset') }} style={styles.draRaow}>
                                <SvgXml xml={ForgetPasswordDra} />
                                <Text style={styles.draTxt}>FORGET PASSWORD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} style={styles.draRaow}>
                                <SvgXml style={{ marginLeft: -5 }} xml={ProfileDra} />
                                <Text style={styles.draTxt}>PROFILE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressShare} style={styles.draRaow}>
                                <SvgXml xml={ShareDra} />
                                <Text style={styles.draTxt}>SHARE APP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => {
                                    const access_token = await AsyncStorage.getItem('@access_token')
                                    await axios({
                                        method: 'post', url: 'https://talkitoutqueen.com/dashboard/api/logout',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${access_token}`
                                        }
                                    })
                                    navigation.closeDrawer();
                                    logoutAction(navigation);

                                }}
                                style={styles.draRaow}>
                                <SvgXml xml={logout} />
                                <Text style={styles.draTxt}>LOGOUT</Text>
                            </TouchableOpacity>
                            {/* <Text>asdasdasd</Text> */}
                        </ScrollView>
                    )
                }} initialRouteName="MainStackBtn">
                    <Drawer.Screen name="Home" component={Home} />
                    {/* <Drawer.Screen name="AboutUs" component={AboutUs} /> */}
                    <Drawer.Screen name="Share App" component={AboutUs} />
                    <Drawer.Screen name="Notification" component={AboutUs} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
                    <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />
                    {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
                </Drawer.Navigator>



            </NavigationContainer>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    backTouch: { justifyContent: 'center', marginTop: 30, marginBottom: 20, flexDirection: 'row', alignItems: 'center', },
    backTouView: { width: 50, height: 50, },
    img: { width: '100%', height: '100%', resizeMode: 'contain', },
    backtxt: { marginLeft: 10, color: '#CCCCCC', fontFamily: Typography.FONT_FAMILY_EXTRA_BOLD, fontSize: 20, },
    draRaow: { flexDirection: 'row', margin: 20, },
    draTxtActive: { marginLeft: 20, color: '#380770', fontSize: 17 },
    draTxt: { marginLeft: 20, color: '#CCC', fontSize: 17 },
})

export default App;
const MyTransition = {
    gestureDirection: 'vertical',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        };
    },
};
