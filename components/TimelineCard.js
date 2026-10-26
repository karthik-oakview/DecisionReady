import React from "react";
import { View, Text } from "react-native";

export default function TimelineCard({
  decisionTimeline,
}) {

  if (!decisionTimeline) return null;

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
        ⏱ AI Decision Timeline
      </Text>

      <Text
        style={{
          color: "#666",
          marginBottom: 15,
          lineHeight: 22,
        }}
      >
        Recommended actions based on how conditions may change over the next several hours.
      </Text>

      <Text
        style={{
          fontSize: 16,
          lineHeight: 26,
          color: "#333",
        }}
      >
        {decisionTimeline}
      </Text>

    </View>

  );

}