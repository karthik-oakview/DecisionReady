import React from "react";
import { View, Text } from "react-native";

export default function ForecastCard({
  hourlyForecast,
  demoMode = false,
}) {

  if (!hourlyForecast || hourlyForecast.length === 0) {
    return null;
  }

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
       {demoMode
        ? "🕒 Simulated Weather Forecast"
        : "🕒 Next 24 Hours Forecast"}

      </Text>

      {hourlyForecast.slice(0, 8).map((hour, index) => {

        const rawTime = String(hour.time).padStart(4, "0");

        const formattedTime =
          rawTime === "0000"
            ? "Now"
            : `${rawTime.substring(0, 2)}:${rawTime.substring(2)}`;

        return (

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
                marginBottom: 6,
              }}
            >
              {formattedTime}
            </Text>

            <Text>
              🌡 Temperature: {hour.tempF}°F
            </Text>

            <Text>
              🌬 Wind: {hour.windspeedMiles} mph
            </Text>

            <Text>
              💧 Rain Chance: {hour.chanceofrain}%
            </Text>

            <Text>
              ☁ {hour.weatherDesc?.[0]?.value || "Unknown"}
            </Text>

          </View>

        );

      })}

    </View>

  );

}
