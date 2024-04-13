/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StopWatch from './StopWatch';

AppRegistry.registerComponent(appName, () => StopWatch);
