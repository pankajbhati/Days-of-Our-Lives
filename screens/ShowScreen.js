import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, Image, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
const Show = require('../server/models/showSchema');
// import BottomNav from "./components/BottomNav"

function ShowScreen({route, navigation}) {
  const {_id} = route.params;

  const [data, setData] = useState([]);
  // const [_id,set_id] = useState("")

  const fetchData = () => {
    fetch('http://10.0.2.2:3000/getshow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        try {
          console.log(result);
          setData(result.show);
        } catch (err) {
          Alert.alert('Something went wrong!');
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Performer = async () => {
    navigation.navigate('submitForm');
    // const token = await AsyncStorage.getItem('token');
    // fetch("http:10.0.2.2:3000/performer",{
    //     method: "POST",
    //     headers: {
    //         'Content-Type' : 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "token" : token,
    //         "_id" : _id
    //     })
    // })
    // .then(res => res.json())
    // .then((result) => {
    //     Alert.alert(result);
    // })
  };

  const AudienceFunction = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://10.0.2.2:3000/audience', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        _id: _id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        Alert.alert(result);
      });
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Image
              source={require('../images/zakir.jpg')}
              resizeMode="stretch"
              style={styles.coverImages}
            />
            <View style={styles.imageContainer} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.Name}</Text>
              <Text style={styles.subheading}>{data.Organizer}</Text>
              <Text style={{fontSize: 20, fontWeight: '600', marginTop: 10}}>
                Short Description:
              </Text>
              <Text style={{fontSize: 15, marginTop: 10}}>
                {data.ShortDescription}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '600', marginTop: 10}}>
                Long Description:
              </Text>
              <Text style={{fontSize: 15}}>{data.LongDescription}</Text>
              <Text style={{fontSize: 20, fontWeight: '600'}}>Rules: </Text>
              <Text style={{fontSize: 15}}>{data.Rules}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-around',
              }}>
              <Button
                mode="contained"
                style={styles.attend}
                onPress={() => Performer()}>
                Performer
              </Button>
              <Button
                mode="contained"
                style={styles.participate}
                onPress={() => AudienceFunction()}>
                Audience
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  coverImages: {
    height: 380,
    width: 250,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textContainer: {
    paddingLeft: 20,
  },
  imageContainer: {
    height: 50,
  },
  subheading: {
    fontSize: 25,
  },
  attend: {
    // flex: 1,
    marginLeft: 10,
    // height: 40,
    width: 140,
    marginBottom: 40,
  },
  participate: {
    // flex: 1,
    marginRight: 10,
    width: 140,
    marginBottom: 40,
  },
});

export default ShowScreen;
