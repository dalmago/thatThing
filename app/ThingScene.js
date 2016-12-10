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
  Image,
  ScrollView,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export class ThingScene extends Component {
  constructor(props){
    super(props);
    
    this.loc = {
      lat: this.props.route.thing.loc.lat,
      lng: this.props.route.thing.loc.lng,
    }
  }
  render() {
    var blankSpace = <Text style={{fontSize: 5}}>{'\n'}</Text>;
    
    var properties = Object.entries(this.props.route.thing.properties).map((prop, i) => {
      return (
        <View key={i}>
          <Text style={styles.subtitles}>{ prop[0] }</Text>
          <Text style={styles.texts}>{ prop[1].value }</Text>
        </View>
      );}, this);
    
    var alarms = Object.entries(this.props.route.thing.alarms).map((alrm, i) => {      
      return (
        <View key={i}>
          <Text style={styles.subtitles}>{ alrm[0] }</Text>
          <Text style={styles.texts}>{ alrm[1].state }</Text>
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
            <Icon.Button name="map" size={50} color="rgba(42,42,42,1)" backgroundColor="rgb(35,109,197)" 
                onPress={() => {
                this.props.navigator.push({sceneIndex: 2, thingsList: [[this.props.route.thing]], initialCoords: this.loc});
              }} />
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
            
          </ScrollView>
        </View>
      </View>
    );
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
