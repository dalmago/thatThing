
import React, { Component } from 'react';
import {
  View,
  Navigator,
} from 'react-native'

import { LoginScene } from './LoginScene';
import { ListScene } from './ListScene';
import { MapScene } from './MapScene';

export class InitialScene extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ sceneIndex: 0 }}
        renderScene={(route, navigator) => {
          return (
            <NavigationScene 
              route={route}
              navigator={navigator}
            />
          );
        }}
      />
    );
  }
}

class NavigationScene extends Component {
  render() {
    if (this.props.route.sceneIndex == 0){
      return <LoginScene navigator={this.props.navigator} />
    } else if (this.props.route.sceneIndex == 1){
      return <ListScene route={this.props.route} navigator={this.props.navigator} />
    } else{
      return <MapScene route={this.props.route} navigator={this.props.navigator} />
    }
  }
}
