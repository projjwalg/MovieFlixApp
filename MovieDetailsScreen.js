import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Modal,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';


import {backdropURL} from './common/common';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MovieDetailsScreen ({route, navigation}) {
  const {movieDetails} = route.params;
  const [modalVisible, setModalVisible] = useState(true);   
  const [isLoading, setisLoading] = useState(false);
  return (
    
    <View style={styles.mainContainer}>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    }}
                >
                  
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.movieTitleText}>{movieDetails.original_title}</Text>
                        <Text style={styles.modalText}>{movieDetails.release_date}</Text>
                        <Text style={styles.modalText}>{movieDetails.vote_average}</Text>
                        <Text style={styles.modalText}>{movieDetails.overview}</Text>
                        <TouchableHighlight
                        style={{ ...styles.openButton }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={styles.textStyle}>Close</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                   
                </Modal>
       <Image style={styles.backdropImage} source={{uri:backdropURL+movieDetails.backdrop_path, cache: 'force-cache'}}
       onLoadStart={() => setisLoading(true)} onLoadEnd={() => setisLoading(false)}/>
       <ActivityIndicator size="large" color="#f57b02" animating={isLoading} key={isLoading ? 'loading' : 'not-loading'} style={isLoading? (styles.loading):(styles.loadingZ)}/>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 10,
        backgroundColor: "black",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: Dimensions.get('window').width - 50,
        opacity: 0.75
      },
      openButton: {
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: 'black',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'white',
        padding: 10,
        elevation: 2,
        width: Dimensions.get('window').width - 100,
        opacity: 1
      },
      movieTitleText: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 22
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      backdropImage: {
        width: "100%", 
        height: "100%", 
        resizeMode: 'cover',
      },
      loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      },
      loadingZ: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
      },
})

export default MovieDetailsScreen;
