import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';

const logoutAction = async (navigation,) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ],
        })
    );
    await AsyncStorage.clear();
}

export {
    logoutAction
}