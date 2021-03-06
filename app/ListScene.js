
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export class ListScene extends Component {
  constructor(props){
    super(props);
    
    this.state = {loading: true, thingsList: []};
    
    this.getThingsList();
  }
  render() {
    
    var thingGroup = this.state.thingsList.map((thingCat, i) => {
      
      var things = thingCat.map((thing, j) => {
      
        return (
          <View key={j}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigator.push({sceneIndex: 4, thing: thing, sessionId: this.props.route.sessionId});
              }}
              activeOpacity={75 / 100}>
              <Text style={styles.content}>{thing.name}</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 5}}>{'\n'}</Text>
          </View>
        );}, this);
      
      return (
        <View key={i}>
          <Text style={styles.titles}>{ thingCat[0].defName }</Text>
          <Text style={{fontSize: 5}}>{'\n'}</Text>
          { things }
        </View>
      );}, this);
    
    var blankSpace = <Text style={{fontSize: 5}}>{'\n'}</Text>;
    
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
              alignItems: "center",
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: "bold",
                textAlign: 'center',
              }}>
              {(this.props.route.portal === 'dw')?
                'Device Wise' : ''
              }
            </Text>
          </View>
            
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            
             <Image 
              style={{
                width: 90,
                height: 90,
              }}
              resizeMode={"contain"}
              source={require('./static/img/devicewise.png')}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Icon.Button name="refresh" size={50} color="rgba(40,40,40,1)" backgroundColor="rgba(35,109,197,1)" onPress={() => {
                this.setState({loading: true});
                this.getThingsList();
              }}/>                        
          </View>
        </View>
        
        <View
          style={{
            flex: 10,       
            justifyContent: "center",
            alignItems: "center", 
            backgroundColor: "rgb(74,144,226)",
          }}>
          
          {(this.state.loading)?
          <ActivityIndicator
            animating={this.state.loading}
            size={'large'}
            color={'black'}
          /> :
          
          <ScrollView 
            horizontal={false}>
            
            {blankSpace}
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}>
              
              <Icon.Button name="search" size={50} color="rgba(42,42,42,1)" backgroundColor="rgb(74,144,226)" 
                onPress={() => {this.props.navigator.push({sceneIndex: 3, thingsList: this.state.thingsList, sessionId: this.props.route.sessionId})}} 
              />
                                      
              <Icon.Button name="map" size={50} color="rgba(42,42,42,1)" backgroundColor="rgb(74,144,226)" 
                onPress={() => {this.props.navigator.push({sceneIndex: 2, thingsList: this.state.thingsList})}} />
            </View>

            {blankSpace}
            
            { thingGroup }
            
          </ScrollView>}
        </View>
      </View>
    );
  }
  
  getThingsList(){
    switch(this.props.route.portal){
      case 'dw':
        this.getThingsDW();
        break;

      default:
        Alert.alert('Portal ainda não implementado');
        this.setState({loading: false});
    }
  }
  
  getThingsDW(){
    var server = "https://api.devicewise.com/api";
    var sessionId = this.props.route.sessionId;
    
    var js = {
      "auth":{"sessionId": sessionId},
      "1": {
        "command": "thing.list",
        "params" : {
          "limit": 10,
          "sort": "+defName"
        }
      }
    }
    
    fetch(server, {
      method: 'POST',
      body: JSON.stringify(js)
    }).then((res) => res.json()).then((res) => {
      if (__DEV__ === true)
        console.log('getThingsList: ', res);
      
      if (res[1].success === true){
        this.updateThingsList(res[1].params.result);
      } else{
        Alert.alert('Erro obtendo dados', 'Tente fazer login novamente');
      }
      
      this.setState({loading: false});
      
    }).catch((err) => {
      if (__DEV__ === true)
        console.log('getThingsList err:', err);
      
      Alert.alert('Erro obtendo dados', 'Você está conectado?');
    });
  }
  
  updateThingsList(list){
    var lastDefName = list[0].defName;
    var defGroup = []
    var thingsList = []
    for (i=0; i<list.length; i++){
      if (list[i].defName == lastDefName){
        defGroup = defGroup.concat(list[i]);
      } else{
        thingsList = thingsList.concat([defGroup]);
        defGroup = [list[i]];
        lastDefName = list[i].defName;
      }
    }
    thingsList = thingsList.concat([defGroup]);
    
    this.setState({thingsList: thingsList});
  }
}

const styles = StyleSheet.create({
  titles: {
    color: 'black',
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    color: 'black',
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "center",
  },
});
