/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Picker,
} from 'react-native'

export class LoginScene extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(74,144,226)",
        }}>
        
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}>          
          <Picker 
            style={{
              width: 200,
            }}
            selectedValue={(this.state && this.state.pickerValue) || 'a'}
            onValueChange={(value) => {}}>
            <Picker.Item label={'Telit Device Wise'} value={'a'} />
            <Picker.Item label={'AWS IoT'} value={'b'} />
            <Picker.Item label={'Cisco Jasper'} value={'c'} />
          </Picker>
          
          <Text>{'\n'}</Text>
        </View>
        
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <TextInput
            style={{
              height: 50, 
              width: 200,
              borderWidth: 4,
              borderColor: "rgba(0,0,0,0.5)",
              textAlign: "center",
              fontSize: 28,
            }}
            placeholder={"Login"}
            placeholderTextColor={"rgb(103,103,103)"}
            onChangeText={(text) => {this.setState({text})}}
            onSubmitEditing={() => {this.setState({text: ''})}}
            value={(this.state && this.state.text) || ''}
          />

          <TextInput
            style={{
              height: 50,
              width: 200,
              borderWidth: 4,
              borderColor: "rgba(0,0,0,0.5)",
              textAlign: "center",
              fontSize: 28,
            }}
            placeholder={"Password"}
            placeholderTextColor={"rgb(103,103,103)"}
            onChangeText={(text) => {this.setState({text2: text})}}
            onSubmitEditing={() => {this.setState({text2: ''})}}
            value={(this.state && this.state.text2) || ''}
          />
        </View>
        
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Text>{'\n'}</Text>
          <Button
            onPress={()=>{}}
            title="Login"
            color="rgb(0,0,0)"
          />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
