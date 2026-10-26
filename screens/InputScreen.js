import {
 classifyWeather,
 autoDetectWeatherType,
 detectWeatherRisk
}
from '../services/weatherservice';
import { getDemoScenario } from "../services/demoScenarios";
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
import LoadingCard from '../components/LoadingCard';

export default function InputScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [noCar, setNoCar] = useState(false);
  const [kids, setKids] = useState(false);
  const [visitor, setVisitor] = useState(false);
  const [disasterType, setDisasterType] = useState('');
  const [demoMode, setDemoMode] = useState(false);
  const [demoScenario, setDemoScenario] =   useState("greenvilleFlood");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] =
  useState(false);
  
  const getCurrentLocation = async () => {
  try {
    if (demoMode) {
     setLocation("Greenville, SC");
     setLatitude(34.8526);
     setLongitude(-82.3940);
    return;
    }
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Location access is required.'
      );
      return;
    }

    const currentLocation =
      await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High,});
    setLatitude(
      currentLocation.coords.latitude
    );

    setLongitude(
       currentLocation.coords.longitude
      );
    const address =
      await Location.reverseGeocodeAsync({
        latitude:
          currentLocation.coords.latitude,
        longitude:
          currentLocation.coords.longitude,
      });

    if (address.length > 0) {
     console.log(address[0]);

    setLocation(
      address[0].subregion ||
      address[0].city ||
       ''
);
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'Could not fetch location.'
    );
  }
};

 return (
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: '#F4F6F8',
    }}
    contentContainerStyle={{
      padding: 20,
      paddingBottom: 120,
    }}
    keyboardShouldPersistTaps="handled"
  >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginTop: 50,
          marginBottom: 10,
        }}
      >
        Check Your Safety
      </Text>

      <Text
        style={{
          color: '#666',
          marginBottom: 30,
        }}
      >
        Enter your location and situation.
      </Text>
      <View
  style={{
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  }}
>
  <Text style={{ fontSize: 17, fontWeight: "bold" }}>
    Demonstration Mode
  </Text>

  <Text
    style={{
      color: "#667085",
      marginTop: 6,
      marginBottom: 12,
    }}
  >
    Test fictional South Carolina emergency scenarios.
    No simulated warnings represent live conditions.
  </Text>

  <TouchableOpacity
    onPress={() => setDemoMode(!demoMode)}
    style={{
      backgroundColor: demoMode ? "#B45309" : "#0B1F3A",
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontWeight: "bold" }}>
      {demoMode ? "SIMULATION ON — Tap for Live Mode" : "Enable Demo Mode"}
    </Text>
  </TouchableOpacity>

  {demoMode && (
    <View style={{ marginTop: 14 }}>
      {[
        { id: "greenvilleFlood", title: "Greenville Flash Flood" },
        { id: "charlestonHurricane", title: "Charleston Hurricane" },
      ].map((scenario) => (
        <TouchableOpacity
          key={scenario.id}
          onPress={() => setDemoScenario(scenario.id)}
          style={{
            padding: 14,
            marginTop: 8,
            borderRadius: 10,
            backgroundColor:
              demoScenario === scenario.id ? "#FEF3C7" : "#F2F4F7",
            borderWidth: demoScenario === scenario.id ? 2 : 0,
            borderColor: "#B45309",
          }}
        >
          <Text style={{ fontWeight: "600" }}>
            {scenario.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )}
</View>

      {/* Location Input */}
      <Text
        style={{
          fontWeight: 'bold',
          marginBottom: 10,
        }}
      >
        Location
      </Text>

      <TextInput
            placeholder="City or ZIP code"
        value={location}
        onChangeText={setLocation}
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 12,
          fontSize: 16,
          marginBottom: 25,
        }}
      />
      <TouchableOpacity
  onPress={getCurrentLocation}
  style={{
    backgroundColor: '#0B1F3A',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: 'white',
      fontWeight: 'bold',
    }}
  >
    📍 Use My Location
  </Text>
</TouchableOpacity>

      {/* Situation Options */}
     
<Text
  style={{
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 18,
  }}
>
  Emergency Type
</Text>

<View
  style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  }}
