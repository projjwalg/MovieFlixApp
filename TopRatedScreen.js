import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
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
  Dimensions
} from 'react-native';
import {baseURL, posterURL} from './common/common';

function TopRatedScreen ({navigation}) {
    const [searchText, setSearchText] = useState('');
    const [topRatedList, setTopRatedList] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        setisLoading(true);
        fetch(baseURL+'top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((res) => res.json())
            .then((response) => { 
                setTopRatedList(response.results);
                setisLoading(false);
            })
            .catch((err) => alert("Error loading data!"));
            setisLoading(false);
        })

        updateSearch = (searchText) => {
            setSearchText(searchText);
            
          };
    
    function renderHeader() {
        return (
            <SearchBar
            placeholder="Type Here"
            onChangeText={() => updateSearch}
            value={searchText}
          />
        );
      }

    return (
        <View style={styles.mainContainer}>
             <StatusBar
                    backgroundColor="#ebaf09"
                    barStyle="dark-content" />
            <FlatList
                stickyHeaderIndices={[0]}
                ListHeaderComponent={renderHeader}
                data={topRatedList}
                renderItem={({item}) =>
                <TouchableOpacity style={styles.listItemContainer} onPress={() => navigation.navigate('MovieDetails',{movieDetails: item})}>
                    <View style={styles.listSubView}>
                        <Image style={styles.listItemImage} source={{uri: posterURL+item.poster_path}}/>
                        <View style={styles.listTextContainer}>
                            <Text style={styles.movieTitleText}>{item.original_title}</Text>
                            <Text style={styles.movieOverViewText}>{item.overview}</Text>
                        </View>  
                   
                    </View>
                </TouchableOpacity>
                
                }
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 0, 
        backgroundColor: '#F1B345'
    },
    listItemContainer: {
        margin: 5, 
        marginTop: 10
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

export default TopRatedScreen;