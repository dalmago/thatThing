
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native'

export class ListScene extends Component {
  constructor(props){
    super(props);
    
    this.state = {loading: false, thingsList: []};
    
    this.getThingsList();
  }
  render() {

    var thingGroup = this.state.thingsList.map(function (thingCat, i) {
      
      var things = thingCat.map(function (thing, j) {
        return (
          <View key={j}><Text style={styles.content}>{thing.key}</Text>
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
                'Device Wise' : 'Device Wisy'
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
            <Image 
              style={{
                width: 40,
                height: 40,
              }}
              resizeMode={"contain"}
              source={require('./static/img/plus.png')}
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
            animating={this.state.loading}
            size={'large'}
            color={'black'}
          /> :
          
          <ScrollView 
            horizontal={false}>
            
            <Text style={{fontSize: 5}}>{'\n'}</Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}>
              
              <Image 
                style={{
                  width: 40,
                  height: 40,
                }}
                resizeMode={"contain"}
                source={require('./static/img/search.png')}
              />
            </View>
            
            <Text style={{fontSize: 5}}>{'\n'}</Text>
            
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                backgroundColor: "rgb(0,0,0)",
              }}>
              <Text
                style={{
                  color:  "white" ,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                VER MAPA
              </Text>
            </View>

            <Text style={{fontSize: 5}}>{'\n'}</Text>
            
            { thingGroup }
            
          </ScrollView>}
        </View>
      </View>
    );
  }
  
  getThingsList(){
    var server = "https://api.devicewise.com/api";
    var sessionId = this.props.route.sessionId;
    
    js = {
      "auth":{"sessionId": sessionId},
      "1": {
        "command": "thing.list",
        "params" : {
          "limit": 10,
          "sort": "+defName",
          "hasLoc": true
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
        //this.setState({thingsList: res[1].params});
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
    
    lastDefName = list[0].defName;
    defGroup = []
    thingsList = []
    for (i=0; i<list.length; i++){
      if (list[i].defName == lastDefName){
        defGroup = defGroup.concat(list[i]);
      } else{
        thingsList = thingsList.concat([defGroup]);
        defGroup = [];
      }
    }
    thingsList = thingsList.concat([defGroup]);
    
    this.setState({thingsList: thingsList});
  }
}

//thingsList: [{"def": "nomeDef", "thingKeys":[]}, ...]

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
