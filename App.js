import { StatusBar } from 'expo-status-bar';
import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, View, Button, Switch, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';

export default function App() {
  const [wins,SetWins] = useState(0);
  const [thumbs,SetThumbs] = useState(0);
  const [untillStop,SetUntillStop] = useState(false);
  const [repeat,SetRepeat] = useState(1);

  const toggleSwitch = () => {
    SetUntillStop(!untillStop);
    if(!untillStop){
      SetRepeat(Infinity);
      ToastAndroid.show("Infinity means untill you loose in this case", ToastAndroid.LONG);
    }else{
      SetRepeat(1);
    }
  };

  async function addWins() {
    var baseURL = "http://192.168.178.66:8080/roll/flip?";
    if(thumbs > 0 && thumbs < 5 && untillStop){
      baseURL = baseURL + "thumbs=" + thumbs + "&";
    }else if(thumbs >=5 && untillStop){
      ToastAndroid.show("Please use less than 5 thumbs,\nat 5 the api might work forever", ToastAndroid.LONG);
    }else if(!untillStop){
      baseURL = baseURL + "thumbs=" + thumbs + "&";
    }
    if(untillStop){
      baseURL = baseURL + "untill_loss=1&";
    }else if(repeat > 0 && repeat != Infinity){
      baseURL = baseURL + "repeat=" + repeat;
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
      <Text  style={{paddingTop:30}}>{"Repeat " + repeat + " times"}</Text>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.styleInput}
          onChangeText={SetRepeat}
          value={repeat}
          keyboardType="numeric"
        ></TextInput>
        <Switch
          style={{paddingBottom:30}}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={untillStop ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={untillStop}
        ></Switch>
      </View>
      <TouchableOpacity 
        style={styles.styleButton}
        title={"Flip"}
        onPress={addWins}><Text style={{margin:10}}>Flip</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  styleButton:{
    height:40,
    width:200, 
    backgroundColor:"#77C3EC", 
    alignItems:"center"
  },
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
    color:'#000',
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
