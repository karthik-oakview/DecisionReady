import React from "react";
import { View, Text } from "react-native";

export default function ReadinessCard({
  risk,
  noCar = false,
  kids = false,
  visitor = false,
}) {
  const considerations = [];

  if (noCar) {
    considerations.push(
      "Plan how you would reach a safe location without a personal vehicle."
    );
  }

  if (kids) {
    considerations.push(
      "Include children in your emergency supplies and family communication plan."
    );
  }

  if (visitor) {
    considerations.push(
      "Identify local emergency information sources and safe routes."
    );
  }

  considerations.push(
    "Review your emergency supplies, communication plan, and official local guidance."
  );

  const status =
    risk === "UNKNOWN"
      ? "Assessment incomplete"
      : risk === "HIGH"
      ? "Review urgent preparedness needs"
      : risk === "MEDIUM"
      ? "Review preparedness needs"
      : "Review your emergency plan";

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
        🛡 Preparedness Considerations
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#0B1F3A",
          marginBottom: 12,
        }}
      >
        {status}
      </Text>

      {considerations.map((item, index) => (
        <Text
          key={index}
          style={{
            fontSize: 14,
            color: "#475467",
            lineHeight: 22,
            marginBottom: 9,
          }}
        >
          • {item}
        </Text>
      ))}

      <Text
        style={{
          color: "#667085",
          fontSize: 12,
          marginTop: 8,
          lineHeight: 18,
        }}
      >
        These suggestions are based on your selected circumstances.
        DecisionReady has not verified your supplies or emergency plan.
      </Text>
    </View>
  );
}