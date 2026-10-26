
export const MAULDIN_HIGH_SCHOOL = {
  id: "demo-start-mauldin",
  name: "Mauldin High School",
  type: "demo_start",
  latitude: 34.79373,
  longitude: -82.28817,
};

export const MAULDIN_DEMO_PLACES = [
  {
    id: "demo-doctors-care",
    name: "Doctors Care - Mauldin",
    type: "urgent_care",
    latitude: 34.800583,
    longitude: -82.286238,
  },
  {
    id: "demo-mauldin-fire-miller",
    name: "Mauldin Fire Station - Miller Road",
    type: "fire_station",
    latitude: 34.8029105,
    longitude: -82.294353,
  },
  {
    id: "demo-mauldin-fire-rocky",
    name: "Mauldin Fire Station - Rocky Creek Road",
    type: "fire_station",
    latitude: 34.820768,
    longitude: -82.276407,
  },
  {
    id: "demo-mauldin-police",
    name: "Mauldin Police Department",
    type: "police",
    latitude: 34.77919,
    longitude: -82.30853,
  },
];

export function getDemoMapPlaces(scenario) {
  const isCharleston = String(scenario || "")
    .toLowerCase()
    .includes("charleston");

  if (isCharleston) {
    return [];
  }

  return MAULDIN_DEMO_PLACES;
}
