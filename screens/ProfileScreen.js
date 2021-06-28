import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import FormData from 'form-data';

function ProfileScreen({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState();
  const [modal, setModal] = useState(false);

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        //  console.log('response', JSON.stringify(response));
        const data = new FormData();
        // data.append('name', 'avatar');
        data.append('image', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
        // data.append('upload_preset', 'doolApp')
        // data.append("cloud_name", "pbhati55")
        // data.append('image', response)
        console.log(data);
        const config = {
          method: 'POST',
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        };
        fetch('http://10.0.2.2:3000/upload-images', config)
          .then(response => response.json())
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const data = new FormData();
        data.append('image', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
        console.log(data);
        const config = {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        };
        fetch('http://10.0.2.2:3000/upload-images', config)
          .then(response => response.json())
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    fetch('http:10.0.2.2:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(res => res.json())
      .then(async result => {
        console.log(result);
        try {
          setLoading(false);
          setData(result);
          // setShows(data.UserShow);
          // const {show} = data.UserShow;
          // console.log(shows);
        } catch (err) {
          Alert.alert('Something went wrong!');
        }
      });
  };

  fetchShow = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://10.0.2.2:3000/userShows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(res => res.json())
      .then(result => {
        try {
          console.log(result);
          setShows(result);
        } catch (err) {
          Alert.alert('Something went wrong in show!');
        }
      });
  };

  useEffect(() => {
    fetchData();
    fetchShow();
  }, []);

  const renderList = item => {
    return (
      <>
        <Card style={styles.cardContainer}>
          <View>
            <Text style={{fontSize: 20}}>
              To print the shows user is interested in !!
            </Text>
            <Text style={{fontSize: 25}}> {item.showId} </Text>
            <Text style={{fontSize: 25}}> {item.status} </Text>
          </View>
        </Card>
      </>
    );
  };

  // const value = fetchData();

  const logout = navigation => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.replace('userLogin');
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.content}> {data.Name} </Text>
        <Text style={styles.content}> {data.Phone} </Text>
        {/* <Text> {data.UserShow.show.showId}</Text> */}
        {/* <Text> {data.UserShow.show.status}</Text> */}
      </View>
      <View>
        <FlatList
          data={shows}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => item._id}
        />
      </View>
      <Button icon="upload" mode="contained" onPress={() => setModal(true)}>
        Upload Image
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              // theme={theme}
              mode="contained"
              onPress={() => launchCamera()}>
              camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              // theme={theme}
              onPress={() => launchImageLibrary()}>
              gallery
            </Button>
          </View>
          <Button
            // theme={theme}
            onPress={() => setModal(false)}>
            cancel
          </Button>
        </View>
      </Modal>

      {/* <View>
        <FlatList
        data = {shows}
        renderItem = {() => {
            for(let i=0, l=shows.show.length;i<l;i++){
                var item = shows.show[i];
                return renderList(item)
            }
            return renderList(item)
        }} 
        keyExtractor = {(item) => {
            for(let i=0, l=shows.show.length;i<l;i++){
                var obj = shows.show[i];
                item 
            }
        }} 
        />
        </View> */}
      <View>
        <Button
          mode="contained"
          style={styles.logout}
          onPress={() => logout(navigation)}>
          Log-Out
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  content: {
    fontSize: 20,
    alignSelf: 'center',
  },
  logout: {
    marginTop: 30,
    width: '35%',
    alignSelf: 'center',
  },
  cardContainer: {
    height: 100,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default ProfileScreen;
