import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function EmergencyKitScreen({ route }) {

  const {
    disasterType,
    noCar,
    kids,
    visitor,
  } = route.params;

  let checklist = [
    "Water (1 gallon per person)",
    "Non-perishable food",
    "Flashlight",
    "Extra batteries",
    "Phone charger",
    "First Aid Kit",
    "Prescription medications",
    "Important documents"
  ];

  if (kids) {
    checklist.push(
      "Baby food / snacks",
      "Diapers",
      "Comfort toy",
      "Extra clothing"
    );
  }

  if (visitor) {
    checklist.push(
      "Hotel information",
      "Paper map",
      "Local emergency contacts"
    );
  }

  if (noCar) {
    checklist.push(
      "Nearby shelter addresses",
      "Public transportation plan"
    );
  }

  if (disasterType === "Hurricane") {
    checklist.push(
      "Battery powered radio",
      "Fuel if available",
      "Cash"
    );
  }

  if (disasterType === "Flood") {
    checklist.push(
      "Waterproof bags",
      "Rubber boots"
    );
  }

  if (disasterType === "Heat Emergency") {
    checklist.push(
      "Extra drinking water",
      "Cooling towels",
      "Electrolytes"
    );
  }

  if (disasterType === "Wildfire") {
    checklist.push(
      "N95 masks",
      "Safety goggles"
    );
  }

  return (
    <ScrollView
      style={{
        flex:1,
        backgroundColor:"#F4F6F8"
      }}
      contentContainerStyle={{
        padding:20
      }}
    >

      <Text
        style={{
          fontSize:28,
          fontWeight:"bold",
          marginTop:50,
          marginBottom:20
        }}
      >
        Emergency Kit
      </Text>

      <Text
        style={{
          marginBottom:25,
          color:"#666"
        }}
      >
        Personalized supplies based on your situation.
      </Text>

      {checklist.map((item,index)=>(

        <View
          key={index}
          style={{
            backgroundColor:"white",
            padding:18,
            borderRadius:12,
            marginBottom:12
          }}
        >

          <Text
            style={{
              fontSize:17
            }}
          >
            ✅ {item}
          </Text>

        </View>

      ))}

      <TouchableOpacity

        style={{
          backgroundColor:"#0B1F3A",
          padding:18,
          borderRadius:15,
          alignItems:"center",
          marginTop:25,
          marginBottom:40
        }}

        onPress={()=>{
          alert("Stay safe and review your kit regularly.");
        }}

      >

        <Text
          style={{
            color:"white",
            fontWeight:"bold",
            fontSize:18
          }}
        >
          Finished
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );

}