import React from "react";
import { View, Text } from "react-native";

export default function RiskFactorsCard({ riskReasons = [] }) {

  function getIcon(reason) {

    const text = reason.toLowerCase();

    if (text.includes("heat")) return "🔥";
    if (text.includes("flood")) return "🌊";
    if (text.includes("wind")) return "🌬";
    if (text.includes("storm")) return "⛈";
    if (text.includes("tornado")) return "🌪";
    if (text.includes("transport")) return "🚗";
    if (text.includes("children")) return "👨‍👩‍👧";
    if (text.includes("visitor")) return "🧭";
    if (text.includes("alert")) return "🚨";

    return "⚠️";
  }

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
          marginBottom: 10,
        }}
      >
        Why Am I At Risk?
      </Text>

      <Text
        style={{
          color: "#666",
          marginBottom: 15,
          lineHeight: 22,
        }}
      >
        These factors are contributing to your current risk level.
      </Text>

      {riskReasons.length === 0 ? (

        <Text
          style={{
            color: "#2A9D8F",
            fontSize: 16,
            lineHeight: 22,
          }}
        >
          ✅ No significant risk factors detected.
        </Text>

      ) : (

        riskReasons.map((reason, index) => (

          <View
            key={index}
            style={{
              flexDirection: "row",
              marginBottom: 14,
              alignItems: "flex-start",
            }}
          >

            <Text
              style={{
                fontSize: 20,
                marginRight: 10,
              }}
            >
              {getIcon(reason)}
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: 16,
                lineHeight: 24,
                color: "#333",
              }}
            >
              {reason}
            </Text>

          </View>

        ))

      )}

    </View>

  );

}
