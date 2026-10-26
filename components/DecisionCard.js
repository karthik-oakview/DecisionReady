import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DecisionCard({
  decisionLevel,
  decisionMessage,
}) {

  const getDecisionStyle = () => {

    switch (decisionLevel) {

      case "IMMEDIATE ACTION":
        return {
          icon: "alert-octagon",
          color: "#B42318",
          background: "#FEE4E2",
          label: "IMMEDIATE ACTION",
        };

      case "ACT":
        return {
          icon: "alert",
          color: "#C2410C",
          background: "#FFEDD5",
          label: "ACT",
        };

      case "PREPARE":
        return {
          icon: "weather-cloudy-alert",
          color: "#B54708",
          background: "#FEF0C7",
          label: "PREPARE",
        };

      default:
        return {
          icon: "shield-check",
          color: "#027A48",
          background: "#D1FADF",
          label: "MONITOR",
        };
    }

  };


  const style = getDecisionStyle();


  return (

    <View
      style={[
        styles.card,
        {
          backgroundColor: style.background,
          borderColor: style.color,
        },
      ]}
    >

      <View style={styles.header}>

        <MaterialCommunityIcons
          name={style.icon}
          size={30}
          color={style.color}
        />

        <View style={styles.headerText}>

          <Text style={styles.smallTitle}>
            RECOMMENDED RESPONSE
          </Text>

          <Text
            style={[
              styles.level,
              { color: style.color },
            ]}
          >
            {style.label}
          </Text>

        </View>

      </View>


      <Text style={styles.message}>
        {decisionMessage}
      </Text>

    </View>

  );

}


const styles = StyleSheet.create({

  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    marginLeft: 12,
    flex: 1,
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#667085",
    letterSpacing: 0.8,
  },

  level: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },

  message: {
    fontSize: 15,
    lineHeight: 21,
    color: "#344054",
    marginTop: 12,
  },

});