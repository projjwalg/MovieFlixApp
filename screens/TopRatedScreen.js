import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
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
  Dimensions,
  Animated,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {baseURL, posterURL, defaultBackgroundColor} from './common/common';
import HiddenItemWithActions from './components/hiddenItemsComponent';

function TopRatedScreen ({navigation}) {
    const [searchText, setSearchText] = useState('');
    const [topRatedList, setTopRatedList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [tempData, setTempData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        setisLoading(true);
        fetch(baseURL+'top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((res) => res.json())
            .then((response) => { 
                response.results.forEach(item => item['key'] = item.id);
                setTopRatedList(response.results);
                setTempData(response.results);
                setisLoading(false);
            })
            .catch((err) => alert("Error loading data!"));
        },[])

        updateSearch = (searchText) => {
        
            if (searchText) {
                const newData = tempData.filter(
                function (item) {
                    const itemData = item.original_title
                        ? item.original_title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = searchText.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
                );
                setTopRatedList(newData);
                setSearchText(searchText);
            } else {
                setTopRatedList(tempData);
                setSearchText(searchText);
            }
        }
        
        fetchTopRated = () => {
            fetch(baseURL+'top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((res) => res.json())
            .then((response) => { 
                response.results.forEach(item => item['key'] = item.id);
                setTopRatedList(response.results);
                setTempData(response.results);
                setRefreshing(false);
            })
            .catch((err) => alert("Error Loading Data"));
          }

        handleRefresh = () => {
            setRefreshing(true);
            fetchTopRated();
          }

          const onRowDidOpen = rowKey => {
            // console.log('This row opened', rowKey);
          };
          

       

          const renderHiddenItem = (data, rowMap) => {
            const rowActionAnimatedValue = new Animated.Value(75);
            const rowHeightAnimatedValue = new Animated.Value(60);
            return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, String(data.item.key))}
            />
            );
        };

        const closeRow = (rowMap, rowKey) => {
            if (rowMap[rowKey]) {
              rowMap[rowKey].closeRow();
            }
          };
          const deleteRow = (rowMap, rowKey) => {
              closeRow(rowMap, rowKey);
              const newData = [...topRatedList];
              const prevIndex = topRatedList.findIndex(item => item.key.toString() === rowKey.toString());
              newData.splice(prevIndex, 1);
              setTopRatedList(newData);
            };

    return (
        <View style={styles.mainContainer}>
            <ActivityIndicator size="large" color="#f57b02" animating={isLoading} key={isLoading ? 'loading' : 'not-loading'} style={isLoading? (styles.loading):(styles.loadingZ)}/>
              <SearchBar
        placeholder="Type Here"
        onChangeText={updateSearch}
        value={searchText}/>
            <SwipeListView
                data={topRatedList}
                renderItem={({item}) =>
                <TouchableHighlight underlayColor={"#EB984E"} style={styles.listItemContainer} onPress={() => navigation.navigate('MovieDetails',{movieDetails: item})}>
                    <View style={styles.listSubView}>
                        <Image style={styles.listItemImage} source={{uri: posterURL+item.poster_path}}/>
                        <View style={styles.listTextContainer}>
                            <Text style={styles.movieTitleText}>{item.original_title}</Text>
                            <Text style={styles.movieOverViewText} numberOfLines={4} ellipsizeMode='tail'>{item.overview}</Text>
                        </View>  
                   
                    </View>
                </TouchableHighlight>
                
                }
                keyExtractor={(item, index) => index.toString()}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-120}
                disableRightSwipe
                onRowDidOpen={onRowDidOpen}
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 0, 
        backgroundColor: defaultBackgroundColor,
        flex: 1
    },
    listItemContainer: {
        margin: 5, 
        marginTop: 10,
        width:'100%',
        backgroundColor: defaultBackgroundColor
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
        width: '65%',
        
    },
    movieTitleText: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    movieOverViewText: {
        fontSize: 11, 
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#E63A15',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        margin: 5,
        marginVertical:15,
        marginRight: 10,
        borderRadius: 5,
        height: "100%",
        color: "#FFFFFF"
      },
      loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
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

});

export default TopRatedScreen;