>
  {[
    { name: 'Hurricane', emoji: '🌀' },
    { name: 'Tornado', emoji: '🌪️' },
    { name: 'Flood', emoji: '🌊' },
    { name: 'Heat Emergency', emoji: '🥵' },
    { name: 'Wildfire', emoji: '🔥' },
    { name: 'Chemical Spill', emoji: '☣️' },
    { name: 'Power Outage', emoji: '⚡' },
    { name: 'Medical Emergency', emoji: '🚑' },
    { name: 'Active Threat', emoji: '🚨' },
    { name: 'Car Breakdown', emoji: '🚗' },
  ].map((item) => (
    <TouchableOpacity
      key={item.name}
      onPress={() => setDisasterType(item.name)}
      style={{
        width: '48%',
        backgroundColor:
          disasterType === item.name ? '#E63946' : 'white',
        padding: 18,
        borderRadius: 14,
        marginBottom: 12,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
      <Text
        style={{
          marginTop: 8,
          color: disasterType === item.name ? 'white' : 'black',
          fontWeight: '600',
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  ))}


  <TouchableOpacity
  style={{
    backgroundColor: '#0B1F3A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 25,
  }}
 onPress={async () => {

  if (demoMode) {
    const scenario = getDemoScenario("greenvilleFlood");

    setLocation(scenario.location);
    setDisasterType("Flood");

    Alert.alert(
      "Weather detected — DEMO",
      "Detected: Flash Flooding\n\n" +
      "Current weather:\n" +
      scenario.weather.description + "\n\n" +
      "Simulated alerts: " + scenario.alerts.length + "\n\n" +
      "Flash Flood Warning (fictional)"
    );

    return;
  }

  // Existing Live Mode detection
  const result =
    await detectWeatherRisk(
      latitude,
      longitude,
      location
    );

  setDisasterType(result.detectedType);

  Alert.alert(
    "Weather detected",
    `Detected: ${result.detectedType}

Current weather:
${result.weatherDescription}

Active alerts:
${result.alertCount}`
  );

}}
>
  <Text
    style={{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    }}
  >
    📡 Detect Current Weather Risk
  </Text>
</TouchableOpacity>
</View>
      <Text style={{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
       }}>
        Your Situation
      </Text>

      <TouchableOpacity
        onPress={() => setNoCar(!noCar)}
        style={{
          backgroundColor: noCar ? '#E63946' : 'white',
          padding: 18,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: noCar ? 'white' : 'black',
            fontWeight: '600',
          }}
        >
          🚗 No Car
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setKids(!kids)}
        style={{
          backgroundColor: kids ? '#E63946' : 'white',
          padding: 18,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: kids ? 'white' : 'black',
            fontWeight: '600',
          }}
        >
          👨‍👩‍👧 Kids / Family
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setVisitor(!visitor)}
        style={{
          backgroundColor: visitor ? '#E63946' : 'white',
          padding: 18,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: visitor ? 'white' : 'black',
            fontWeight: '600',
          }}
        >
          🧳 Visitor
        </Text>
      </TouchableOpacity>

{/* Loading Card */}
{loading && <LoadingCard />}


{/* Analyze Risk Button */}
<TouchableOpacity
  style={{
    backgroundColor: '#E63946',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  }}
  onPress={() => {
  if (demoMode) {
  navigation.navigate("Result", {
    location: "Greenville, SC",
    disasterType: "Flood",
    noCar,
    kids,
    visitor,
    latitude: 34.8526,
    longitude: -82.3940,
    demoMode: true,
    demoScenario: "greenvilleFlood",
  });

  return;
}
  setLoading(true);

  setTimeout(async () => {

  let finalDisasterType =
    disasterType;

  if (!finalDisasterType) {

    finalDisasterType =
     await autoDetectWeatherType(
  latitude,
  longitude,
  location
);
  }

  setLoading(false);

  navigation.navigate("Result", {
  location,
  disasterType,
  noCar,
  kids,
  visitor,
  latitude,
  longitude,

  // Live Mode
  demoMode: false,
  demoScenario: null,
});

}, 2000);
}}
>
  <Text
    style={{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    }}
  >
    {loading
      ? 'Please wait...'
      : 'Analyze Risk'}
  </Text>
</TouchableOpacity>
    </ScrollView>
  );
}
