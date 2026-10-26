
const OVERPASS_URL =
  "https://overpass-api.de/api/interpreter";

const CACHE_DURATION = 10 * 60 * 1000;
const REQUEST_TIMEOUT = 12000;

const cache = new Map();

export async function getEmergencyPlaces(
  latitude,
  longitude
) {
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    throw new Error("Invalid map coordinates");
  }

  // Round coordinates to approximately 100 meters
  // to improve cache reuse.
  const cacheKey =
    `${lat.toFixed(3)},${lon.toFixed(3)}`;

  const cached = cache.get(cacheKey);

  if (
    cached &&
    Date.now() - cached.timestamp < CACHE_DURATION
  ) {
    console.log("Emergency Map: using cached facilities");
    return cached.places;
  }

  const query = `
[out:json][timeout:10];
(
  nwr["amenity"~"^(hospital|fire_station|police|pharmacy|fuel|shelter)$"]
  (around:10000,${lat},${lon});
);
out center;
`;

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT
  );

  const startTime = Date.now();

  try {
    const response = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "data=" + encodeURIComponent(query),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Overpass request failed: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data.elements)) {
      throw new Error("Invalid Overpass response");
    }

    const places = data.elements
      .map((item) => {
        const placeLatitude =
          item.lat ?? item.center?.lat;

        const placeLongitude =
          item.lon ?? item.center?.lon;

        if (
          !Number.isFinite(placeLatitude) ||
          !Number.isFinite(placeLongitude)
        ) {
          return null;
        }

        return {
          id: `${item.type}-${item.id}`,
          name:
            item.tags?.name ||
            "Unnamed Location",
          type:
            item.tags?.amenity || "unknown",
          latitude: placeLatitude,
          longitude: placeLongitude,
        };
      })
      .filter(Boolean);

    // Sort facilities by straight-line distance.
    places.sort((a, b) => {
      const distanceA =
        (a.latitude - lat) ** 2 +
        (a.longitude - lon) ** 2;

      const distanceB =
        (b.latitude - lat) ** 2 +
        (b.longitude - lon) ** 2;

      return distanceA - distanceB;
    });

    // Keep a manageable number of markers.
    const limitedPlaces = places.slice(0, 100);

    cache.set(cacheKey, {
      timestamp: Date.now(),
      places: limitedPlaces,
    });

    console.log(
      "Emergency Map loaded",
      limitedPlaces.length,
      "facilities in",
      ((Date.now() - startTime) / 1000).toFixed(2),
      "seconds"
    );

    return limitedPlaces;
  } catch (error) {
    console.log("Map Service Error:", error);

    // Reuse old cached results if the API is unavailable.
    if (cached) {
      console.log(
        "Emergency Map: using older cached facilities"
      );
      return cached.places;
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
