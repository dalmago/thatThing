
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  Picker,
  ActivityIndicator,
  Alert,
} from 'react-native'

export class LoginScene extends Component {
  constructor(props){
    super(props);

    this.state = {pickerValue: 'dw', loading: false, text: '', text2: ''};
  }
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
            selectedValue={this.state && this.state.pickerValue}
            onValueChange={(value) => {this.setState({pickerValue: value});}}>
            <Picker.Item label={'Telit Device Wise'} value={'dw'} />
            <Picker.Item label={'AWS IoT'} value={'aws'} />
            <Picker.Item label={'Cisco Jasper'} value={'jas'} />
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
              width: 300,
              borderWidth: 4,
              borderColor: "rgba(0,0,0,0.5)",
              textAlign: "center",
              fontSize: 19,
            }}
            keyboardType = {"email-address"}
            returnKeyType = {"next"}
            autoCapitalize = {"none"}
            placeholder= {"Login"}
            autoCorrect = {false}
            autoFocus = {true}
            placeholderTextColor={"rgb(103,103,103)"}
            onChangeText={(text) => {this.setState({text})}}
            onSubmitEditing={() => {this.refs.pass.focus();}}
            value={(this.state && this.state.text) || ''}
          />

          <TextInput
            style={{
              height: 50,
              width: 300,
              borderWidth: 4,
              borderColor: "rgba(0,0,0,0.5)",
              textAlign: "center",
              fontSize: 28,
            }}
            ref = {"pass"}
            autoCapitalize = {"none"}
            secureTextEntry = {true}
            returnKeyType = {"done"}
            returnKeyLabel = {"Login"}
            placeholder={"Password"}
            placeholderTextColor={"rgb(103,103,103)"}
            onChangeText={(text) => {this.setState({text2: text})}}
            onSubmitEditing={() => {this.login()}}
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

          {(this.state.loading)?
          <ActivityIndicator
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animating={this.state.loading}
            size={"large"}
            color={'black'}
          />
          :
          <Button
            onPress={() => {this.login()}}
            title="Login"
            color="rgb(0,0,0)"
          />}
        </View>

      </View>
    );
  }

  login(){
    this.setState({loading: true});

    var portal = this.state.pickerValue;

    switch(portal){
      case 'dw':
        this.login_dw();
        break;

      default:
        Alert.alert('Portal ainda não implementado');
        this.setState({loading: false});
    }
  }

  login_dw(){
    var login = this.state.text;
    var pass = this.state.text2;
    var server = "https://api.devicewise.com/api";

    js = {
      "auth" : {
        "command" : "api.authenticate",
        "params" : {
          "username": login,
          "password": pass
        }
      }
    }

    fetch(server, {
      method: 'POST',
      body: JSON.stringify(js)
    }).then((res) => res.json()).then((res) => {
      if (__DEV__ === true) // if in development
        console.log('login_dw: ', res);

      if (res.success === false){
        this.setState({loading: false, text:'', text2: ''});
        Alert.alert('Login falhou!', 'Usuário ou senha inválido');
      } else if (res.auth.success === true){
        //nav.pop();
        //nav.push({ sceneIndex: 1, sessionId: res.auth.params.sessionId, portal: 'dw' });
        this.props.navigator.resetTo({ sceneIndex: 1, sessionId: res.auth.params.sessionId, portal: 'dw' });
      } else{
        Alert.alert('Erro desconhecido');
        this.setState({loading: false, text:'', text2: ''});
      }
    }).catch((err) => {
      if (__DEV__ === true) // if in development
        console.log('login_dw err: ', err);

      Alert.alert('Login falhou!', 'Verifique sua conexão com a internet');
      this.setState({loading: false});
    });
  }
}
