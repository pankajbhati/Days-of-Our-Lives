import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {Button, TextInput } from 'react-native-paper';

function CreateShows() {

    const [Name, setName] = useState('');
    const [Organizer, setOrganizer] = useState('');
    const [Timing, setTiming] = useState();
    const [Venue, setVenue] = useState('');
    const [Price, setPrice] = useState('');
    const [Audience, setAudience] = useState();
    const [ShortDescription, setShortDescription] = useState('');
    const [LongDescription, setLongDesctiption] = useState('');


    const createShow = async () => {
        fetch("http://10.0.2.2:3000/createshow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Name": Name,
                "Organizer": Organizer,
                "Timing": Timing,
                "Venue": Venue,
                "Price": Price,
                "Audience": Audience,
                "ShortDescription": ShortDescription,
                "LongDescription": LongDescription
            })
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        })
    }




    return(
        <>
        <ScrollView>
        <KeyboardAvoidingView behavior = "padding">
        <View style = {styles.container}>
            <Text style = {styles.heading}>Create New Show</Text>
            <TextInput label = "Name of Show"
            mode = "outlined"
            value = {Name}
            onChangeText = {(text) => {setName(text)}}
            style = {styles.input} />
            <TextInput label = "Organizer Name"
            mode = "outlined"
            value = {Organizer}
            onChangeText = {(text) => {setOrganizer(text)}}
            style = {styles.input} />
            <TextInput label = "Show Timing"
            mode = "outlined"
            value = {Timing}
            onChangeText = {(text) => {setTiming(text)}}
            style = {styles.input} />
            <TextInput label = "Venue"
            mode = "outlined"
            value = {Venue}
            onChangeText = {(text) => {setVenue(text)}}
            style = {styles.input} />
            <TextInput label = "Price of Show"
            mode = "outlined"
            value = {Price}
            onChangeText = {(text) => {setPrice(text)}}
            style = {styles.input} />
            <TextInput label = "Audience"
            mode = "outlined"
            value = {Audience}
            onChangeText = {(text) => {setAudience(text)}}
            style = {styles.input} />
            <TextInput label = "Short description about show"
            mode = "outlined"
            value = {ShortDescription}
            onChangeText = {(text) => {setShortDescription(text)}}
            multiline = {true}
            numberOfLines = {8}
            style = {styles.input} />
            <TextInput label = "Description of Show"
            mode = "outlined"
            value = {LongDescription}
            onChangeText = {(text) => {setLongDesctiption(text)}}
            multiline = {true}
            numberOfLines = {15}
            style = {styles.input} />
        </View>
        <View>
            <Button mode = "contained" 
            style = {styles.createButton}
            onPress = {() => createShow()}>Create Show</Button>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        marginTop: 60,
        alignContent: "center",
    },
    heading: {
        alignSelf: "center",
        fontSize: 30,
        marginBottom: 20
    },
    input: {
        width: "90%",
        alignSelf: "center",
        margin: "1%"
    },
    createButton: {
        width: "40%",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 60
    }
});


export default CreateShows;