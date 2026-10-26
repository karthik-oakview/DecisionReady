// services/threatEngine.js

export function computeThreat({
  disasterType,
  currentWeather,
  alerts = [],
  noCar = false,
  kids = false,
  visitor = false,
}) {

  let primaryThreat = "No Active Weather";
  let confidence = 90;
  let threatScore = 0;

  const reasons = [];
  const personalFactors = [];

  // Track whether an urgent official warning exists.
  let hasUrgentOfficialWarning = false;


  //-------------------------------------------------
  // NOAA / NWS ALERTS
  //-------------------------------------------------

  if (alerts.length > 0) {

    alerts.forEach((alert) => {

      const event =
        alert?.properties?.event?.toLowerCase() || "";


      // TORNADO
      if (event.includes("tornado")) {

        primaryThreat = "Tornado";
        threatScore += 50;
        confidence = 99;

        reasons.push(
          "National Weather Service Tornado alert"
        );

        if (event.includes("warning")) {
          hasUrgentOfficialWarning = true;
        }
      }


      // FLOOD
      else if (event.includes("flood")) {

        primaryThreat = "Flash Flooding";
        threatScore += 45;
        confidence = 99;

        reasons.push(
          "National Weather Service Flood alert"
        );

        if (event.includes("warning")) {
          hasUrgentOfficialWarning = true;
        }
      }


      // HURRICANE
      else if (event.includes("hurricane")) {

        primaryThreat = "Hurricane";
        threatScore += 50;
        confidence = 99;

        reasons.push(
          "National Weather Service Hurricane alert"
        );

        if (event.includes("warning")) {
          hasUrgentOfficialWarning = true;
        }
      }


      // HEAT
      else if (event.includes("heat")) {

        primaryThreat = "Extreme Heat";
        threatScore += 35;
        confidence = 99;

        reasons.push(
          "National Weather Service Heat alert"
        );
      }


      // THUNDERSTORM
      else if (event.includes("thunderstorm")) {

        primaryThreat = "Severe Thunderstorm";
        threatScore += 30;
        confidence = 98;

        reasons.push(
          "National Weather Service Severe Thunderstorm alert"
        );

        if (event.includes("warning")) {
          hasUrgentOfficialWarning = true;
        }
      }

    });

  }


  //-------------------------------------------------
  // CURRENT WEATHER CONDITIONS
  //-------------------------------------------------

  if (currentWeather) {

    const temp =
      Number(currentWeather.temp || 0);

    const weather =
      currentWeather.description?.toLowerCase() || "";

    const wind =
      Number(currentWeather.wind || 0);


    // EXTREME HEAT

    if (temp >= 105) {

      threatScore += 30;

      reasons.push(
        "Extreme temperature above 105°F"
      );

      if (primaryThreat === "No Active Weather") {
        primaryThreat = "Extreme Heat";
      }

    }


    // HIGH HEAT

    else if (temp >= 95) {

      threatScore += 20;

      reasons.push(
        "High temperature above 95°F"
      );

      if (primaryThreat === "No Active Weather") {
        primaryThreat = "Heat";
      }

    }


    // STRONG WIND

    if (wind >= 40) {

      threatScore += 15;

      reasons.push(
        "Strong winds above 40 mph"
      );

    }


    // THUNDERSTORMS

    if (weather.includes("thunder")) {

      threatScore += 20;

      reasons.push(
        "Thunderstorms in current conditions"
      );

      if (primaryThreat === "No Active Weather") {
        primaryThreat = "Thunderstorm";
      }

    }


    // HEAVY RAIN

    if (weather.includes("heavy rain")) {

      threatScore += 20;

      reasons.push(
        "Heavy rainfall"
      );

      if (primaryThreat === "No Active Weather") {
        primaryThreat = "Flood";
      }

    }


    // SNOW / ICE

    if (
      weather.includes("snow") ||
      weather.includes("ice")
    ) {

      threatScore += 15;

      reasons.push(
        "Snow or ice conditions"
      );

      if (primaryThreat === "No Active Weather") {
        primaryThreat = "Winter Weather";
      }

    }

  }

//-------------------------------------------------
// USER-SELECTED EMERGENCY TYPE
//-------------------------------------------------
//
// The selected disaster tells DecisionReady what
// the user wants evaluated.
//
// Selecting a disaster does NOT mean that disaster
// is currently happening.
//
// Live weather and official NWS alerts determine
// the current threat.
//-------------------------------------------------

if (
  primaryThreat === "No Active Weather" &&
  disasterType
) {

  reasons.push(
    `${disasterType} selected for assessment`
  );

}


  //-------------------------------------------------
  // PERSONAL FACTORS
  //-------------------------------------------------
  //
  // IMPORTANT:
  // These DO NOT change the weather hazard score.
  //
  // They affect preparation, readiness, and
  // personalized recommendations instead.
  //-------------------------------------------------

  if (noCar) {

    personalFactors.push(
      "No vehicle available"
    );

  }


  if (kids) {

    personalFactors.push(
      "Children require additional preparation"
    );

  }


  if (visitor) {

    personalFactors.push(
      "Unfamiliar with local emergency routes"
    );

  }


  //-------------------------------------------------
  // LIMIT INTERNAL THREAT SCORE
  //-------------------------------------------------

  threatScore = Math.min(
    100,
    threatScore
  );


  //-------------------------------------------------
  // LEGACY RISK LEVEL
  //-------------------------------------------------
  //
  // Keep this for existing components and services.
  //-------------------------------------------------

  let risk = "LOW";

  if (threatScore >= 70) {

    risk = "HIGH";

  }

  else if (threatScore >= 40) {

    risk = "MEDIUM";

  }


  //-------------------------------------------------
  // DECISION LEVEL
  //-------------------------------------------------
  //
  // This is what we eventually want the USER
  // to see instead of treating threatScore as
  // a percentage.
  //-------------------------------------------------

  let decisionLevel = "MONITOR";

  let decisionMessage =
    "Continue monitoring weather conditions and official alerts.";


  // IMMEDIATE ACTION
  //
  // An urgent NWS warning can trigger this even
  // if the numerical score is below 70.

  if (hasUrgentOfficialWarning) {

    decisionLevel = "IMMEDIATE ACTION";

    decisionMessage =
      "Follow official protective instructions and take appropriate action now.";

  }


  // ACT

  else if (threatScore >= 70) {

    decisionLevel = "ACT";

    decisionMessage =
      "Significant hazardous conditions are present. Take protective action and closely monitor official alerts.";

  }


  // PREPARE

  else if (threatScore >= 40) {

    decisionLevel = "PREPARE";

    decisionMessage =
      "Conditions warrant preparation and closer monitoring.";

  }


  // MONITOR

  else {

    decisionLevel = "MONITOR";

    decisionMessage =
      "No significant immediate hazard is detected. Continue monitoring conditions.";

  }


  //-------------------------------------------------
  // THREAT EXPLANATION
  //-------------------------------------------------

  let threatReason =
    "Current weather conditions are stable.";


  if (
    primaryThreat === "Extreme Heat" ||
    primaryThreat === "Heat"
  ) {

    threatReason =
      "High temperatures may increase the risk of heat-related illness.";

  }


  else if (
    primaryThreat === "Flash Flooding" ||
    primaryThreat === "Flood"
  ) {

    threatReason =
      "Heavy rainfall may cause flooding in low-lying or poorly drained areas.";

  }


  else if (
    primaryThreat === "Severe Thunderstorm" ||
    primaryThreat === "Thunderstorm"
  ) {

    threatReason =
      "Thunderstorms may produce lightning, strong winds, hazardous travel, or power outages.";

  }


  else if (primaryThreat === "Tornado") {

    threatReason =
      "Tornado conditions can become dangerous quickly and may require immediate protective action.";

  }


  else if (primaryThreat === "Hurricane") {

    threatReason =
      "Hurricane conditions may disrupt transportation, utilities, and communications.";

  }


  else if (primaryThreat === "Winter Weather") {

    threatReason =
      "Snow or ice may create hazardous travel and outdoor conditions.";

  }


  //-------------------------------------------------
  // FINAL OUTPUT
  //-------------------------------------------------

  return {

    primaryThreat,
    threatReason,

    confidence,

    // Existing values
    risk,
    threatScore,
    reasons,

    // New DecisionReady values
    decisionLevel,
    decisionMessage,
    personalFactors,

    // Useful for debugging/explanation
    hasUrgentOfficialWarning,

  };

}