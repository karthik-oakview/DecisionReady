import React from "react";
import { View, Text } from "react-native";

export default function EmergencyPlanCard({
  personalPlan = [],
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
          marginBottom: 10,
        }}
      >
        📋 Your Emergency Plan
      </Text>

      <Text
        style={{
          color: "#666",
          marginBottom: 15,
          lineHeight: 22,
        }}
      >
        These recommendations are personalized for your current situation.
      </Text>

      {personalPlan.length === 0 ? (

        <Text
          style={{
            color: "#2A9D8F",
            fontSize: 16,
          }}
        >
          ✅ No additional preparation is recommended at this time.
        </Text>

      ) : (

                personalPlan.map((step, index) => (

          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >

            <Text
              style={{
                fontSize: 18,
                marginRight: 10,
              }}
            >
              ✅
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: 16,
                lineHeight: 24,
                color: "#333",
              }}
            >
              {step}
            </Text>

          </View>

        ))

      )}

    </View>

  );

}