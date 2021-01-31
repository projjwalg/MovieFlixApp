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
  ActivityIndicator
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {baseURL, posterURL} from './common/common';

function NowPlayingScreen ({navigation}) {
    const [nowPlayingList, setNowPlayingList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    ActivityIndicator,
    useEffect(() => {
        setisLoading(true);
        fetch(baseURL+'now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((res) => res.json())
            .then((response) => { 
                setNowPlayingList(response.results);
                setisLoading(false);
            })
            .catch((err) => alert("Error loading data!"));
            setisLoading(false);
    });

    updateSearch = (searchText) => {
        setSearchText(searchText);
        
      };

 renderHeader = () => {
    return (
        <SearchBar
        placeholder="Type Here"
        onChangeText={updateSearch}
        value={searchText}
      />
    );
  }

  fetchNowPlayingList = () => {
    fetch(baseURL+'now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
    .then((res) => res.json())
    .then((response) => { 
        setNowPlayingList(response.results);
        setRefreshing(false);
    })
    .catch((err) => alert(baseURL));
  }

  handleRefresh = () => {
    setRefreshing(true);
    fetchNowPlayingList();
  }

    return (
       
        
        <View style={styles.mainContainer}>
                 <Spinner
                    visible={isLoading}
                    textStyle={styles.spinnerTextStyle}
                />
            <FlatList 
                stickyHeaderIndices={[0]}
                ListHeaderComponent={renderHeader}
                data={nowPlayingList}
                renderItem={({item}) =>
                <TouchableOpacity  style={styles.listItemContainer} onPress={() => navigation.navigate('MovieDetails',{movieDetails: item})}>
                    <View style={styles.listSubView}>
                        <Image style={styles.listItemImage} source={{uri: posterURL+item.poster_path, cache: 'force-cache'}}/>
                        <View style={styles.listTextContainer}>
                            <Text style={styles.movieTitleText}>{item.original_title}</Text>
                            <Text style={styles.movieOverViewText} numberOfLines={4} ellipsizeMode='tail'>{item.overview}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                }
                keyExtractor={item => item.id.toString()}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        position: 'absolute',
        alignItems:'center'
      },
    mainContainer: {
        marginTop: 0, 
        backgroundColor: '#F1B345',
        flex: 1
    },
    listItemContainer: {
        margin: 5, 
        marginTop: 10,
        width:'100%'
    },
    listSubView: {
        flexDirection: 'row', 
        marginLeft: 5
    },
    listItemImage: {
        width: 90, 
        height: 100, 
        resizeMode: 'cover'
    },
    listTextContainer: {
        flexDirection: 'column', 
        padding: 10, 
        paddingTop: 0, 
        width: '65%'
    },
    movieTitleText: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    movieOverViewText: {
        fontSize: 11, 
    }

});

export default NowPlayingScreen;