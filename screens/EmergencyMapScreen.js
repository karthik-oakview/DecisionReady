
import React, { useEffect, useState, useRef } from "react";
import {
  MAULDIN_HIGH_SCHOOL,
  getDemoMapPlaces,
} from "../services/demoMapPlaces";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  ScrollView,
} from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getEmergencyPlaces } from "../services/mapService";
import ResourceGuidanceCard from "../components/ResourceGuidanceCard";

export default function EmergencyMapScreen({ route }) {
    const {
      latitude,
      longitude,
      disasterType,
      noCar = false,
      kids = false,
      visitor = false,
      demoMode = false,
      demoScenario = null,
    } = route.params || {};

  const isCharleston =
    demoMode &&
    String(demoScenario).toLowerCase().includes("charleston");

  
  const mapLatitude = demoMode
  ? isCharleston
    ? 32.7765
    : MAULDIN_HIGH_SCHOOL.latitude
  : Number(latitude);

  const mapLongitude = demoMode
  ? isCharleston
    ? -79.9311
    : MAULDIN_HIGH_SCHOOL.longitude
  : Number(longitude);


  const validCoordinates =
    Number.isFinite(mapLatitude) &&
    Number.isFinite(mapLongitude) &&
    mapLatitude >= -90 &&
    mapLatitude <= 90 &&
    mapLongitude >= -180 &&
    mapLongitude <= 180;
  const mapRef = useRef(null);
  const [resourceFilter, setResourceFilter] = useState("all");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const filteredPlaces = places.filter((place) => {
  if (resourceFilter === "all") {
    return true;
  }

  if (resourceFilter === "medical") {
    return (
     place.type === "hospital" ||
     place.type === "urgent_care" ||
     place.type === "pharmacy"
    );
  }

  if (resourceFilter === "emergency") {
    return (
      place.type === "fire_station" ||
      place.type === "police" ||
      place.type === "shelter"
    );
  }

  return true;
});

const [mapReady, setMapReady] = useState(false);

useEffect(() => {
  if (!mapReady || !validCoordinates || !mapRef.current) {
    return;
  }

  const coordinates = [
    {
      latitude: mapLatitude,
      longitude: mapLongitude,
    },
    ...filteredPlaces
      .filter(
        (place) =>
          Number.isFinite(Number(place.latitude)) &&
          Number.isFinite(Number(place.longitude))
      )
      .map((place) => ({
        latitude: Number(place.latitude),
        longitude: Number(place.longitude),
      })),
  ];

  if (coordinates.length === 1) {
    mapRef.current.animateToRegion(
      {
        latitude: mapLatitude,
        longitude: mapLongitude,
        latitudeDelta: 0.035,
        longitudeDelta: 0.035,
      },
      500
    );
  } else {
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 160,
        right: 45,
        bottom: 330,
        left: 45,
      },
      animated: true,
    });
  }
}, [
  mapReady,
  places,
  resourceFilter,
  mapLatitude,
  mapLongitude,
  validCoordinates,
]);


  useEffect(() => {
    let active = true;

    async function loadPlaces() {
      setLoading(true);
      setErrorMessage("");
      setPlaces([]);

      if (!validCoordinates) {
        setErrorMessage("Valid map coordinates are unavailable.");
        setLoading(false);
        return;
      }

      try {
        const startTime = Date.now();

        if (demoMode) {
        const demoPlaces = getDemoMapPlaces(demoScenario);

        setPlaces(demoPlaces);
        setLoading(false);
        setErrorMessage("");

        return;
      }
        const results = await getEmergencyPlaces(
          mapLatitude,
          mapLongitude
        );

        console.log(
          "Emergency Map facility loading time:",
          (Date.now() - startTime) / 1000,
          "seconds"
        );

        if (active) {
          setPlaces(Array.isArray(results) ? results : []);
        }
      } catch (error) {
        console.log("Emergency map error:", error);

        if (active) {
         setErrorMessage(
            "Emergency facility data is temporarily unavailable. Please try again later."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlaces();

    return () => {
      active = false;
    };
  }, [
  mapLatitude,
  mapLongitude,
  validCoordinates,
  demoMode,
  demoScenario,
]);

  function getDistance(lat2, lon2) {
    const R = 6371;

    const dLat =
      ((lat2 - mapLatitude) * Math.PI) / 180;

    const dLon =
      ((lon2 - mapLongitude) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((mapLatitude * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(Math.max(0, 1 - a))
      );

    return (R * c).toFixed(1);
  }
  
const closestPlaces = filteredPlaces
  .map((place) => ({
    ...place,
    distanceKm: Number(
      getDistance(
        Number(place.latitude),
        Number(place.longitude)
      )
    ),
  }))
  .filter((place) => Number.isFinite(place.distanceKm))
  .sort((a, b) => a.distanceKm - b.distanceKm)
  .slice(0, 3);


  function getMarker(type) {
    switch (type) {
       case "urgent_care":
        return {
          icon: "medical-bag",
          color: "#D62828",
          label: "Urgent Care",
        };
      case "hospital":
        return {
          icon: "hospital-box",
          color: "#D62828",
          label: "Hospital",
        };

      case "fire_station":
        return {
          icon: "fire-truck",
          color: "#F77F00",
          label: "Fire Station",
        };

      case "police":
        return {
          icon: "shield-account",
          color: "#003566",
          label: "Police",
        };

      case "pharmacy":
        return {
          icon: "pill",
          color: "#7B2CBF",
          label: "Pharmacy",
        };

      case "fuel":
        return {
          icon: "gas-station",
          color: "#2A9D8F",
          label: "Gas Station",
        };

      case "shelter":
        return {
          icon: "home",
          color: "#4361EE",
          label: "Mapped Shelter Facility",
        };

      default:
        return {
          icon: "map-marker",
          color: "#667085",
          label: "Location",
        };
    }
  }

 
async function navigateTo(place) {
  const destination =
    `${place.latitude},${place.longitude}`;

  const demoStart = isCharleston
    ? "32.7765,-79.9311"
    : `${MAULDIN_HIGH_SCHOOL.latitude},${MAULDIN_HIGH_SCHOOL.longitude}`;

  const openNavigation = async () => {
    try {
      if (demoMode) {
        // Demonstration directions begin at the fictional
        // starting location, not the simulator's GPS.
        const demoURL =
          `https://www.google.com/maps/dir/?api=1` +
          `&origin=${encodeURIComponent(demoStart)}` +
          `&destination=${encodeURIComponent(destination)}` +
          `&travelmode=driving`;

        await Linking.openURL(demoURL);
        return;
      }

      // Live Mode: Navigation starts at the device's
      // actual current location.
      const nativeURL =
        Platform.OS === "ios"
          ? `maps://?daddr=${destination}`
          : `google.navigation:q=${destination}`;

      const browserURL =
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${encodeURIComponent(destination)}`;

      const supported =
        await Linking.canOpenURL(nativeURL);

      if (supported) {
        await Linking.openURL(nativeURL);
      } else {
        await Linking.openURL(browserURL);
      }
    } catch (error) {
      Alert.alert(
        "Navigation unavailable",
        "Unable to open the map application."
      );
    }
  };

  if (demoMode) {
    Alert.alert(
      "Simulation Directions",
      "Directions will use the fictional starting location. Facility availability and route safety are not verified. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open Maps",
          onPress: openNavigation,
        },
      ]
    );
    return;
  }

  await openNavigation();
}

  if (!validCoordinates) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Map coordinates are unavailable.
          Return to the assessment and select a location.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        onMapReady={() => setMapReady(true)}
        style={styles.map}
        initialRegion={{
          latitude: mapLatitude,
          longitude: mapLongitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        <Marker
          coordinate={{
            latitude: mapLatitude,
            longitude: mapLongitude,
          }}
          title={
           demoMode
            ? isCharleston
              ? "Charleston — Simulated Location"
              : "Mauldin High School — Simulated Location"
            : "Selected Location"
                    }
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={34}
            color="#0066FF"
          />
        </Marker>

        {filteredPlaces.map((place, index) => {
          const placeLatitude = Number(place.latitude);
          const placeLongitude = Number(place.longitude);

          if (
            !Number.isFinite(placeLatitude) ||
            !Number.isFinite(placeLongitude)
          ) {
            return null;
          }

          const marker = getMarker(place.type);

          return (
            <Marker
              key={String(place.id ?? index)}
              coordinate={{
                latitude: placeLatitude,
                longitude: placeLongitude,
              }}
              title={place.name || marker.label}
            >
              <MaterialCommunityIcons
                name={marker.icon}
                size={34}
                color={marker.color}
              />

              <Callout
                tooltip={false}
                onPress={() => navigateTo({
                  latitude: placeLatitude,
                  longitude: placeLongitude,
                })}
              >
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>
                    {place.name || "Unnamed Facility"}
                  </Text>

                  <Text style={styles.calloutText}>
                    {marker.label}
                  </Text>

                  <Text style={styles.calloutText}>
                    Straight-line distance:{" "}
                    {getDistance(
                      placeLatitude,
                      placeLongitude
                    )} km
                  </Text>

                  <Text style={styles.calloutNotice}>
                    Facility availability and route safety
                    are not verified.
                  </Text>

                  <View style={styles.navigateButton}>
                    <Text style={styles.navigateText}>
                      Open Navigation
                    </Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {demoMode && (
        <View style={styles.demoBanner}>
          <Text style={styles.demoTitle}>
            SIMULATION — NOT LIVE EMERGENCY DATA
          </Text>

          <Text style={styles.demoSubtitle}>
            {isCharleston
              ? "Charleston Hurricane Scenario"
              : "Greenville Flash Flood Scenario"}
          </Text>

          <Text style={styles.demoDescription}>
            Fictional emergency • Preloaded demonstration data
          </Text>
        </View>
      )}

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>
          Nearby Emergency Resources
        </Text>
        <View style={styles.filterRow}>
          {[
            { id: "all", label: "All" },
            { id: "medical", label: "Medical" },
            { id: "emergency", label: "Emergency" },
          ].map((filter) => {
            const selected = resourceFilter === filter.id;

            return (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setResourceFilter(filter.id)}
                style={[
                  styles.filterButton,
                  selected && styles.filterButtonActive,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selected && styles.filterButtonTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator
              size="small"
              color="#2A9D8F"
            />
            <Text style={styles.loadingInline}>
              Loading nearby facilities...
            </Text>
          </View>
        ) : errorMessage ? (
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        ) : (
        <Text style={styles.countText}>
          {demoMode && places.length === 0
            ? "Demo facilities have not been configured yet."
            : `Showing ${filteredPlaces.length} of ${places.length} mapped facilities`}
        </Text>
        )}

        <ScrollView
          style={styles.legendScroll}
          nestedScrollEnabled
          showsVerticalScrollIndicator
        >
                
        {!loading && closestPlaces.length > 0 && (
          <View style={styles.closestSection}>
            <Text style={styles.closestTitle}>
              Closest Resources
            </Text>

            <Text style={styles.closestSubtitle}>
              Sorted by straight-line distance from{" "}
              {demoMode
                ? isCharleston
                  ? "the Charleston demo location"
                  : "Mauldin High School"
                : "your selected location"}
            </Text>

            {closestPlaces.map((place, index) => {
              const marker = getMarker(place.type);

              return (
                <View
                  key={String(place.id ?? index)}
                  style={styles.closestRow}
                >
                  <MaterialCommunityIcons
                    name={marker.icon}
                    size={22}
                    color={marker.color}
                  />

                  <View style={styles.closestInfo}>
                    <Text style={styles.closestName}>
                      {place.name}
                    </Text>

                    <Text style={styles.closestDetails}>
                      {marker.label} • {place.distanceKm.toFixed(1)} km
                    </Text>
                  </View>
                </View>
              );
            })}

            <Text style={styles.closestDisclaimer}>
              Nearest does not mean safest or available.
              Follow official emergency instructions.
            </Text>
          </View>
        )}


          <ResourceGuidanceCard
            disasterType={disasterType}
            noCar={noCar}
            kids={kids}
            visitor={visitor}
            demoMode={demoMode}
          />

          <LegendRow
            icon="hospital-box"
            color="#D62828"
            label="Hospital"
          />

          <LegendRow
            icon="fire-truck"
            color="#F77F00"
            label="Fire Station"
          />

          <LegendRow
            icon="shield-account"
            color="#003566"
            label="Police"
          />

          <LegendRow
            icon="pill"
            color="#7B2CBF"
            label="Pharmacy"
          />

          <LegendRow
            icon="gas-station"
            color="#2A9D8F"
            label="Gas Station"
          />

          <LegendRow
            icon="home"
            color="#4361EE"
            label="Shelter Facility"
          />

          <View style={styles.emergencySection}>
            <Text style={styles.emergencyTitle}>
              {demoMode
                ? "Demo Emergency Scenario"
                : "Selected Emergency Type"}
            </Text>

            <Text style={styles.emergencyValue}>
              {disasterType || "Not specified"}
              {demoMode ? " (Simulated)" : ""}
            </Text>
          </View>

          <Text style={styles.disclaimer}>
            Map markers do not confirm that facilities
            are open, shelters are activated, or routes
            are safe. Follow official local emergency
            instructions.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

function LegendRow({ icon, color, label }) {
  return (
    <View style={styles.legendRow}>
      <MaterialCommunityIcons
        name={icon}
        size={21}
        color={color}
      />

      <Text style={styles.legendText}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#F4F6F8",
  },

  loadingText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },

  demoBanner: {
    position: "absolute",
    top: 12,
    left: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: "#FFF4D6",
    borderColor: "#D97706",
    borderWidth: 1,
    borderRadius: 10,
    padding: 11,
    alignItems: "center",
    elevation: 4,
  },

  demoTitle: {
    color: "#92400E",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },

  demoSubtitle: {
    color: "#92400E",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  demoDescription: {
    color: "#92400E",
    fontSize: 11,
    marginTop: 3,
    textAlign: "center",
  },

  legend: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    maxHeight: "43%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  legendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0B1F3A",
  },

  countText: {
    fontSize: 12,
    color: "#667085",
    marginBottom: 10,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  loadingInline: {
    fontSize: 12,
    color: "#667085",
    marginLeft: 8,
  },

  errorText: {
    color: "#B42318",
    fontSize: 12,
    marginBottom: 10,
  },

  legendScroll: {
    flexGrow: 0,
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  legendText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#344054",
  },

  emergencySection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    paddingTop: 10,
  },

  emergencyTitle: {
    fontWeight: "bold",
    color: "#0B1F3A",
  },

  emergencyValue: {
    marginTop: 4,
    color: "#344054",
  },

  disclaimer: {
    fontSize: 11,
    lineHeight: 16,
    color: "#667085",
    marginTop: 12,
  },

  callout: {
    width: 230,
    padding: 8,
  },

  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0B1F3A",
  },

  calloutText: {
    marginTop: 5,
    fontSize: 13,
    color: "#344054",
  },

  calloutNotice: {
    marginTop: 8,
    fontSize: 11,
    color: "#92400E",
  },

  navigateButton: {
    backgroundColor: "#0B1F3A",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  navigateText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  filterRow: {
  flexDirection: "row",
  marginTop: 8,
  marginBottom: 12,
  gap: 7,
},

filterButton: {
  flex: 1,
  paddingVertical: 10,
  paddingHorizontal: 5,
  borderRadius: 9,
  backgroundColor: "#F2F4F7",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#E4E7EC",
},

filterButtonActive: {
  backgroundColor: "#0B1F3A",
  borderColor: "#0B1F3A",
},

filterButtonText: {
  color: "#344054",
  fontSize: 12,
  fontWeight: "600",
},

filterButtonTextActive: {
  color: "#FFFFFF",
},

closestSection: {
  backgroundColor: "#F4F8FC",
  borderRadius: 12,
  padding: 12,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: "#DCE7F2",
},

closestTitle: {
  fontSize: 15,
  fontWeight: "bold",
  color: "#0B1F3A",
},

closestSubtitle: {
  fontSize: 11,
  color: "#667085",
  marginTop: 4,
  marginBottom: 12,
},

closestRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 9,
  borderBottomWidth: 1,
  borderBottomColor: "#E4E7EC",
},

closestInfo: {
  flex: 1,
  marginLeft: 10,
},

closestName: {
  fontSize: 13,
  fontWeight: "600",
  color: "#0B1F3A",
},

closestDetails: {
  fontSize: 11,
  color: "#667085",
  marginTop: 3,
},

closestDisclaimer: {
  fontSize: 10,
  color: "#92400E",
  marginTop: 12,
  lineHeight: 15,
},

});
