import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';


function OrgLogin( { navigation } ) {
    return(
        <>
        <View style = {styles.container}>
            <Text>This screen of the app deals with the login of the organiser and 
                  then further takes it to the event form of the app</Text>
        </View>
        <TouchableOpacity>
            <View>
                <Text
                style = {styles.container}
                onPress = {() => navigation.navigate('homeScreen')}
                >Go to signup screen</Text>
            </View>
        </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        fontSize:20,
        padding:20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 80,
    },
});

export default OrgLogin;