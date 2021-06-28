import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageStore,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';
import Logo from '../images/dool.jpg';

function UserLogin({navigation}) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const sendCred = async navigation => {
    fetch('http://10.0.2.2:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: Email,
        Password: Password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        try {
          await AsyncStorage.setItem('token', data.token);
          console.log(data.token);
          navigation.replace('homeScreen');
        } catch (e) {
          console.log('error hai ', e);
        }
      });
  };

  return (
    <ScrollView
      flex={1}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View
        flex={1}
        style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <View flex={2} style={{justifyContent: 'flex-end'}}>
          <Image
            source={Logo}
            resizeMode="contain"
            style={{width: 150, height: 150, borderRadius: 75}}
          />
        </View>
        <View
          flex={2}
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Email"
            value={Email}
            onChangeText={text => setEmail(text)}
            style={{
              borderWidth: 2,
              borderColor: '#F7D41F',
              width: '80%',
              borderRadius: 30,
              height: 60,
              paddingLeft: 20,
              marginBottom: 15,
            }}
          />
          <TextInput
            placeholder="Password"
            value={Password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            style={{
              borderWidth: 2,
              borderColor: '#F7D41F',
              width: '80%',
              borderRadius: 30,
              height: 60,
              paddingLeft: 20,
            }}
          />
        </View>
        <View flex={1} style={{justifyContent: 'flex-start'}}>
          <Button
            mode="contained"
            color="#F7D41F"
            onPress={() => sendCred(navigation)}
            style={{padding: 10, borderRadius: 30, marginBottom: 30}}>
            Log In
          </Button>
          <TouchableOpacity style={{}}>
            <Text onPress={() => navigation.navigate('newUser')}>
              Don't have an account, Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // <>
    //   <View style={styles.container}>
    //     <View style={styles.rect}>
    //       <Image
    //         source={require('../images/dool.jpg')}
    //         resizeMode="contain"
    //         style={styles.image}
    //       />
    //       <TextInput
    //         placeholder="Email"
    //         value={Email}
    //         onChangeText={text => {
    //           setEmail(text);
    //         }}
    //         style={styles.materialFixedLabelTextbox}
    //       />
    //       <TextInput
    //         placeholder="Password"
    //         value={Password}
    //         onChangeText={text => {
    //           setPassword(text);
    //         }}
    //         style={styles.materialFixedLabelTextbox1}
    //       />
    //       <Button
    //         title="Log In"
    //         // style={styles.button}
    //         onPress={() => sendCred(navigation)}
    //       />
    //       <TouchableOpacity>
    //         <View style={styles.textInputStack}>
    //           <Text
    //             style={styles.textInput}
    //             onPress={() => navigation.navigate('newUser')}>
    //             {' '}
    //             Don't have an account,Sign Up
    //           </Text>
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 480,
  },
  rect: {
    marginTop: 120,
    marginLeft: 70,
    height: 500,
    width: 290,
    elevation: 0,
    borderRadius: 17,
    borderColor: 'rgba(0,0,0,0.38)',
    borderWidth: 3,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowRadius: 0,
    overflow: 'visible',
  },
  image: {
    width: 130,
    height: 130,
    marginTop: 70,
    marginLeft: 80,
    borderRadius: 60,
  },
  materialFixedLabelTextbox: {
    width: 231,
    height: 45,
    borderRadius: 10,
    borderColor: 'rgba(9,9,10,1)',
    borderWidth: 1,
    marginTop: 52,
    marginLeft: 30,
  },
  materialFixedLabelTextbox1: {
    width: 231,
    height: 45,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    marginTop: 11,
    marginLeft: 30,
  },
  materialButtonPrimary: {
    marginTop: 20,
    height: 36,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 0,
    marginTop: 18,
    marginLeft: 95,
  },
  textInput: {
    marginLeft: 10,
    top: 1,
    left: 0,
    width: 180,
    height: 35,
    color: 'black',
    position: 'absolute',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    alignContent: 'center',
  },
  // textInput2: {
  //   top: 0,
  //   left: 165,
  //   width: 80,
  //   height: 25,
  //   color: "#121212",
  //   position: "absolute",
  //   fontFamily: "roboto-regular",
  //   letterSpacing: 0,
  //   textAlign: "left"
  // },
  textInputStack: {
    width: 245,
    height: 26,
    marginTop: 35,
    marginLeft: 38,
  },
});

export default UserLogin;
