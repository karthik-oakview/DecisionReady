import React from "react";
import { View, Text } from "react-native";

export default function ImpactAssessmentCard({
  primaryThreat,
  threatReason,
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
        Current Threat Assessment
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#D62828",
          marginBottom: 12,
        }}
      >
        {primaryThreat}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#555",
          lineHeight: 24,
        }}
      >
        {threatReason}
      </Text>
    </View>
  );
}
