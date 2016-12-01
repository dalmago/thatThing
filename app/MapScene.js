
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native'

export class MapScene extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: "rgba(74,144,226, 1)",
        }}>
      </View>
    );
  }
}

