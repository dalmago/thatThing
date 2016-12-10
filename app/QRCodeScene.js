'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';

export class QRCodeScene extends Component {
  constructor(props){
    super(props);

    if (Platform.OS === 'android')
      PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
    
  }
  
  static code;
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={(code) => {
            console.log('code read:', code);
            this.props.route.onQRCodeRead(code.data, this.props.route.context);
            this.props.navigator.pop();
          }}>
          {(Platform.OS === 'ios')?
          <Icon.Button name="long-arrow-left" size={50} color="rgb(0,0,0)" backgroundColor="rgba(35,109,197,1)" 
              onPress={() => {this.props.navigator.pop()}}
          />:<View></View>}
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
});