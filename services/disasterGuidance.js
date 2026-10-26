export function getDisasterGuidance({
  disasterType,
  risk,
  currentWeather,
  alerts,
}) {

  let primaryThreat = "No Active Weather";
  let threatReason = "Current weather conditions are stable.";
  let confidence = 90;

  // Highest priority: Active NWS Alerts
  if (alerts && alerts.length > 0) {

    const event = alerts[0].properties.event.toLowerCase();

    if (event.includes("heat")) {
      primaryThreat = "Extreme Heat";
      threatReason =
        "A National Weather Service heat alert is active for your area.";
      confidence = 99;
    }

    else if (event.includes("flood")) {
      primaryThreat = "Flash Flooding";
      threatReason =
        "A flood alert has been issued for your location.";
      confidence = 99;
    }

    else if (event.includes("tornado")) {
      primaryThreat = "Tornado";
      threatReason =
        "A tornado warning has been issued.";
      confidence = 99;
    }

    else if (event.includes("thunderstorm")) {
      primaryThreat = "Severe Thunderstorm";
      threatReason =
        "A severe thunderstorm warning is active.";
      confidence = 98;
    }

    else if (event.includes("hurricane")) {
      primaryThreat = "Hurricane";
      threatReason =
        "Hurricane impacts are expected.";
      confidence = 99;
    }
  }

  // Second priority: dangerous weather
  else if (currentWeather) {

    const temp = Number(currentWeather.temp);

    if (temp >= 100) {
      primaryThreat = "Extreme Heat";
      threatReason =
        "Dangerously high temperatures increase the risk of heat illness.";
      confidence = 95;
    }

    else if (
      currentWeather.description
        .toLowerCase()
        .includes("rain")
    ) {

      primaryThreat = "Heavy Rain";

      threatReason =
        "Rainfall may reduce visibility and create localized flooding.";

      confidence = 90;
    }

    else {

      switch (disasterType) {

        case "Flood":
          primaryThreat = "Flash Flooding";
          threatReason =
            "Heavy rainfall may create dangerous road flooding.";
          break;

        case "Thunderstorm":
          primaryThreat = "Power Outage";
          threatReason =
            "Strong winds may damage trees and power lines.";
          break;

        case "Tornado":
          primaryThreat = "Structural Damage";
          threatReason =
            "Tornado conditions can become life threatening.";
          break;

        case "Hurricane":
          primaryThreat = "Extended Power Loss";
          threatReason =
            "Hurricanes often disrupt transportation and utilities.";
          break;
      }

    }

  }

  // Third priority: overall risk
  if (risk === "HIGH") {
    confidence = Math.max(confidence, 95);
  }

  return {
    primaryThreat,
    threatReason,
    confidence,
  };

}

export function enhanceThreatReason(
  threatReason,
  noCar,
  kids,
  visitor
) {
  let reason = threatReason;

  if (noCar) {
    reason +=
      ' Transportation limitations may make evacuation more difficult.';
  }

  if (kids) {
    reason +=
      ' Children may require additional preparation and supplies.';
  }

  if (visitor) {
    reason +=
      ' Visitors may be unfamiliar with local emergency procedures.';
  }

  return reason;
}

export function buildPersonalPlan({
  risk,
  noCar,
  kids,
  visitor,
}) {

  let plan = [];

  if (noCar) {
    plan.push(
      'Identify nearby shelters or friends/family transportation options.'
    );
  }

  if (kids) {
    plan.push(
      'Prepare medications, snacks, water, and comfort items for children.'
    );
  }

  if (visitor) {
    plan.push(
      'Review local emergency routes and official county alerts.'
    );
  }

  if (risk === 'HIGH') {
    plan.push(
      'Prepare to act immediately if emergency guidance escalates.'
    );
  }

  if (plan.length === 0) {
    plan.push(
      'Continue monitoring weather and keep emergency supplies ready.'
    );
  }

  return plan;
}

