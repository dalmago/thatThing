
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native'

import MapView from 'react-native-maps';
//var MapView = require('react-native-maps');
import Icon from 'react-native-vector-icons/FontAwesome';

export class MapScene extends Component {
  constructor(props){
    super(props);
    
    this.state = {loading: true, region: {latitude: -29.71339420208543,  
                                          longitude: -53.71697937437226, 
                                          latitudeDelta: 0.004765165452011331, 
                                          longitudeDelta: 0.00401165694565475}};
    
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({loading: false, region: {latitude: pos.coords.latitude, 
                                              longitude: pos.coords.longitude, 
                                              latitudeDelta: this.state.region.latitudeDelta, 
                                              longitudeDelta: this.state.region.longitudeDelta}});
    });
  }
  
  render() {
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
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Icon.Button name="map-marker" size={50} color="rgb(0,0,0)" backgroundColor="rgba(35,109,197,1)" 
              onPress={() => {this.setState({region: {latitude: -29.71339420208543,  
                                                      longitude: -53.71697937437226, 
                                                      latitudeDelta: 0.002765165452011331, 
                                                      longitudeDelta: 0.00201165694565475}})}}
            />
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
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animating={ true }
            size={'large'}
            color={'black'}
          />:
          
          <MapView
            region={this.state.region}
            
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            
            onRegionChange={(region) => {this.setState({region: region})}}
            
          />}
        </View>
      </View>
    );
  }

}
