/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NowPlaying from './screens/NowPlayingScreen';
import TopRated from './screens/TopRatedScreen';
import MovieDeTails from './screens/MovieDetailsScreen';


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return(
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="AppTabBar"
  >
    <Stack.Screen
      name="MovieDetails"
      component={MovieDeTails}
      options={{ headerStyle: {
        backgroundColor: '#EBB458'
     } }}
    />
    <Stack.Screen
      name="AppTabBar"
      component={AppTabBar}
      options={{title: '', headerShown: false}}
    />
  </Stack.Navigator>
  </NavigationContainer>
  );
}

 function AppTabBar() {
  return (
      <Tabs.Navigator
      tabBarOptions={{
        style: {backgroundColor: "#F1BA5E", borderWidth: 0.5, borderTopWidth:0.5, borderTopColor: "#A9A9A9", borderColor: "#A9A9A9", shadowColor: "#808080", opacity: 0.95},
      }}>
        <Tabs.Screen name="Now Playing" component={NowPlaying} options={{
          tabBarIcon: (props) => <Icon size={36} name="movie-open-outline" color={props.color}/>
        }}/>
        <Tabs.Screen name="Top Rated" component={TopRated} options={{
          tabBarIcon: (props) => <Icon size={36} name="star-outline" color={props.color}/>
        }}/>
      </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  
  
 
});


