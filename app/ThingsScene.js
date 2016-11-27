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

export class ThingsScene extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "stretch",
          backgroundColor: "rgb(74,144,226)",
        }}>
        
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "rgba(13,96,193,1)",
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 32,
              fontWeight: "bold",
            }}>
            Thing 1
          </Text>
          <Image 
            style={{
              width: 90,
              height: 90,
            }}
            resizeMode={"contain"}
            source={require('./static/img/devicewise.png')}
          />
          
          <Image 
            style={{
              width: 40,
              height: 40,
            }}
            resizeMode={"contain"}
            source={require('./static/img/edit.png')}
          />
        </View>
        
        <View
          style={{
            flex: 10,
            justifyContent: "center",
            alignItems: "flex-start",
          }}>
          
          <ScrollView 
            horizontal={false}>
            
            <Text style={styles.titles}>{'\n'}Atributos</Text>
            <Text style={styles.subtitles}>Trash Level:</Text>
            <Text style={styles.texts}>32%</Text>
            
            <Text style={styles.titles}>{'\n'}Geolocalização</Text>
            <Text style={styles.subtitles}>Latitude:</Text>
            <Text style={styles.texts}>-29.71320</Text>
            <Text style={styles.subtitles}>Longitude:</Text>
            <Text style={styles.texts}>-53.71738</Text>
            
            <Text style={styles.titles}>{'\n'}Alarmes</Text>
            <Text style={styles.subtitles}>Tampa Aberta:</Text>
            <Text style={styles.texts}>SIM</Text>
            
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
  },
  titles: {
    color: 'black',
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitles: {
    color: 'black',
    fontSize: 24,
    fontWeight: "bold",
  },
});
