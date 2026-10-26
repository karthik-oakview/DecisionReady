import React, { useState, useEffect } from "react";
import { getDemoScenario } from "../services/demoScenarios";
import EmergencyActionPlanCard from "../components/EmergencyActionPlanCard";
import WhatIfScenarioExplorer from "../components/WhatIfScenarioExplorer";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import CurrentSituationCard from "../components/CurrentSituationCard";
import LocationCard from "../components/LocationCard";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import AlertsCard from "../components/AlertsCard";
import ReadinessCard from "../components/ReadinessCard";
import AISummaryCard from "../components/AISummaryCard";
import RiskFactorsCard from "../components/RiskFactorsCard";
import EmergencyPlanCard from "../components/EmergencyPlanCard";
import EmergencyButtons from "../components/EmergencyButtons";
import AIChatCard from "../components/AIChatCard";

import { computeReadinessScore } from "../services/riskEngine";

import {
   
  buildPersonalPlan,
} from "../services/disasterGuidance";

import {
  generateEmergencyGuidance,
} from "../services/llmservice";

import {
  getWeather,
  getHourlyForecast,
  getWeatherAlerts,
} from "../services/weatherservice";

import { computeThreat } from "../services/threatEngine";


export default function ResultScreen({ navigation, route }) {

 const {
  location,
  latitude,
  longitude,
  disasterType,
  noCar,
  kids,
  visitor,
  demoMode = false,
  demoScenario = null,
} = route.params;

const scenario = demoMode
  ? getDemoScenario(demoScenario)
  : null;

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------

  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [whatIfNoCar, setWhatIfNoCar] = useState(noCar);
  const [whatIfKids, setWhatIfKids] = useState(kids);
  const [whatIfVisitor, setWhatIfVisitor] = useState(visitor);
  const [aiGuidance, setAIGuidance] = useState("");

  const [showMore, setShowMore] = useState(false);

  const [threat, setThreat] = useState({
    primaryThreat: "Assessment Incomplete",
    threatReason: "",
    confidence: 0,
    risk: "UNKNOWN",
    threatScore: 0,
    reasons: [],
  });


  // --------------------------------------------------
  // DERIVED VALUES
  // --------------------------------------------------

  const primaryThreat = threat.primaryThreat;
  const confidence = threat.confidence;
  const risk = threat.risk;
  const riskScore = threat.threatScore;
  const decisionLevel = threat.decisionLevel || "MONITOR";
  
  const decisionMessage =
  threat.decisionMessage ||
  "Continue monitoring weather conditions and official alerts.";

 const personalFactors =
  threat.personalFactors || [];
  const readinessScore = computeReadinessScore({
    risk,
    noCar,
    kids,
    visitor,
  });

  const readinessLevel =
    readinessScore >= 80
      ? "Ready"
      : readinessScore >= 60
      ? "Needs Improvement"
      : "Needs Attention";

 const threatReason = threat.threatReason;

  const personalPlan = buildPersonalPlan({
    risk,
    noCar,
    kids,
    visitor,
  });

  const riskColor =
    risk === "HIGH"
      ? "#D62828"
      : risk === "MEDIUM"
      ? "#F4A261"
      : "#2A9D8F";

  const riskReasons = threat.reasons;


  // --------------------------------------------------
  // INITIALIZE DECISIONREADY
  // --------------------------------------------------

  async function initialize() {

    try {

let weather;
let hourly;
let nwsAlerts;

if (demoMode) {
  if (!scenario) {
    throw new Error("Invalid demo scenario");
  }

  // Use ONLY simulated information.
  weather = scenario.weather;
  hourly = scenario.hourlyForecast || [];
  nwsAlerts = scenario.alerts;

  console.log("DecisionReady SIMULATION:", scenario.name);
} else {
  // Existing LIVE data retrieval.
  weather = await getWeather(latitude, longitude);
  hourly = await getHourlyForecast(latitude, longitude);
  nwsAlerts = await getWeatherAlerts(latitude, longitude);
}

setCurrentWeather(weather);
setHourlyForecast(Array.isArray(hourly) ? hourly : []);

const safeAlerts = Array.isArray(nwsAlerts)
  ? nwsAlerts
  : [];

const dataUnavailable =
  !demoMode &&
  (weather == null || !Array.isArray(nwsAlerts));

setAlerts(safeAlerts);

      // Compute threat using fresh data
      const computedThreat = computeThreat({
        disasterType,
        currentWeather: weather,
        alerts: safeAlerts,
        noCar,
        kids,
        visitor,
      });

      if (dataUnavailable) {
  computedThreat.primaryThreat = "Assessment Incomplete";
  computedThreat.threatReason =
    "Current weather or official alert information could not be verified.";

  computedThreat.risk = "UNKNOWN";
  computedThreat.decisionLevel = "UNKNOWN";
  computedThreat.decisionMessage =
    "Some live information is unavailable. Check official NWS alerts and reassess when the connection is restored.";
  computedThreat.confidence = 0;
}

setThreat(computedThreat);


      // IMPORTANT:
      // Calculate readiness using the NEW threat,
      // not the old React state value.

      const computedReadinessScore =
        computeReadinessScore({
          risk: computedThreat.risk,
          noCar,
          kids,
          visitor,
        });


      // AI guidance
      const ai = await generateEmergencyGuidance({
        location,
        disasterType,

        risk: computedThreat.risk,
        riskScore: computedThreat.threatScore,

        primaryThreat:
          computedThreat.primaryThreat,

        confidence:
          computedThreat.confidence,

        readinessScore:
          computedReadinessScore,

        alertCount:
          safeAlerts.length,
        officialAlerts: safeAlerts.slice(0, 5).map((alert) => ({
          event: alert?.properties?.event || "Unknown alert",
          headline: alert?.properties?.headline || "",
          severity: alert?.properties?.severity || "Unknown",
          area: alert?.properties?.areaDesc || "",
          instruction: alert?.properties?.instruction || "",
        })),
       
        noCar,
        kids,
        visitor,

        weather: weather
          ? `${weather.description}, ${weather.temp}°F`
          : "Weather unavailable",
        isSimulation: demoMode,

      });

      setAIGuidance(ai);
   
    } catch (error) {

      console.log(
        "Initialization error:",
        error
      );

    }

  }


  useEffect(() => {
    initialize();
  }, []);


  // --------------------------------------------------
  // SCREEN
  // --------------------------------------------------

  return (

    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F4F6F8",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 50,
      }}
    >
     {demoMode && (
  <View
    style={{
      backgroundColor: "#FFF4D6",
      borderColor: "#D97706",
      borderWidth: 1,
      borderRadius: 10,
      padding: 11,
      marginBottom: 14,
    }}
  >
    <Text
      style={{
        color: "#92400E",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
      }}
    >
      ⚠ SIMULATION — NOT LIVE DATA
    </Text>

    <Text
      style={{
        color: "#92400E",
        fontSize: 12,
        textAlign: "center",
        marginTop: 3,
      }}
    >
      {scenario?.name || "Demonstration scenario"}
    </Text>
  </View>
)}

      {/* PAGE TITLE */}

      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#0B1F3A",
          marginBottom: 6,
        }}
      >
        DecisionReady
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "#667085",
          marginBottom: 20,
        }}
      >
        Your current emergency decision dashboard
      </Text>
      <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  }}
