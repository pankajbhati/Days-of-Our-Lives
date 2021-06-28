import React, {useState} from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";



function NewUser( { navigation } ) {

    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('')
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const sendCred = async (navigation) => {
        fetch("http://10.0.2.2:3000/signup",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Name": Name,
                "Phone": Phone,
                "Email": Email,
                "Password": Password
            })
        })
        .then(res=>res.json())
        .then(async (data) => {
            console.log(data);
            try{
                await AsyncStorage.setItem('token', data.token);
                navigation.replace('homeScreen')
            }
            catch (e) {
                console.log("error hai",e);
            }
        })
    };

    return (
        <>
        <ScrollView>
        <KeyboardAvoidingView>
        <View style = {styles.container}>
            <Text
            style = {styles.heading}
            >User SignUP</Text>
            <TextInput
            placeholder = "Name"
            mode = "outlined"
            value = {Name}
            onChangeText = {(text) => {setName(text)}}
            style = {styles.input} />
            <TextInput 
            placeholder = "Phone Number"
            mode = "outlined"
            value = {Phone}
            onChangeText = {(text) => {setPhone(text)}}
            style = {styles.input} />
            <TextInput
            placeholder = "Email"
            mode = "outlined"
            value = {Email}
            onChangeText = {(text) => {setEmail(text)}}
            style = {styles.input} />
            <TextInput
            placeholder = "Password"
            mode = "outlined"
            value = {Password}
            onChangeText = {(text) => {setPassword(text)}}
            secureTextEntry = {true}
            style = {styles.input} />
            <Button title = "Sign Up"
            style = {styles.loger}
            onPress = {()=> sendCred(navigation)} 
            />
            <TouchableOpacity>
            <View>
                <Text
                style = {styles.newuser1}
                onPress = {() => navigation.navigate('userLogin')}
                >Already have an account, LogIn</Text>
            </View>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginLeft: 60,
        height: 580,
        width: 300,
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "rgb(61,64,69)"
        // fontWeight: 700
    },
    heading: {
        marginTop: 10,
        fontSize: 30,
        alignContent: "center",
        justifyContent: "center",
        height: 40,
        paddingBottom: 10,
        marginBottom: 30
    },
    input: {
        fontSize: 20,
        width: 280,
        height: 50,
        padding: 10,
        margin: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(145,168,204)",
        borderColor: "black",
        borderRadius: 20
         
    },
    loger: {
        marginTop: 20,
        alignItems: "center",
        height: 45,
        width: 150,
        padding: 8,
        borderRadius: 50,
        backgroundColor: "red"
    },
    newuser1: {
        fontSize: 18,
        margin: 10,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    }
});

export default NewUser;