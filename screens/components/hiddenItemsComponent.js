 import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SwipeListView } from 'react-native-swipe-list-view';
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
  ActivityIndicator,
  TouchableHighlight,
  Animated,
} from 'react-native';

 const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        
        {!leftActionActivated && (
          <Animated.View
            style={[
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={styles.rowBack}
              onPress={onDelete}>
              <Animated.View
                style={[
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <Icon size={24} name={"trash-outline"} color="#FFFFFF"/>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  export default HiddenItemWithActions;

  const styles = StyleSheet.create({
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
  })