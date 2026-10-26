
import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AISummaryCard({
  aiGuidance,
  confidence,
}) {

  // -----------------------------------------
  // PARSE AI RESPONSE
  // -----------------------------------------

  function parseGuidance(text) {

    const result = {
      situation: "",
      priority: "",
      watchFor: "",
    };

    if (!text) {
      return result;
    }

    const cleaned = text
      .replace(/\r/g, "")
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/\*\*/g, "")
      .trim();

    const sections = cleaned.split(
      /(?:^|\n)\s*(?:SITUATION(?: SUMMARY)?|PRIORITY|BIGGEST PRIORITY|WATCH FOR|WHAT COULD CHANGE|WHY THIS MATTERS)\s*:/gim
    );

    const headings = [
      ...cleaned.matchAll(
        /(?:^|\n)\s*(SITUATION(?: SUMMARY)?|PRIORITY|BIGGEST PRIORITY|WATCH FOR|WHAT COULD CHANGE|WHY THIS MATTERS)\s*:/gim
      ),
    ];

    if (headings.length === 0) {

      result.situation = cleaned;

      return result;
    }

    headings.forEach((match, index) => {

      const heading =
        match[1].toUpperCase();

      const content =
        sections[index + 1]?.trim() || "";

      if (heading.startsWith("SITUATION")) {

        result.situation = content;

      } else if (
        heading === "PRIORITY" ||
        heading === "BIGGEST PRIORITY"
      ) {

        result.priority = content;

      } else if (
        heading === "WATCH FOR" ||
        heading === "WHAT COULD CHANGE"
      ) {

        result.watchFor = content;

      }

    });

    return result;
  }


  const guidance = parseGuidance(aiGuidance);


  // -----------------------------------------
  // REUSABLE SECTION
  // -----------------------------------------

  function GuidanceSection({
    icon,
    title,
    content,
    color,
  }) {

    if (!content) {
      return null;
    }

    return (

      <View style={styles.section}>

        <View style={styles.sectionHeader}>

          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={color}
          />

          <Text style={styles.sectionTitle}>
            {title}
          </Text>

        </View>

        <Text style={styles.sectionContent}>
          {content}
        </Text>

      </View>

    );

  }


  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (

    <View style={styles.card}>

      <Text style={styles.title}>
        🤖 DecisionReady AI Coach
      </Text>

      <Text style={styles.subtitle}>
        Guidance based on available conditions
        and your personal circumstances.
      </Text>


      {!aiGuidance ? (

        <Text style={styles.loading}>
          Generating personalized guidance...
        </Text>

      ) : (

        <View>

          <GuidanceSection
            icon="information-outline"
            title="SITUATION"
            content={guidance.situation}
            color="#2563EB"
          />

          <GuidanceSection
            icon="check-circle-outline"
            title="YOUR PRIORITY"
            content={guidance.priority}
            color="#059669"
          />

          <GuidanceSection
            icon="eye-outline"
            title="WATCH FOR"
            content={guidance.watchFor}
            color="#D97706"
          />

        </View>

      )}

    </View>

  );

}


const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 13,
    color: "#667085",
    lineHeight: 19,
    marginBottom: 17,
  },

  loading: {
    fontSize: 14,
    color: "#667085",
    fontStyle: "italic",
  },

  section: {
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  sectionTitle: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
    color: "#344054",
  },

  sectionContent: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475467",
  },

});
