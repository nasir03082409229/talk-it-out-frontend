import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import React from 'react';
import { Splash, Login, Explore, SignUp, Podcasts, Downloads, Pray, Store, Playing, Player } from '..';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomBar } from "../../Common";

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
        <BottomStack.Navigator
            tabBar={( state ) => <BottomBar state={state} navigation={state.navigation} />}
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Explore">
            {/* <BottomStack.Screen name="Splash" component={Splash} options={MyTransition} /> */}
            {/* <BottomStack.Screen name="Login" component={Login} options={MyTransition} /> */}
            <BottomStack.Screen name="Explore" component={Explore} options={MyTransition} />
            <BottomStack.Screen name="Podcasts" component={Podcasts} options={MyTransition} />
            <BottomStack.Screen name="Downloads" component={Downloads} options={MyTransition} />
            <BottomStack.Screen name="Store" component={Store} options={MyTransition} />
            {/* <BottomStack.Screen name="SignUp" component={SignUp} options={MyTransition} /> */}
            {/* <BottomStack.Screen name="Pray" component={Pray} options={MyTransition} /> */}
            {/* <BottomStack.Screen name="Playing" component={Playing} options={MyTransition} /> */}
            {/* <BottomStack.Screen name="Player" component={Player} options={MyTransition} /> */}
        </BottomStack.Navigator>
    );
};

const App = () => {

    return (

        <NavigationContainer>

            <Stack.Navigator initialRouteName='Splash' headerMode={'none'}>

                <Stack.Screen name="Splash" component={Splash} options={MyTransition} />
                <Stack.Screen name="Login" component={Login} options={MyTransition} />
                <Stack.Screen name="BottomStackComp" component={BottomStackComp} options={MyTransition} />
                <BottomStack.Screen name="SignUp" component={SignUp} options={MyTransition} />
                <BottomStack.Screen name="Pray" component={Pray} options={MyTransition} />
                <BottomStack.Screen name="Playing" component={Playing} options={MyTransition} />
                <BottomStack.Screen name="Player" component={Player} options={MyTransition} />

            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default App;
