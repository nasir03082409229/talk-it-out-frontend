import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
import {stopAudio} from './Action'
const logoutAction = async (navigation,) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ],
        })
    );
    stopAudio();
    await AsyncStorage.clear();
}

export {
    logoutAction
}