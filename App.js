import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import AppNavigator from 
 './navigation/AppNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


import { Button } from 'react-native';



export default function App() {

 return (

  <NavigationContainer>

   <AppNavigator />

  </NavigationContainer>

 );

}
