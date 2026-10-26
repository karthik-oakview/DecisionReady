import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { askDecisionReadyAI } from "../services/chatService";

export default function AIChatCard({
  location,
  disasterType,
  risk,
  riskScore,
  currentWeather,
  alerts = [],
  noCar,
  kids,
  visitor,
}) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {

    if (!question.trim()) return;

    try {

      setLoading(true);

      const response = await askDecisionReadyAI({

        question,

        location,

        disasterType,

        risk,

        riskScore,

        weather:
          currentWeather?.description || "Unknown",

        alerts: alerts.length,

        noCar,

        kids,

        visitor,

      });

      setAnswer(response);

    } catch (error) {

      console.log(error);

      setAnswer(
        "I'm unable to answer right now. Continue following official emergency guidance."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        marginTop: 20,
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
        🤖 Ask DecisionReady AI
      </Text>

      <Text
        style={{
          color: "#666",
          marginBottom: 15,
          lineHeight: 22,
        }}
      >
        Ask questions specific to your emergency situation.
      </Text>

      <TextInput
        placeholder="Example: Should I evacuate or shelter in place?"
        value={question}
        onChangeText={setQuestion}
        multiline
        style={{
          backgroundColor: "#F4F6F8",
          padding: 15,
          borderRadius: 12,
          minHeight: 80,
          marginBottom: 15,
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        onPress={askAI}
        disabled={loading}
        style={{
          backgroundColor: "#0B1F3A",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
      >

        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Ask DecisionReady
        </Text>

      </TouchableOpacity>

      {loading && (

        <ActivityIndicator
          size="large"
          style={{
            marginTop: 20,
          }}
        />

      )}

      {answer !== "" && (

        <View
          style={{
            marginTop: 20,
            backgroundColor: "#F4F6F8",
            padding: 15,
            borderRadius: 12,
          }}
        >

          <Text
            style={{
              fontWeight: "bold",
              color: "#0B1F3A",
              marginBottom: 10,
            }}
          >
            DecisionReady AI
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 26,
              color: "#333",
            }}
          >
            {answer}
          </Text>

        </View>

      )}

    </View>

  );

}