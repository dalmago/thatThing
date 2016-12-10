
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native'

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -29.682855;
const LONGITUDE = -53.810156;
const LATITUDE_DELTA = 0.034764;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapScene extends Component {
  constructor(props){
    super(props);
    
    if (this.props.route.initialCoords != null){
      this.state = {loading: true, region: {latitude: this.props.route.initialCoords.lat,  
                                          longitude: this.props.route.initialCoords.lng, 
                                          latitudeDelta: LATITUDE_DELTA, 
                                          longitudeDelta: LONGITUDE_DELTA}};
      
    } else{
      this.state = {loading: true, region: {latitude: LATITUDE,  
                                            longitude: LONGITUDE, 
                                            latitudeDelta: LATITUDE_DELTA, 
                                            longitudeDelta: LONGITUDE_DELTA}};
    }
    
    Icon.getImageSource('map-marker', 30, "rgb(65,117,5)").then((source) => this.setState({ thingIcon1: source }));
    Icon.getImageSource('map-marker', 30, "rgb(248,231,28)").then((source) => this.setState({ thingIcon2: source }));
    Icon.getImageSource('map-marker', 30, "rgb(245,166,35)").then((source) => this.setState({ thingIcon3: source }));
    Icon.getImageSource('map-marker', 30, "rgb(208,2,27)").then((source) => this.setState({ thingIcon4: source }));
    Icon.getImageSource('map-marker', 30, "rgb(0,122,255)").then((source) => this.setState({ thingIcon: source }));
    
    if (Platform.OS === 'ios'){
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({loading: false, region: {latitude: pos.coords.latitude, 
                                                longitude: pos.coords.longitude, 
                                                latitudeDelta: this.state.region.latitudeDelta, 
                                                longitudeDelta: this.state.region.longitudeDelta}});
      }, () => {}, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
    
    } else{
      PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((per) => {
        if (per){
          navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({loading: false, region: {latitude: pos.coords.latitude, 
                                                    longitude: pos.coords.longitude, 
                                                    latitudeDelta: this.state.region.latitudeDelta, 
                                                    longitudeDelta: this.state.region.longitudeDelta}});
          }, () => {}, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
        }
      });
    }
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
              onPress={() => {
                navigator.geolocation.getCurrentPosition((pos) => {
                  this.setState({region: {latitude: pos.coords.latitude, 
                                          longitude: pos.coords.longitude, 
                                          latitudeDelta: this.state.region.latitudeDelta, 
                                          longitudeDelta: this.state.region.longitudeDelta}});
                }, () => {}, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});}}
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
            
            onRegionChange={(region) => {this.setState({region: region})}}>
            {
              this.props.route.thingsList.map((thingCat, j) => {
                return(
                  thingCat.map((thing, i) => {
                    
                    if (thing.hasOwnProperty("loc")){
                    
                      if (thing.defKey === "spin_key"){
                        var trash_level = thing.properties.trash_level.value;
                        return (
                            <MapView.Marker coordinate={{latitude: thing.loc.lat, longitude: thing.loc.lng}} key={i} 
                              image={((trash_level < 25)? this.state.thingIcon1 : 
                                     ((trash_level < 50)? this.state.thingIcon2 : 
                                      ((trash_level < 75)? this.state.thingIcon3 : this.state.thingIcon4)))}
                            />
                        );
                      } else{
                        return (<MapView.Marker coordinate={{latitude: thing.loc.lat, longitude: thing.loc.lng}} key={i} 
                              image={this.state.thingIcon}
                            />);
                      }
                    }
                }, this)

                );
              }, this)
            }
          </MapView>}
        </View>
      </View>
    );
  }

}
