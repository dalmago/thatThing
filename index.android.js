/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import { LoginScene } from './app/LoginScene';
import { ListScene } from './app/ListScene';
import { MapScene } from './app/MapScene';

AppRegistry.registerComponent('ThatThing', () => MapScene);
