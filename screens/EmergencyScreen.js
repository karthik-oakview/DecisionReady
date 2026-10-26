import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';

export default function EmergencyScreen({
  route,
  navigation,
}) {
  const {
    location,
    risk,
    disasterType,
    latitude,
    longitude,
    alerts = [],
  } = route.params || {};

  function getEmergencyAdvice(disasterType, risk) {
    if (risk === 'HIGH') {
      switch (disasterType) {
        case 'Flood':
          return [
            'Move to higher ground immediately.',
            'Never drive through flood water.',
            'Monitor evacuation notices.',
            'Prepare for power outages.',
          ];

        case 'Hurricane':
          return [
            'Complete evacuation if instructed.',
            'Charge all electronic devices.',
            'Stay indoors away from windows.',
            'Prepare emergency supplies.',
          ];

        case 'Tornado':
          return [
            'Go to the lowest floor.',
            'Stay away from windows.',
            'Protect your head and neck.',
            'Remain sheltered until officials say it is safe.',
          ];

        case 'Thunderstorm':
          return [
            'Stay indoors.',
            'Avoid electrical appliances.',
            'Prepare for possible power outages.',
            'Monitor weather alerts.',
          ];

        case 'Heat Emergency':
          return [
            'Stay indoors if possible.',
            'Drink plenty of water.',
            'Avoid strenuous activity.',
            'Check on elderly family members.',
          ];

        case 'Wildfire':
          return [
            'Prepare for evacuation.',
            'Close windows and doors.',
            'Monitor local officials.',
            'Avoid smoke exposure.',
          ];

        default:
          return [
            'Follow local officials.',
            'Stay alert.',
            'Continue monitoring weather updates.',
          ];
      }
    }

    if (risk === 'MEDIUM') {
      return [
        'Stay informed.',
        'Prepare emergency supplies.',
        'Review your emergency plan.',
      ];
    }

    return [
      'Continue monitoring conditions.',
      'Keep emergency supplies ready.',
      'Stay aware of weather updates.',
    ];
  }

  const aiAdvice = getEmergencyAdvice(
    disasterType,
    risk
  );

  const checklist = [
    'Phone',
    'Phone Charger',
    'Wallet / ID',
    'Medication',
    'Water',
    'Flashlight',
    'First Aid Kit',
    'Important Documents',
  ];

  const shareLocation = async () => {
    try {
      await Share.share({
        message:
          `Emergency!\n\n` +
          `Location: ${location}\n\n` +
          `Coordinates:\n` +
          `${latitude ?? 'Unknown'}, ${longitude ?? 'Unknown'}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#F4F6F8',
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 50,
      }}
    >

      {/* Header */}

      <View
        style={{
          backgroundColor: '#D62828',
          padding: 25,
          borderRadius: 18,
          alignItems: 'center',
          marginTop: 30,
          marginBottom: 25,
        }}
      >

        <Text style={{ fontSize: 50 }}>
          🚨
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: 10,
          }}
        >
          Emergency Mode
        </Text>

        <Text
          style={{
            color: 'white',
            marginTop: 10,
            textAlign: 'center',
            fontSize: 16,
          }}
        >
          If you are in immediate danger,
          call 911 immediately.
        </Text>

      </View>

      {/* Current Situation */}

      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 12,
          }}
        >
          Current Situation
        </Text>

        <Text style={{ marginBottom: 6 }}>
          📍 Location: {location}
        </Text>

        <Text style={{ marginBottom: 6 }}>
          ⚠️ Hazard: {disasterType}
        </Text>

        <Text>
          🚦 Risk Level: {risk}
        </Text>

      </View>

      {/* Call 911 */}

      <TouchableOpacity
        style={{
          backgroundColor: '#D62828',
          padding: 18,
          borderRadius: 15,
          alignItems: 'center',
          marginBottom: 15,
        }}
        onPress={() =>
          Linking.openURL('tel:911')
        }
      >

        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          }}
        >
          📞 Call 911
        </Text>

      </TouchableOpacity>

      {/* Share Location */}

      <TouchableOpacity
        style={{
          backgroundColor: '#0B1F3A',
          padding: 18,
          borderRadius: 15,
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={shareLocation}
      >

        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          📍 Share My Location
        </Text>

      </TouchableOpacity>

      {/* AI Advice */}

      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 12,
          }}
        >
          🤖 AI Emergency Advice
        </Text>

        {aiAdvice.map((item, index) => (
          <Text
            key={index}
            style={{
              marginBottom: 8,
              lineHeight: 22,
            }}
          >
            • {item}
          </Text>
        ))}

      </View>

      {/* Active Alerts */}

      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 12,
          }}
        >
          ⚠️ Active Alerts
        </Text>

        {alerts.length === 0 ? (
          <Text>No active alerts.</Text>
        ) : (
          alerts.map((alert, index) => (
            <Text
              key={index}
              style={{
                marginBottom: 8,
              }}
            >
              🚨 {alert.properties.event}
            </Text>
          ))
        )}

      </View>

      {/* Checklist */}

      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 15,
          marginBottom: 25,
        }}
      >

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 12,
          }}
        >
          Emergency Checklist
        </Text>

        {checklist.map((item, index) => (
          <Text
            key={index}
            style={{
              marginBottom: 8,
            }}
          >
            ☐ {item}
          </Text>
        ))}

      </View>

      {/* Back */}

      <TouchableOpacity
        style={{
          backgroundColor: '#0B1F3A',
          padding: 18,
          borderRadius: 15,
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}
      >

        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          ← Back
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}
