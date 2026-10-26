import React from "react";
import { View, Text } from "react-native";

export default function LocationCard({
  location,
  latitude,
  longitude,
}) {
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
        📍 Live Location
      </Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        {location}
      </Text>

      <Text
        style={{
          color: "#666",
          lineHeight: 22,
        }}
      >
        {latitude && longitude
          ? `Coordinates: ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`
          : "Using manually entered location"}
      </Text>
    </View>
  );
}
