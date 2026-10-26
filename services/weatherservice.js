import { Alert } from "react-native";
import { getDemoScenario } from "../services/demoScenarios";

export const classifyWeather = (alerts, weatherDescription) => {
  const weather = weatherDescription.toLowerCase();

  // Official weather alerts first
  const events = alerts.map(
    alert => alert.properties.event.toLowerCase()
  );

  if (events.some(e => e.includes("tornado")))
    return "Tornado";

  if (events.some(e => e.includes("flood")))
    return "Flood";

  if (events.some(e => e.includes("hurricane")))
    return "Hurricane";

  if (events.some(e => e.includes("heat")))
    return "Heat Emergency";

  if (events.some(e => e.includes("thunderstorm")))
    return "Thunderstorm";

  // Weather description fallback

  if (weather.includes("thunder"))
    return "Thunderstorm";

  if (weather.includes("heavy rain"))
    return "Flood";

  if (weather.includes("hurricane"))
    return "Hurricane";

  if (weather.includes("hot"))
    return "Heat Emergency";

  return "Low Risk";
};

export const autoDetectWeatherType = async (
  latitude,
  longitude,
  location
) => {
  try {
    const alertResponse = await fetch(
      `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`
    );

    const alertData = await alertResponse.json();

    const alerts = alertData.features || [];

    const weatherResponse = await fetch(
      `https://wttr.in/${encodeURIComponent(location)}?format=j1`
    );

    const weatherData = await weatherResponse.json();

    const weatherDescription =
      weatherData.current_condition[0]
        .weatherDesc[0]
        .value;

    return classifyWeather(
      alerts,
      weatherDescription
    );
  } catch (error) {
    console.log(error);

    return "Unknown";
  }
};

export const detectWeatherRisk = async (
  latitude,
  longitude,
  location
) => {
  try {
  if (demoMode) {
  const scenario = getDemoScenario("greenvilleFlood");

  setLocation(scenario.location);
  setDisasterType("Flood");

  Alert.alert(
    "Weather detected — DEMO",
    "Detected: Flash Flooding\n\n" +
    "Current weather:\n" +
    "Heavy rain and thunderstorms\n\n" +
    "Simulated alerts: 1\n\n" +
    "Flash Flood Warning (fictional)"
  );

  return;
}

    const alertResponse = await fetch(
      `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`
    );

    const alertData = await alertResponse.json();

    const alerts = alertData.features || [];

    const weatherResponse = await fetch(
      `https://wttr.in/${encodeURIComponent(location)}?format=j1`
    );

    const weatherData = await weatherResponse.json();

    const current =
      weatherData.current_condition[0];

    const weatherDescription =
      current.weatherDesc[0].value;

    const detectedType =
      classifyWeather(
        alerts,
        weatherDescription
      );

    return {
      detectedType,
      weatherDescription,
      alertCount: alerts.length,
      alerts
    };
  } catch (error) {
    console.log(error);

    return {
      detectedType: "UnKnown",
      weatherDescription: "Unknown",
      alertCount: 0,
      alerts: []
    };
  }
};
export async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(
      `https://wttr.in/${latitude},${longitude}?format=j1`
    );

    const data = await response.json();

    const current = data.current_condition[0];

    return {
      temp: Number(current.temp_F),
      humidity: Number(current.humidity),
      wind: Number(current.windspeedMiles),
      description: current.weatherDesc[0].value,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getHourlyForecast(latitude, longitude) {
  try {
    const response = await fetch(
      `https://wttr.in/${latitude},${longitude}?format=j1`
    );

    const data = await response.json();

    return data.weather[0].hourly;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getWeatherAlerts(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`
    );

    const data = await response.json();

    return data.features || [];
  } catch (error) {
    console.log(error);
    return null;
  }
}
