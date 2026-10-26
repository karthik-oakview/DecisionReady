export function getSCHazardProfile(location) {

  const city = location.toLowerCase();

  let hazards = [];

  if (city.includes('charleston')) {
    hazards.push(
      'Coastal regions may experience stronger impacts'
    );
  }

  if (city.includes('greenville')) {
    hazards.push(
      'Flash flooding and severe storms can escalate quickly'
    );
  }

  if (city.includes('myrtle beach')) {
    hazards.push(
      'Storm surge and hurricane impacts are possible'
    );
  }

  if (city.includes('columbia')) {
    hazards.push(
      'Extreme heat is common during summer months'
    );
  }

  return {
  floodRisk: city.includes('charleston'),
  hurricaneRisk:
    city.includes('charleston') ||
    city.includes('myrtle beach'),
  tornadoRisk:
    city.includes('greenville'),
  heatRisk:
    city.includes('columbia'),
  coastal:
    city.includes('charleston') ||
    city.includes('myrtle beach'),

  messages: hazards,
};


}
