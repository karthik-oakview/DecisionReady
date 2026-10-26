// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import InputScreen from '../screens/InputScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import EmergencyKitScreen from '../screens/EmergencyKitScreen';
import EmergencyMapScreen from '../screens/EmergencyMapScreen';

export default function AppNavigator(){
 const Stack =
 createNativeStackNavigator();

 return (

  <Stack.Navigator>

   <Stack.Screen
    name="Home"
    component={HomeScreen}
   />

   <Stack.Screen
    name="Input"
    component={InputScreen}
   />

   <Stack.Screen
    name="Result"
    component={ResultScreen}
   />
   <Stack.Screen
    name="Emergency"
    component={EmergencyScreen}
/>
<Stack.Screen
    name="EmergencyKit"
    component={EmergencyKitScreen}
/>
<Stack.Screen
  name="EmergencyMap"
  component={EmergencyMapScreen}
  options={{
    title: "Emergency Map",
  }}
/>


  </Stack.Navigator>

 );
}