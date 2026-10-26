import React from "react";
import { View, Text } from "react-native";

export default function WeatherCard({ currentWeather }) {

  if (!currentWeather) return null;

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 2,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#0B1F3A",
          marginBottom: 12,
        }}
      >
        🌤 Current Conditions
      </Text>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        {currentWeather.description}
      </Text>

      <Text
        style={{
          fontSize: 16,
          marginBottom: 8,
        }}
      >
        🌡 Temperature: {currentWeather.temp ?? "--"}°F
      </Text>

      <Text
        style={{
          fontSize: 16,
          marginBottom: 8,
        }}
      >
        💧 Humidity: {currentWeather.humidity ?? "--"}%
      </Text>

      <Text
        style={{
          fontSize: 16,
        }}
      >
        🌬 Wind Speed: {currentWeather.wind ?? "--"} mph
      </Text>

    </View>
  );
}
