import React from "react";
import { View, Text } from "react-native";

export default function AlertsCard({ alerts = [] }) {

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
          marginBottom: 15,
        }}
      >
        🚨 Active Alerts Near You
      </Text>

      {alerts.length === 0 ? (

        <Text
          style={{
            color: "#2A9D8F",
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          ✅ No active National Weather Service alerts.
        </Text>

      ) : (

        alerts.slice(0, 3).map((alert, index) => (

          <View
            key={index}
            style={{
              marginBottom: 15,
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#ECECEC",
            }}
          >

            <Text
              style={{
                fontWeight: "bold",
                color: "#D62828",
                fontSize: 16,
              }}
            >
              {alert.properties?.event || "Weather Alert"}
            </Text>

            <Text
              style={{
                color: "#666",
                marginTop: 4,
                lineHeight: 22,
              }}
            >
              {alert.properties?.headline ||
                "Official weather alert issued."}
            </Text>

          </View>

        ))

      )}

    </View>

  );

}
