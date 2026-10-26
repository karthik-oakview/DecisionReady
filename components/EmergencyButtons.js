import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

export default function EmergencyButtons({

  navigation,
  disasterType,
  noCar,
  kids,
  visitor,
  location,
  risk,
  latitude,
  longitude,
  alerts,
demoMode = false,
demoScenario = null,
}) {

  return (

    <View
      style={{
        marginTop: 10,
      }}
    >

      <TouchableOpacity

        style={{
          backgroundColor: "#0B1F3A",
          padding: 18,
          borderRadius: 15,
          alignItems: "center",
          marginBottom: 18,
          elevation: 2,
        }}

        onPress={() => {

         navigation.navigate("EmergencyKit", {
              disasterType,
              noCar,
              kids,
              visitor,
              demoMode,
              demoScenario,
            });

        }}

      >

        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          🧰 Build My Emergency Kit
        </Text>

      </TouchableOpacity>
      <TouchableOpacity
  style={{
    backgroundColor: "#2A9D8F",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  }}
  onPress={() =>
          navigation.navigate("EmergencyMap", {
      location,
      latitude,
      longitude,
      risk,
      alerts: demoMode ? [] : alerts,
      disasterType,
      noCar,
      kids,
      visitor,
      demoMode,
      demoScenario,
    })

  }
>
  <Text
    style={{
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    }}
  >
    🗺 Emergency Map
  </Text>
</TouchableOpacity>

      <TouchableOpacity

        style={{
          backgroundColor: "#D62828",
          padding: 18,
          borderRadius: 15,
          alignItems: "center",
          marginBottom: 40,
          elevation: 2,
        }}

        onPress={() => {
        navigation.navigate("Emergency", {
          location,
          risk,
          disasterType,
          latitude,
          longitude,
          alerts: demoMode ? [] : alerts,
          demoMode,
          demoScenario,
        });

        }}

      >

        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          🚨 Enter Emergency Mode
        </Text>

      </TouchableOpacity>

    </View>

  );

}
