import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  const [price, setPrice] = useState('');
  const [percent, setPercent] = useState('');
  const [finalprice, setfinalprice]=useState('');
  //const [getText,setText]= useState('');
  const [getlist, setlist]=useState([]);

  navigation.setOptions({
    headerRight: () => (
      <Button
        color="black"
        title="history"
        onPress={() => {
          navigation.navigate('History', {
            getList: getlist,
            setList: setlist,
          });
        }}></Button>
    ),
  });

  const addItem = () => {
    setlist([
      ...getlist,
      {
        key: Math.random().toString(),
        dataPrice: price,
        dataPercent: percent,
        dataResult: finalprice,
      },
    ]);
    setPrice(0);
    setPercent(0);
    Keyboard.dismiss();
  };

    const check= () =>{
    if (percent < 0 || percent > 100|| price<0){
      alert("invalid value: The price can not be negative and percent should be between 0 and 100")
    }
    else{
    setfinalprice(price - (price * (percent/100)).toFixed(2));
    
    } 
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Welcome To Discount App
       {'\n'}</Text>
       <Text>
       This app will help you find the final price after discount.
       {'\n'}
       Enter the Original Price and the discount percent.
      </Text>
      <View style={{justifyContent: 'space-between', paddingBottom:50}}>
      <TextInput
        value={price}
        placeholder='Enter the Original Price'
        onChangeText={(price)=>setPrice(price)}
        keyboardType='number-pad'
        style={{ height: 40, borderColor: 'orange', borderWidth: 5,justifyContent: 'space-between'  }}
      />
      
      <TextInput
        value={percent}
        placeholder='Enter the Discount Percentage'
        onChangeText={(percent)=>setPercent(percent)}
        keyboardType='number-pad'
        style={{ height: 40, borderColor: 'orange', borderWidth: 5,justifyContent: 'space-between' }}
      />
      </View>
      <Text style={{}}>The Final price: {finalprice}
       {'\n'}
       YOU SAVE: {price-finalprice}</Text>
      <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
      <Button color="orange" title="calculate" onPress={check}>
      </Button>
      <Button title="save" color="orange" onPress={()=>{addItem()}}
      disabled={price.length<=0 && percent.length<=0}>
      </Button>
      
      </View>
    </View>
  );
}
function HistoryScreen({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => <Button title="clear"  color="black" onPress={clearAll}></Button>,
  });

  const list = route.params.getList;
  const setl = route.params.setList;
  const [newList, setNewList] = useState(list);

  const removeItem = (itemKey) => {
    let update = list.filter((item) => item.key !== itemKey);
    console.log(update);
    navigation.setParams(setl(update));
    setNewList(update);

  };

  const clearAll = () => {

          setl([])
          setNewList([])
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>Original Price</DataTable.Title>
          <DataTable.Title numeric>Discount</DataTable.Title>
          <DataTable.Title numeric>Final Price</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {newList.map((item, index) => (
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell numeric>{item.dataPrice}</DataTable.Cell>
            <DataTable.Cell numeric>{item.dataPercent}</DataTable.Cell>
            <DataTable.Cell numeric>{item.dataResult}</DataTable.Cell>
            <DataTable.Cell numeric>
              <TouchableOpacity onPress={() => removeItem(item.key)}>
                <View
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 45,
                    padding: 3,
                    justifyContent: 'center',
                    width: 30,
                    alignItems: 'center',
                    color: "white"
                  }}>
                  <Text style={styles.cross}>X</Text>
                </View>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      ))}
    </View>
  );
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"home"} >
      <Stack.Screen name="Home" component={HomeScreen} 
      options={{
        headerTitleAlign: "centre",
        headerTintColor: 'white',
        headerStyle:{
          backgroundColor: 'orange',
          borderColor: 'white',
          borderWidth: 5
        }
      }} />
      <Stack.Screen name="History" component={HistoryScreen} 
            options={{
        headerTitleAlign: "centre",
        headerTintColor: 'white',
        headerStyle:{
          backgroundColor: 'orange',
          borderColor: 'white',
          borderWidth: 7
        }
      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingTop: 10,
    justifyContent: 'space-between',   
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    padding: 5,
    backgroundColor: "white" ,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
