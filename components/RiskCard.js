import React from "react";
import { View, Text } from "react-native";

export default function RiskCard({
  risk,
  riskScore,
  riskColor,
}) {

  return (

    <View
      style={{
        backgroundColor: riskColor,
        padding: 25,
        borderRadius: 15,
        marginBottom: 20,
        alignItems: "center",
        elevation: 2,
      }}
    >

      <Text
        style={{
          color: "white",
          fontSize: 16,
        }}
      >
        Current Risk
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 42,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {risk}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 26,
          fontWeight: "600",
          marginTop: 8,
        }}
      >
        {riskScore}/100
      </Text>

      <Text
        style={{
          color: "white",
          marginTop: 12,
          textAlign: "center",
          lineHeight: 22,
        }}
      >
        This score combines weather conditions,
        official alerts, and your personal situation.
      </Text>

    </View>

  );

}
