/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Navigator } from './src/Screens/';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
AppRegistry.registerComponent(appName, () => Navigator);
