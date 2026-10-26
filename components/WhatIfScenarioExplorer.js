
import React from "react";
import { View, Text, Switch } from "react-native";

export default function WhatIfScenarioExplorer({
  noCar,
  kids,
  visitor,
  onNoCarChange,
  onKidsChange,
  onVisitorChange,
}) {
  const options = [
    {
      label: "No Vehicle Available",
      description: "How would my plan change without transportation?",
      value: noCar,
      onChange: onNoCarChange,
    },
    {
      label: "Children Present",
      description: "What if children were with me?",
      value: kids,
      onChange: onKidsChange,
    },
    {
      label: "Visitor to the Area",
      description: "What if I were unfamiliar with this location?",
      value: visitor,
      onChange: onVisitorChange,
    },
  ];

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          fontWeight: "bold",
          color: "#0B1F3A",
          marginBottom: 6,
        }}
      >
        What If My Situation Changes?
      </Text>

      <Text
        style={{
          fontSize: 13,
          color: "#667085",
          marginBottom: 18,
          lineHeight: 19,
        }}
      >
        Explore how your emergency action plan adapts to different personal circumstances.
      </Text>

      {options.map((option, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            borderBottomWidth: index === options.length - 1 ? 0 : 1,
            borderBottomColor: "#ECEFF3",
          }}
        >
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#0B1F3A",
              }}
            >
              {option.label}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: "#667085",
                marginTop: 4,
                lineHeight: 17,
              }}
            >
              {option.description}
            </Text>
          </View>

          <Switch
            value={option.value}
            onValueChange={option.onChange}
            trackColor={{
              false: "#D0D5DD",
              true: "#A5D6D0",
            }}
            thumbColor={option.value ? "#2A9D8F" : "#F4F4F4"}
          />
        </View>
      ))}
    </View>
  );
}
