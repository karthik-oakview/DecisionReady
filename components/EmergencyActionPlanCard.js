
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function EmergencyActionPlanCard({
  disasterType,
  risk,
  noCar,
  kids,
  visitor,
  demoMode = false,
}) {
  const [completed, setCompleted] = useState([]);

  const type = String(disasterType || "").toLowerCase();

  const steps = [];
  const personalizedSteps = new Set();

  if (type.includes("flood")) {
    steps.push(
      "Check whether your current location is exposed to rising water.",
      "Avoid flooded roads, walkways, and low-lying areas.",
      "Follow applicable official flood warnings and protective instructions."
    );
  } else if (type.includes("hurricane")) {
    steps.push(
      "Check official hurricane warnings and local emergency instructions.",
      "Review your household emergency supplies and communication plan.",
      "Identify safe shelter options and follow any applicable evacuation instructions."
    );
  } else if (type.includes("tornado")) {
    steps.push(
      "Identify an interior room on the lowest floor, away from windows.",
      "Review official tornado warnings for your location.",
      "Keep essential supplies and a way to receive emergency updates nearby."
    );
  } else {
    steps.push(
      "Review the latest available emergency information.",
      "Identify the most important protective action for your situation.",
      "Prepare essential supplies and a way to receive updates."
    );
  }

  if (noCar) {
  const step =
    "Identify official transportation assistance options if relocation becomes necessary.";

  steps.push(step);
  personalizedSteps.add(step);
  }
  if (kids) {
  const step =
    "Prepare children's essential items and establish a family communication plan.";

  steps.push(step);
  personalizedSteps.add(step);
}

if (visitor) {
  const step =
    "Review local emergency guidance and your accommodation's emergency procedures.";

  steps.push(step);
  personalizedSteps.add(step);
}
  if (risk === "UNKNOWN") {
    steps.unshift(
      "Live conditions could not be fully verified. Check official alerts before making decisions."
    );
  }

  useEffect(() => {
    setCompleted([]);
  }, [disasterType, risk, noCar, kids, visitor, demoMode]);

  const toggleStep = (index) => {
    setCompleted((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const progress = steps.length
    ? Math.round((completed.length / steps.length) * 100)
    : 0;

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
          marginBottom: 5,
        }}
      >
        Your Emergency Action Plan
      </Text>

      <Text
        style={{
          color: "#667085",
          fontSize: 13,
          marginBottom: 15,
        }}
      >
        {demoMode
          ? "Practice these steps for the fictional emergency scenario."
          : "Review the steps relevant to your current assessment."}
      </Text>

      {steps.map((step, index) => {
        const isCompleted = completed.includes(index);
        const isPersonalized = personalizedSteps.has(step);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => toggleStep(index)}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 14,
              padding: isPersonalized ? 12 : 0,
              backgroundColor: isPersonalized
                ? "#EAF7F4"
                : "transparent",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                marginRight: 10,
              }}
            >
              {isCompleted ? "☑️" : "☐"}
            </Text>

            <View style={{ flex: 1 }}>
              {isPersonalized && (
                <Text
                  style={{
                    color: "#147D70",
                    fontSize: 10,
                    fontWeight: "bold",
                    marginBottom: 5,
                    letterSpacing: 0.7,
                  }}
                >
                  PERSONALIZED FOR YOUR SITUATION
                </Text>
              )}

              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 21,
                  color: isCompleted ? "#667085" : "#344054",
                  textDecorationLine: isCompleted
                    ? "line-through"
                    : "none",
                }}
              >
                {step}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      <View
        style={{
          height: 7,
          backgroundColor: "#E5E7EB",
          borderRadius: 10,
          marginTop: 5,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#2A9D8F",
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 12,
          color: "#667085",
          marginTop: 8,
        }}
      >
        {completed.length} of {steps.length} steps reviewed
      </Text>
    </View>
  );
}
