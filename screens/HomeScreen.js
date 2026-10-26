

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0B1F3A',
        paddingHorizontal: 30,
        paddingTop: 80,
        paddingBottom: 40,
        alignItems: 'center',
      }}
    >
    <Image
  source={require('../assets/decisionimage.png')}
  style={{
    width: 110,
    height: 110,
    marginBottom: 20,
    borderRadius: 20,
    resizeMode: 'contain',
  }}
  />

      {/* App Title */}
      <Text
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
        }}
      >
        DecisionReady
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: '600',
          color: '#F4A261',
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        AI Emergency Coach
      </Text>

      {/* Description */}
      <Text
        style={{
          color: '#DCE6F2',
          fontSize: 17,
          textAlign: 'center',
          lineHeight: 26,
          marginTop: 25,
          marginBottom: 60,
        }}
      >
        Personalized emergency guidance for South Carolina using AI,
        live weather, and real-time emergency alerts.
      </Text>

      {/* Main Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#E63946',
          width: '100%',
          paddingVertical: 18,
          borderRadius: 16,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Input')}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Get Emergency Guidance
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text
        style={{
          color: '#AEBFD3',
          fontSize: 14,
          textAlign: 'center',
          position: 'absolute',
          bottom: 35,
        }}
      >
        Helping South Carolinians make safer decisions
      </Text>
    </View>
  );
}