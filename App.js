import { StatusBar } from 'expo-status-bar';
import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, View, Button, Switch, TextInput, ToastAndroid } from 'react-native';

export default function App() {
  const [wins,SetWins] = useState(0);
  const [thumbs,SetThumbs] = useState(0);
  const [untillStop,SetUntillStop] = useState(false);

  const toggleSwitch = () => (SetUntillStop(!untillStop));

  async function addWins() {
    var baseURL = "http://192.168.178.66:8080/roll/flip?";
    if(thumbs > 0 && thumbs <5){
      baseURL = baseURL + "thumbs=" + thumbs + "&";
    }else if(thumbs >=5){
      ToastAndroid.show("Please use less than 5 thumbs,\nat 5 the api might work forever", ToastAndroid.LONG);
    }
    if(untillStop){
      baseURL = baseURL + "untill_loss=1&";
    }
    const responce = await fetch(baseURL);
    const json = await responce.json();
    SetWins(json.result);
  }
  return (
    <View style={styles.styleContainer}>
      <Text style={styles.styleTitleText}>{"Flipping"}</Text>
      <Text style={styles.styleBiggerText}>{"Wins: " + wins}</Text>
      <Text>{"Number of Karak's Thumbs: " + thumbs}</Text>
      <TextInput
        style={styles.styleInput}
        onChangeText={SetThumbs}
        value={thumbs}
        keyboardType="numeric"
      ></TextInput>
      <Text  style={{paddingTop:30}}>{"Untill loss: " + untillStop}</Text>
      <Switch
        style={{paddingBottom:30}}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={untillStop ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={untillStop}
      ></Switch>
      <Button 
        title= {"Flip"} 
        onPress={addWins}>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  styleTitleText:{
    paddingTop:50,
    fontSize: 60,
    fontWeight: "bold",
    paddingBottom: 80,
  },
  styleBiggerText:{
    fontSize: 30,
    paddingBottom: 40,
  },
  styleInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:120,
  },
  styleContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
