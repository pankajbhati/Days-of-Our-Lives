import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons} from "react-native-vector-icons";
import HomeScreen from "../HomeScreen";
import CreateShow from "../CreateShow";
import ProfileScreen from "../ProfileScreen";
import ShowScreen from '../ShowScreen';


const Tab = createMaterialBottomTabNavigator();


function BottomNav () {
    return (
        <>
            <Tab.Navigator
            initialRouteName = "Home"
            activeColor = "#e91e63"
            style = {{ backgroundColor : "tomato"}}>
                <Tab.Screen
                name = "Home"
                component = {HomeScreen}
                options ={{
                    tabBarLabel : 'Home',
                    tabBarIcon : ({color}) => {
                        <MaterialCommunityIcons name= "home" color = {color} size = {26} />
                    }
                }}
                />
                <Tab.Screen
                name = "My Shows"
                component = {CreateShow}
                options ={{
                    tabBarLabel : 'My Shows',
                    tabBarIcon : ({color}) => {
                        <MaterialCommunityIcons name= "instagram" color = {color} size = {26} />
                    }
                }}
                />
                <Tab.Screen
                name = "Account"
                component = {ProfileScreen}
                options ={{
                    tabBarLabel : 'Account',
                    tabBarIcon : ({color}) => {
                        <MaterialCommunityIcons name= "user" color = {color} size = {26} />
                    }
                }}
                />
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({

})

export default BottomNav;