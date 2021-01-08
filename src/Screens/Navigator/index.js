import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import React from 'react';
import { Splash, Login, Explore, SignUp, Podcasts, Downloads, Pray, Store, Playing, Player, LoginPremium, SubscriptionPremium, PlayingPremium, PlayerPremium, CardsPremium } from '..';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomBar } from "../../Common";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const BottomStack = createBottomTabNavigator();

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

const BottomStackComp = () => {

    return (
        <SafeAreaView style={{ flex:1, backgroundColor : '#2C2939'}}>

        <BottomStack.Navigator
            tabBar={(state) => <BottomBar state={state} navigation={state.navigation} />}
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Explore">
            <BottomStack.Screen name="Explore" component={Explore} options={MyTransition} />
            <BottomStack.Screen name="Podcasts" component={SubscriptionPremium} options={MyTransition} />
            <BottomStack.Screen name="Downloads" component={Downloads} options={MyTransition} />
            <BottomStack.Screen name="Store" component={Store} options={MyTransition} />
        </BottomStack.Navigator>
        </SafeAreaView>

    );
};

const App = () => {

    return (
        <SafeAreaView style={{ flex:1, backgroundColor : '#2C2939' }}>

        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' headerMode={'none'}>
                <Stack.Screen name="Splash" component={Splash} options={MyTransition} />
                <Stack.Screen name="LoginPremium" component={LoginPremium} options={MyTransition} />
                <Stack.Screen name="SubscriptionPremium" component={SubscriptionPremium} options={MyTransition} />
                <Stack.Screen name="PlayingPremium" component={PlayingPremium} options={MyTransition} />
                <Stack.Screen name="PlayerPremium" component={PlayerPremium} options={MyTransition} />
                <Stack.Screen name="CardsPremium" component={CardsPremium} options={MyTransition} />
                <Stack.Screen name="Login" component={Login} options={MyTransition} />
                <Stack.Screen name="BottomStackComp" component={BottomStackComp} options={MyTransition} />
                <BottomStack.Screen name="SignUp" component={SignUp} options={MyTransition} />
                <BottomStack.Screen name="Pray" component={Pray} options={MyTransition} />
                <BottomStack.Screen name="Playing" component={Playing} options={MyTransition} />
                <BottomStack.Screen name="Player" component={Player} options={MyTransition} />
            </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaView>

    );
};

export default App;
