import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CurrentSituationCard({
  primaryThreat,
  threatReason,
  decisionLevel,
  decisionMessage,
  personalFactors = [],
}) {

  const getDecisionStyle = () => {
    switch (decisionLevel) {
      case "UNKNOWN":
        return {
          icon: "help-circle-outline",
          color: "#667085",
          background: "#EAECF0",
        };

      case "IMMEDIATE ACTION":
        return {
          icon: "alert-octagon",
          color: "#B42318",
          background: "#FEE4E2",
        };

      case "ACT":
        return {
          icon: "alert",
          color: "#C2410C",
          background: "#FFEDD5",
        };

      case "PREPARE":
        return {
          icon: "weather-cloudy-alert",
          color: "#B54708",
          background: "#FEF0C7",
        };

      default:
        return {
          icon: "shield-check",
          color: "#027A48",
          background: "#D1FADF",
        };
    }
  };


  const getPersonalIcon = (factor) => {

    const text = factor.toLowerCase();

    if (
      text.includes("vehicle") ||
      text.includes("transport")
    ) {
      return "car-off";
    }

    if (text.includes("children")) {
      return "account-group";
    }

    if (
      text.includes("visitor") ||
      text.includes("unfamiliar")
    ) {
      return "map-marker-account";
    }

    return "information-outline";
  };


  const decisionStyle = getDecisionStyle();

  const noActiveHazard =
  primaryThreat === "No Active Weather" &&
  decisionLevel !== "UNKNOWN";


  return (

    <View style={styles.card}>

      {/* THREAT */}

      <View style={styles.threatHeader}>

        <MaterialCommunityIcons
          name={
            noActiveHazard
              ? "weather-partly-cloudy"
              : "weather-lightning"
          }
          size={26}
          color={
            noActiveHazard
              ? "#027A48"
              : decisionStyle.color
          }
        />

        <Text style={styles.sectionLabel}>
          CURRENT SITUATION
        </Text>

      </View>


      <Text
        style={[
          styles.threatTitle,
          {
            color: noActiveHazard
              ? "#027A48"
              : "#101828",
          },
        ]}
      >
        {noActiveHazard
          ? "No significant hazard detected"
          : primaryThreat}
      </Text>


      <Text style={styles.description}>
        {threatReason}
      </Text>


      {/* DECISION */}

      <View
        style={[
          styles.decisionBox,
          {
            backgroundColor:
              decisionStyle.background,
          },
        ]}
      >

        <View style={styles.decisionHeader}>

          <MaterialCommunityIcons
            name={decisionStyle.icon}
            size={26}
            color={decisionStyle.color}
          />

          <View style={styles.decisionText}>

            <Text style={styles.responseLabel}>
              RECOMMENDED RESPONSE
            </Text>

            <Text
              style={[
                styles.decisionLevel,
                {
                  color:
                    decisionStyle.color,
                },
              ]}
            >
              {decisionLevel}
            </Text>

          </View>

        </View>


        <Text style={styles.decisionMessage}>
          {decisionMessage}
        </Text>

      </View>


      {/* PERSONAL FACTORS */}

      {personalFactors.length > 0 && (

        <View style={styles.personalSection}>

          <Text style={styles.personalTitle}>
            YOUR SITUATION
          </Text>

          {personalFactors.map(
            (factor, index) => (

              <View
                key={index}
                style={styles.personalRow}
              >

                <MaterialCommunityIcons
                  name={getPersonalIcon(factor)}
                  size={20}
                  color="#475467"
                />

                <Text style={styles.personalText}>
                  {factor}
                </Text>

              </View>

            )
          )}


          <Text style={styles.personalNote}>
            These factors are considered in your
            preparedness recommendations, not in
            the weather hazard itself.
          </Text>

        </View>

      )}

    </View>

  );

}


const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },

  threatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionLabel: {
    marginLeft: 9,
    fontSize: 12,
    fontWeight: "700",
    color: "#667085",
    letterSpacing: 0.8,
  },

  threatTitle: {
    fontSize: 23,
    fontWeight: "800",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475467",
  },


  // Decision box

  decisionBox: {
    marginTop: 18,
    borderRadius: 14,
    padding: 15,
  },

  decisionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  decisionText: {
    marginLeft: 10,
  },

  responseLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#667085",
    letterSpacing: 0.7,
  },

  decisionLevel: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 1,
  },

  decisionMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: "#344054",
    marginTop: 10,
  },


  // Personal situation

  personalSection: {
    borderTopWidth: 1,
    borderTopColor: "#EAECF0",
    marginTop: 18,
    paddingTop: 16,
  },

  personalTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#667085",
    letterSpacing: 0.7,
    marginBottom: 10,
  },

  personalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  personalText: {
    marginLeft: 9,
    fontSize: 14,
    color: "#344054",
    flex: 1,
  },

  personalNote: {
    fontSize: 12,
    lineHeight: 17,
    color: "#667085",
    marginTop: 5,
  },

});