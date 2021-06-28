import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OrgLogin from './screens/OrgLogin';
import NewUser from './screens/NewUser';
import UserLogin from './screens/UserLogin';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-community/async-storage';
import ShowScreen from './screens/ShowScreen';
import CreateShow from './screens/CreateShow';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './screens/components/BottomNav';
import SubmitForm from './screens/SubmitForm';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const detectLogIn = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      setLoggedIn(true);
      // console.log(token);
    } else {
      setLoggedIn(false);
      // console.log("Error retreiving token because it is not there")
    }
  };

  useEffect(() => {
    detectLogIn();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {isLoggedIn ? (
            <>
              <Stack.Screen name="submitForm" component={SubmitForm} />
              <Stack.Screen name="bottomNav" component={BottomNav} />
              <Stack.Screen name="homeScreen" component={HomeScreen} />
              <Stack.Screen name="showScreen" component={ShowScreen} />
              <Stack.Screen name="profileScreen" component={ProfileScreen} />
              <Stack.Screen name="createShow" component={CreateShow} />
              {/* <Stack.Screen name = "userLogin" component = {UserLogin} />
          <Stack.Screen name = "newUser" component = {NewUser} />  */}
            </>
          ) : (
            <>
              <Stack.Screen name="userLogin" component={UserLogin} />
              <Stack.Screen name="newUser" component={NewUser} />
              <Stack.Screen name="bottomNav" component={BottomNav} />
              <Stack.Screen name="homeScreen" component={HomeScreen} />
              <Stack.Screen name="showScreen" component={ShowScreen} />
              <Stack.Screen name="profileScreen" component={ProfileScreen} />
              <Stack.Screen name="submitForm" component={SubmitForm} />
              <Stack.Screen name="createShow" component={CreateShow} />
            </>
          )}
          {/* <Stack.Screen name = "profileScreen" component = {ProfileScreen} />
      <Stack.Screen name = "submitForm" component = {SubmitForm} />
      <Stack.Screen name = "bottomNav" component = {BottomNav} />
      <Stack.Screen name = "homeScreen" component = {HomeScreen} />

      <Stack.Screen name = "showScreen" component = {ShowScreen} />
        <Stack.Screen name = "newUser" component = {NewUser} />
        <Stack.Screen name = "userLogin" component = {UserLogin} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

{
  /* <Stack.Screen name = "userLogin" component = {UserLogin} />
        <Stack.Screen name = "orgLogin" component = {OrgLogin} />
        <Stack.Screen name = "newUser" component = {NewUser} />
        <Stack.Screen name = "homeScreen" component = {HomeScreen} /> */
}

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    fontSize: 30,
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
});

export default App;
