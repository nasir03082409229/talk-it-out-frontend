/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Navigator } from './src/Screens/';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
import App from './src/index'
import 'react-native-gesture-handler'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import TestScreen from './src/Screens/TestScreen'

AppRegistry.registerComponent(appName, () => Navigator);