>
  <Text
    style={{
      fontSize: 14,
      color: "#344054",
      fontWeight: "600",
    }}
  >
    📍 {location || "Location unavailable"}
  </Text>
</View>



      {/* ========================================= */}
      {/* CURRENT SITUATION */}
      {/* ========================================= */}

      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#667085",
          marginBottom: 10,
          letterSpacing: 0.7,
        }}
      >
        CURRENT SITUATION
      </Text>
      <CurrentSituationCard
        primaryThreat={primaryThreat}
        threatReason={threatReason}
        decisionLevel={decisionLevel}
        decisionMessage={decisionMessage}
        personalFactors={personalFactors}
      />
      {/* ========================================= */}
      {/* AI GUIDANCE */}
      {/* ========================================= */}

      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#667085",
          marginTop: 5,
          marginBottom: 10,
          letterSpacing: 0.7,
        }}
      >
        WHAT SHOULD I DO?
      </Text>

      <AISummaryCard
        aiGuidance={aiGuidance}
        confidence={confidence}
      />
      <WhatIfScenarioExplorer
        noCar={whatIfNoCar}
        kids={whatIfKids}
        visitor={whatIfVisitor}
        onNoCarChange={setWhatIfNoCar}
        onKidsChange={setWhatIfKids}
        onVisitorChange={setWhatIfVisitor}
      />

     <EmergencyActionPlanCard
        disasterType={disasterType}
        risk={risk}
        noCar={whatIfNoCar}
        kids={whatIfKids}
        visitor={whatIfVisitor}
        demoMode={demoMode}
      />

      {/* ========================================= */}
      {/* READINESS */}
      {/* ========================================= */}

      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#667085",
          marginTop: 5,
          marginBottom: 10,
          letterSpacing: 0.7,
        }}
      >
        MY READINESS
      </Text>

      <ReadinessCard
        risk={risk}
        noCar={noCar}
        kids={kids}
        visitor={visitor}
      />


      {/* ========================================= */}
      {/* EMERGENCY TOOLS */}
      {/* ========================================= */}

      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#667085",
          marginTop: 5,
          marginBottom: 5,
          letterSpacing: 0.7,
        }}
      >
        EMERGENCY TOOLS
      </Text>

  <EmergencyButtons
  navigation={navigation}
  disasterType={disasterType}
  noCar={noCar}
  kids={kids}
  visitor={visitor}
  location={location}
  risk={risk}
  latitude={latitude}
  longitude={longitude}
  alerts={alerts}
  demoMode={demoMode}
  demoScenario={demoScenario}
/>
      {/* ========================================= */}
      {/* MORE INFORMATION BUTTON */}
      {/* ========================================= */}

      <TouchableOpacity
        onPress={() =>
          setShowMore(!showMore)
        }
        style={{
          backgroundColor: "white",
          padding: 17,
          borderRadius: 14,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#DDE3EA",
          alignItems: "center",
        }}
      >

        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#0B1F3A",
          }}
        >
          {showMore
            ? "▲ Hide Additional Information"
            : "▼ More Information"}
        </Text>

      </TouchableOpacity>


      {/* ========================================= */}
      {/* SECONDARY INFORMATION */}
      {/* ========================================= */}

      {showMore && (

        <View>

          <LocationCard
            location={location}
            latitude={latitude}
            longitude={longitude}
          />

          <WeatherCard
            currentWeather={currentWeather}
          />

         <ForecastCard
         hourlyForecast={hourlyForecast}
         demoMode={demoMode}
          />

          <AlertsCard
            alerts={alerts}
          />

       <RiskFactorsCard
          riskReasons={riskReasons}
       />

       <EmergencyPlanCard
          personalPlan={personalPlan}
       />
              <AIChatCard
            location={location}
            disasterType={disasterType}
            risk={risk}
            riskScore={riskScore}
            currentWeather={
              currentWeather
            }
            alerts={alerts}
            noCar={noCar}
            kids={kids}
            visitor={visitor}
          />

        </View>

      )}

    </ScrollView>

  );

}