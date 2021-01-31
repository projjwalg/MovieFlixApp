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

import Icon from 'react-native-vector-icons/MaterialIcons';
import {baseURL, posterURL, backdropURL} from './common/common';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MovieDetailsScreen ({route, navigation}) {
  const {movieDetails} = route.params;
  const [modalVisible, setModalVisible] = useState(true);   
  return (
    
    <View>
                
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
       <View style={{flexDirection: 'row',  flexWrap: 'wrap'}}>         
       <Image style={{width: '100%', height: windowHeight, aspectRatio:0.5, resizeMode: 'stretch',}} source={{uri:backdropURL+movieDetails.backdrop_path, cache: 'force-cache'}}/>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
})

export default MovieDetailsScreen;
