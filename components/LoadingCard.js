import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function LoadingCard() {
  return (
    <View
      style={{
        backgroundColor: '#0B1F3A',
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        size="large"
        color="white"
      />

      <Text
        style={{
          color: 'white',
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 15,
        }}
      >
        AI Analyzing Situation...
      </Text>

      <Text
        style={{
          color: 'white',
          marginTop: 10,
        }}
      >
        Checking weather...
      </Text>

      <Text style={{ color: 'white' }}>
        Evaluating local hazards...
      </Text>

      <Text style={{ color: 'white' }}>
        Building emergency plan...
      </Text>
    </View>
  );
}