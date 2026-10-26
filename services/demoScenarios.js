// services/demoScenarios.js
// FICTIONAL scenarios for testing and demonstrations.
// These are NOT live National Weather Service alerts.

export const DEMO_SCENARIOS = {
  greenvilleFlood: {
    id: "greenvilleFlood",
    name: "Greenville Flash Flood",
    location: "Greenville, SC",
    disasterType: "Flood",
    isSimulation: true,

    weather: {
      temp: 74,
      wind: 18,
      description: "Heavy rain and thunderstorms",
    },
    hourlyForecast: [
  {
    time: "1400",
    tempF: "74",
    windspeedMiles: "12",
    chanceofrain: "85",
    weatherDesc: [{ value: "Heavy rain" }],
  },
  {
    time: "1500",
    tempF: "73",
    windspeedMiles: "18",
    chanceofrain: "95",
    weatherDesc: [{ value: "Heavy thunderstorms" }],
  },
  {
    time: "1600",
    tempF: "72",
    windspeedMiles: "22",
    chanceofrain: "98",
    weatherDesc: [{ value: "Intense rainfall" }],
  },
  {
    time: "1700",
    tempF: "71",
    windspeedMiles: "16",
    chanceofrain: "95",
    weatherDesc: [{ value: "Heavy rain continues" }],
  },
  {
    time: "1800",
    tempF: "70",
    windspeedMiles: "12",
    chanceofrain: "80",
    weatherDesc: [{ value: "Moderate rain" }],
  },
  {
    time: "1900",
    tempF: "69",
    windspeedMiles: "9",
    chanceofrain: "65",
    weatherDesc: [{ value: "Scattered showers" }],
  },
],

    alerts: [
      {
        properties: {
          event: "Flash Flood Warning",
          headline:
            "SIMULATION: Flash Flood Warning for Greenville",
          severity: "Severe",
          areaDesc: "Greenville County, South Carolina",
          instruction:
            "SIMULATED INSTRUCTIONS: Avoid flooded roads. " +
            "Move away from flood-prone areas and follow " +
            "official protective guidance.",
        },
      },
    ],
  },

  charlestonHurricane: {
    id: "charlestonHurricane",
    name: "Charleston Hurricane",
    location: "Charleston, SC",
    disasterType: "Hurricane",
    isSimulation: true,

    weather: {
      temp: 82,
      wind: 48,
      description: "Heavy rain and strong winds",
    },

    hourlyForecast: [
  {
    time: "1400",
    tempF: "82",
    windspeedMiles: "35",
    chanceofrain: "85",
    weatherDesc: [{ value: "Tropical storm conditions" }],
  },
  {
    time: "1500",
    tempF: "81",
    windspeedMiles: "42",
    chanceofrain: "95",
    weatherDesc: [{ value: "Heavy rain and strong winds" }],
  },
  {
    time: "1600",
    tempF: "80",
    windspeedMiles: "48",
    chanceofrain: "98",
    weatherDesc: [{ value: "Hurricane conditions" }],
  },
  {
    time: "1700",
    tempF: "79",
    windspeedMiles: "52",
    chanceofrain: "99",
    weatherDesc: [{ value: "Severe wind and heavy rain" }],
  },
  {
    time: "1800",
    tempF: "79",
    windspeedMiles: "46",
    chanceofrain: "95",
    weatherDesc: [{ value: "Strong winds and rain" }],
  },
  {
    time: "1900",
    tempF: "78",
    windspeedMiles: "38",
    chanceofrain: "85",
    weatherDesc: [{ value: "Heavy showers and gusty winds" }],
  },
],
    alerts: [
      {
        properties: {
          event: "Hurricane Warning",
          headline:
            "SIMULATION: Hurricane Warning for Charleston",
          severity: "Severe",
          areaDesc: "Charleston County, South Carolina",
          instruction:
            "SIMULATED INSTRUCTIONS: Follow official " +
            "hurricane preparedness and protective guidance. " +
            "Check local emergency management instructions " +
            "and evacuation information if applicable.",
        },
      },
    ],
  },
};

export function getDemoScenario(scenarioId) {
  return DEMO_SCENARIOS[scenarioId] || null;
}