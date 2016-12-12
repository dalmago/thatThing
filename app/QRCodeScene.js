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
    
    this.found = 0;
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
            if (this.found == 0){
              this.found = 1;
              console.log('code read:', code);
              this.findThings(code.data);
            }
          }}>
          {(Platform.OS === 'ios')?
          <Icon.Button name="long-arrow-left" size={50} color="rgb(0,0,0)" backgroundColor="rgba(35,109,197,1)" 
              onPress={() => {this.props.navigator.pop()}}
          />:<View></View>}
        </Camera>
      </View>
    );
  }
  
  findThings(thingId){
    var thingFound = null;
    var i,j;
    
    for (i=0; i<this.props.route.thingsList.length; i++){
      for (j=0; j<this.props.route.thingsList[i].length; j++){
        if (this.props.route.thingsList[i][j].key == thingId){
          thingFound = this.props.route.thingsList[i][j];
        }
      }
    }
    
    if (__DEV__ === true)
      console.log('findThings:', thingFound);
    
    if (thingFound === null){
      this.props.navigator.pop();
      Alert.alert('Thing não encontrada!');
    }
    else{
      this.props.navigator.replace({sceneIndex: 4, thing: thingFound, sessionId: this.props.route.sessionId});
    }
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