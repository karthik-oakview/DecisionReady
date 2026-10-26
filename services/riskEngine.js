export function computeReadinessScore({
  risk,
  noCar,
  kids,
  visitor,
}) {
  let score = 100;

  if (risk === "HIGH") score -= 25;
  else if (risk === "MEDIUM") score -= 10;

  if (noCar) score -= 20;
  if (kids) score -= 10;
  if (visitor) score -= 10;

  score = Math.max(0, Math.min(100, score));

  return score;
}

export function computeSCRisk({
  location,
  disasterType,
  weather,
  alerts,
  noCar,
  kids,
  visitor,
}) {

  const reasons = [];

  if (alerts && alerts.length > 0) {
    reasons.push(`Active alert: ${alerts[0].properties.event}`);
  }

  if (weather?.temp >= 95) {
    reasons.push("Dangerous heat is expected.");
  }

  if (weather?.description?.toLowerCase().includes("rain")) {
    reasons.push("Heavy rainfall may reduce visibility.");
  }

  if (noCar) {
    reasons.push("Limited transportation may delay evacuation.");
  }

  if (kids) {
    reasons.push("Children require additional preparation.");
  }

  if (visitor) {
    reasons.push("You may be unfamiliar with local emergency routes.");
  }

  return reasons;
}
