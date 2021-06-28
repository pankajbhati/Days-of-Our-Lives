import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList, Alert, ScrollView } from 'react-native';
import {Card, Title, Paragraph, Button } from 'react-native-paper';
import {SearchBar} from 'react-native-elements';
// import BottomNav from "./components/BottomNav";
// const Show = require("../server/models/showSchema");


function HomeScreen ( { navigation } ) {

    // this.state = {
    //     isLoading : true,
    //     dataSource: [],
    // }

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // const Data = [
    //     {Name: "pankaj", Sirname: "Bhati"}
    // ]

    const fetchData = async () => {
        fetch("http://10.0.2.2:3000/getshows",{
            method : "GET",
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then((res) => res.json())
        .then((responseJson) => {
            console.log(responseJson)
            try {
                // this.setState({
                //     isLoading: false,
                //     dataSource: [responseJson]
                // })
                setLoading(false);
                setData(responseJson);
            }
            catch(err) {
                Alert.alert("Something went wrong!");
            }
        } )
    }

    useEffect(() => {
        fetchData();
    },[])

    const renderList = ((item) => {
        return (
            <>
            <Card 
            style = {styles.container}
            onPress = {() => navigation.navigate("showScreen", {_id: item._id})} >
            <View style = {styles.content}>
            <Image source={require("../images/zakir.jpg")}
            resizeMode = "contain"
            style = {styles.coverImages}
            ></Image>
            <View>
                <Text style = {styles.title}>{item.Name}</Text>
                <Text style = {styles.showData}>By- {item.Organizer}</Text>
                <Text style = {styles.showData}>{item.Timing}</Text>
                <Text style = {styles.showData}>Venue: {item.Venue}</Text>
            </View> 
            </View>
            </Card>
            </>
        );
    });


    return (
        <>
            <View>
            <SearchBar placeholder = "Type here ..." lightTheme round />
                <FlatList    // this.state = {
    //     isLoading : true,
    //     dataSource: [Show],
    // }
                data = {data.shows}
                renderItem = {({item}) => {
                    return renderList(item)
                }}
                keyExtractor = {item => item._id} />
                {/* <BottomNav /> */}
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row',
        // width: '90%',
        height: 200,
        // alignItems: "flex-start",
        // justifyContent: "center",
        // borderWidth: "2%",
        borderColor: "#ddd",
        margin: 5,
    },
    content: {
        flexDirection: 'row',
        // width: 100,
        // flexDirection: 'row'
    },
    coverImages: {
        // flex: 1,
        // flexDirection: 'row'
        height: 180,
        width: 150,
        marginLeft: 10,
        marginTop: 10,
        padding: 5,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
    },
    showData: {
        fontSize: 20,
        marginLeft: 10,

    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
    }
});


export default HomeScreen;