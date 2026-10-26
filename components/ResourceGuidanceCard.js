
import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResourceGuidanceCard({
  disasterType,
  noCar,
  kids,
  visitor,
  demoMode = false,
}) {
  const type = String(disasterType || "").toLowerCase();

  const recommendations = [];

  if (type.includes("flood")) {
    recommendations.push({
      icon: "alert-circle-outline",
      title: "Flood Safety Information",
      message:
        "Check official flood warnings and road closure information. " +
        "Do not travel through flooded roads or walkways.",
    });

    recommendations.push({
      icon: "home-outline",
      title: "Shelter Information",
      message:
        "If officials advise relocation, check which emergency shelters " +
        "are officially activated. A mapped shelter is not necessarily open.",
    });
  } else if (type.includes("hurricane")) {
    recommendations.push({
      icon: "weather-hurricane",
      title: "Hurricane Evacuation Information",
      message:
        "Review official evacuation instructions and designated routes. " +
        "Do not assume the closest facility is an evacuation destination.",
    });

    recommendations.push({
      icon: "home-outline",
      title: "Emergency Shelter Information",
      message:
        "Confirm shelter activation, accessibility, and availability " +
        "through official emergency management sources.",
    });
  } else if (type.includes("tornado")) {
    recommendations.push({
      icon: "home-alert-outline",
      title: "Immediate Shelter Guidance",
      message:
        "During a tornado warning, seek appropriate shelter where you are. " +
        "Do not travel to a mapped facility while the threat is active.",
    });
  } else {
    recommendations.push({
      icon: "information-outline",
      title: "Local Emergency Information",
      message:
        "Check official local emergency guidance before deciding " +
        "whether travel or relocation is necessary.",
    });
  }

  if (noCar) {
    recommendations.push({
      icon: "bus",
      title: "Transportation Assistance",
      message:
        "Because you have no vehicle, check official emergency " +
        "transportation assistance options if relocation becomes necessary. " +
        "Nearby map markers do not confirm transportation availability.",
    });
  }

  if (kids) {
    recommendations.push({
      icon: "account-child-outline",
      title: "Family and Child Needs",
      message:
        "When reviewing shelter options, confirm family accommodation " +
        "requirements and prepare essential items for children.",
    });
  }

  if (visitor) {
    recommendations.push({
      icon: "map-marker-question-outline",
      title: "Visitor Assistance",
      message:
        "Review local emergency management instructions and contact " +
        "your accommodation provider for applicable emergency procedures.",
    });
  }

  return (
    <View
      style={{
        backgroundColor: "#F4FAF9",
        borderRadius: 14,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#D4EDE8",
      }}
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          color: "#0B1F3A",
          marginBottom: 5,
        }}
      >
        Recommended Resources for Your Situation
      </Text>

      <Text
        style={{
          fontSize: 12,
          color: "#667085",
          lineHeight: 18,
          marginBottom: 12,
        }}
      >
        {demoMode
          ? "Practice guidance for this fictional emergency."
          : "Resource guidance based on your selected emergency and circumstances."}
      </Text>

      {recommendations.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            borderTopWidth: index === 0 ? 0 : 1,
            borderTopColor: "#D4EDE8",
          }}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={23}
            color="#147D70"
            style={{ marginRight: 10, marginTop: 2 }}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#0B1F3A",
                marginBottom: 4,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                color: "#475467",
              }}
            >
              {item.message}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
