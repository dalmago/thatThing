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
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export class ThingScene extends Component {
  constructor(props){
    super(props);
    
    if (this.props.route.thing.hasOwnProperty("loc")){
      this.loc = {
        lat: this.props.route.thing.loc.lat,
        lng: this.props.route.thing.loc.lng,
      }
    }
    
    this.state = {modal: false, modalLoading: false, editThing: {type: '', thing: ['', {value: ''}]}};

  }
  render() {
    var blankSpace = <Text style={{fontSize: 5}}>{'\n'}</Text>;
    
    var properties = Object.entries(this.props.route.thing.properties).map((prop, i) => {
      return (
        <View key={i}>
          <Text style={styles.subtitles}>{ prop[0] }</Text>
          
          <TouchableOpacity
            onPress={() => {this.setState({modal: true, editThing: {thing: prop, type:'p'}})}}
            activeOpacity={75 / 100}>
            <Text style={styles.texts}>{ prop[1].value }</Text>
          </TouchableOpacity>
          
        </View>
      );}, this);
    
    var alarms = Object.entries(this.props.route.thing.alarms).map((alrm, i) => {      
      return (
        <View key={i}>
          <Text style={styles.subtitles}>{ alrm[0] }</Text>
          
          <TouchableOpacity
            onPress={() => {this.setState({modal: true, editThing: {thing: alrm, type:'s'}})}}
            activeOpacity={75 / 100}>
            <Text style={styles.texts}>{ alrm[1].state }</Text>
          </TouchableOpacity>
        </View>
      );}, this);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "stretch", 
          backgroundColor: "rgba(35,109,197,1)",
        }}>
        {<Text>{''}</Text>}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "flex-start",
            }}>
            <Icon.Button name="long-arrow-left" size={50} color="rgb(0,0,0)" backgroundColor="rgba(35,109,197,1)" 
              onPress={() => {this.props.navigator.pop()}}
            />
          </View>
            
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: "bold",
                textAlign: 'center',
              }}>{this.props.route.thing.name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            {(this.props.route.thing.hasOwnProperty("loc"))?
            <Icon.Button name="map" size={50} color="rgba(42,42,42,1)" backgroundColor="rgb(35,109,197)" 
                onPress={() => {
                this.props.navigator.push({sceneIndex: 2, thingsList: [[this.props.route.thing]], initialCoords: this.loc});
              }} />:<Text />}
          </View>
        </View>
        
        <View
          style={{
            flex: 10,       
            justifyContent: "center",
            alignItems: "center", 
            backgroundColor: "rgb(74,144,226)",
          }}>
          <ScrollView 
            horizontal={false}>
            
            {blankSpace}
            <Text style={styles.titles}>Properties</Text>
            {properties}
            
            {blankSpace}
            {blankSpace}
            
            <Text style={styles.titles}>Alarms</Text>
            {alarms}
            
            {blankSpace}
            
            <Text style={styles.titles}>Location</Text>
            {(this.props.route.thing.hasOwnProperty("loc"))?
            <View >
              <Text style={styles.subtitles}>Latitude</Text>
              <Text style={styles.texts}>{this.loc.lat}</Text>
              <Text style={styles.subtitles}>Longitude</Text>
              <Text style={styles.texts}>{this.loc.lng}</Text>
            </View>
            :<View />}
            {blankSpace}
            
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Icon.Button name="map-marker" size={50} color="rgb(0,0,0)" backgroundColor="rgb(74,144,226)" 
                onPress={() => {
                  
                  Alert.alert("Enviar posição atual para o portal?", "", [{text:"Cancelar"}, {text: "Enviar", onPress: () => {
                    navigator.geolocation.getCurrentPosition((pos) => {
                      this.setState({modal: true});
                      this.sendToDW('l', [null, {lat: pos.coords.latitude, lng: pos.coords.longitude}]);
                      
                  }, () => {}, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
                  }}]);}}
              />
            </View>
          </ScrollView>
        </View>
        
        <View> 
          <Modal 
            animationType={'fade'}
            transparent={true}
            visible={this.state.modal}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                backgroundColor: "rgba(210,210,210,0.73)",
              }}>
              
              {(this.state.modalLoading)?
              <ActivityIndicator
                  animating={true}
                  size={"large"}
                  color={'black'}
              />:
              
              <View
              style={{
                borderRadius: 10,
                padding: 20,
                alignItems: 'center',
                backgroundColor: "rgba(35,109,197,1)",
                justifyContent: "center",
                alignItems: "center",
                }}>
                
                <Text style={styles.subtitles}>{this.state.editThing.thing[0]}</Text>
                {blankSpace}
                <TextInput
                  style={{
                    height: 43, 
                    width: 191,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    textAlign: "center",
                  }}
                  keyboardType={"numeric"}
                  autoFocus={true}
                  onChangeText={(text) => {
                    (this.state.editThing.type === 'p')?
                      this.setState({editThing: {type: this.state.editThing.type, thing:[this.state.editThing.thing[0], {value: text}]}})
                      : this.setState({editThing: {type: this.state.editThing.type, thing:[this.state.editThing.thing[0], {state: text}]}})
                  }}
                  onSubmitEditing={() => {this.sendToDW(this.state.editThing.type, this.state.editThing.thing)}}
                  value={
                    (this.state.editThing.type === 'p')?
                    String(this.state.editThing.thing[1].value)
                    : String(this.state.editThing.thing[1].state)
                  }
                />
                {blankSpace}
                <View
                  style={{
                    flexDirection: 'row'
                  }}>
                  <Button
                    onPress={() => {this.setState({modal: false})}}
                    title="Cancelar"
                    color="rgb(0,0,0)"
                  />
                  <Text>{"   "}</Text>
                  <Button
                    onPress={() => {this.sendToDW(this.state.editThing.type, this.state.editThing.thing)}}
                    title="Enviar"
                    color="rgb(0,0,0)"
                  />
                </View>
              </View>}
            </View>
          </Modal>
        </View>
      </View>
    );
  }
  
  sendToDW(type, keyValue){
    this.setState({modalLoading: true});
    
    var server = "https://api.devicewise.com/api";
    var sessionId = this.props.route.sessionId;
    
    var key = keyValue[0];
    
    var value = null;
    if (type === 'p'){ // property
      value = keyValue[1].value;
      
      var js = {
        "auth":{"sessionId": sessionId},
        "1": {
          "command": "property.publish",
          "params" : {
            "thingKey": this.props.route.thing.key,
            "key": key,
            "value": value
          }
        }
      }
    }
    else if (type === 's'){ // state
      value = keyValue[1].state;
      
      js ={
        "auth":{"sessionId": sessionId},
        "1": {
          "command": "alarm.publish",
          "params" : {
            "thingKey": this.props.route.thing.key,
            "key": key,
            "state": value
          }
        }
      }
    } else { // location
      value = keyValue[1];
      
      js ={
        "auth":{"sessionId": sessionId},
        "1": {
          "command": "location.publish",
          "params" : {
            "thingKey": this.props.route.thing.key,
            "lat": value.lat,
            "lng": value.lng
          }
        }
      }
    }
    
  fetch(server, {method: 'POST', body: JSON.stringify(js)}).then((res) => res.json()).then((res) => {
    if (__DEV__ === true)
      console.log('sendToDW:', res);
    
    this.setState({modalLoading: false});
    
    if (res[1].success === true){
      this.setState({modal: false});
      this.props.navigator.pop();
    } else{
      Alert.alert('Valor inválido');  
    }    
    
  }).catch((err) => {
    if (__DEV__ === true)
      console.log('sendToDW err:', err);
    
    Alert.alert('Envio falhou!', 'Verifique sua conexão com a internet');
  });
    
  }
}

const styles = StyleSheet.create({
  texts: {
    color: 'black',
    fontSize: 24,
    fontWeight: "normal",
    textAlign: "center",
  },
  titles: {
    color: 'black',
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitles: {
    color: 'black',
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
