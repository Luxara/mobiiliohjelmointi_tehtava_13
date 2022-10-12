import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { useState } from 'react';
import * as Contacts from 'expo-contacts'

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(      
        { fields: [Contacts.Fields.PhoneNumbers] }
            );
      if (data.length > 0) {
          let filteredData=filterContacts(data);
          setContacts(filteredData);
          }  
      }};

   
   const filterContacts =(data)=>{
    let filteredData=data;
    for (let index = 0; index < data.length; index++) {
      if(data[index].hasOwnProperty('phoneNumbers')==false){
        filteredData.splice(index, 1);  
      } 
    } return filteredData;
   }


  return (
    <View style={styles.container}>
      
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <Text>CONTACTS</Text>
      <FlatList
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize:18, marginRight:'10%'}}>{item.name} <Text style={{color:'blue'}}>{item.phoneNumbers[0].number}</Text></Text>
      </View>}  
      data={contacts}
      />
      </View>

      <Button onPress={getContacts} title='GET CONTACTS'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '20%',
  },
  listcontainer:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '3%',
  } 
});
