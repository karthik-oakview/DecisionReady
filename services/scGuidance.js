// services/scGuidance.js

export function getSCGuidanceContext(location, disasterType) {
  const place = String(location || "").toLowerCase();
  const hazard = String(disasterType || "").toLowerCase();

  const isSouthCarolina =
    place.includes("south carolina") ||
    place.includes(", sc") ||
    place.endsWith(" sc");

  const coastalCounties = [
    "beaufort", "berkeley", "charleston",
    "colleton", "dorchester", "georgetown",
    "horry", "jasper"
  ];

  const isCoastal = coastalCounties.some(
    county => place.includes(county)
  );

  const context = [
    "DecisionReady is designed primarily for South Carolina.",
    "Use National Weather Service warnings and official South Carolina emergency management guidance.",
    "Never invent evacuation orders, shelter openings, or local warnings.",
    "Never assume a county or evacuation zone from an ambiguous city name.",
  ];

  if (!isSouthCarolina) {
    context.push(
      "The supplied location has not been verified as South Carolina.",
      "Do not claim that South Carolina-specific resources apply to this location."
    );
    return context.join("\n");
  }

  context.push(
    "For statewide preparedness information, refer users to the South Carolina Emergency Management Division (SCEMD).",
    "County emergency management agencies may provide additional local instructions."
  );

  if (hazard.includes("hurricane")) {
    context.push(
      "Discuss hurricane preparedness and official evacuation guidance.",
      "For coastal locations, mention official hurricane evacuation zones where relevant.",
      "Do not claim the user is in an evacuation zone without verified zone information."
    );
  }

  if (hazard.includes("flood")) {
    context.push(
      "Emphasize flash flood warnings, rising water, and avoiding flooded roads.",
      "Do not assume a specific road is flooded."
    );
  }

  if (hazard.includes("tornado")) {
    context.push(
      "Explain the distinction between tornado watches and warnings.",
      "For an applicable tornado warning, prioritize immediate protective shelter."
    );
  }

  if (hazard.includes("heat")) {
    context.push(
      "Consider official heat alerts, access to cooler environments, and hydration.",
      "Do not invent the availability of cooling centers."
    );
  }

  if (hazard.includes("thunderstorm")) {
    context.push(
      "Consider damaging winds, lightning, heavy rainfall, and official severe thunderstorm warnings."
    );
  }

  if (isCoastal) {
    context.push(
      "The location text mentions a coastal-region county.",
      "Consider coastal hazards when relevant, but do not assume the user's exact location or evacuation zone."
    );
  }

  return context.join("\n");
}