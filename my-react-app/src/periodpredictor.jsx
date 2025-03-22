import React, { useState, useEffect } from "react";

const PeriodPredictor = ({ user, setUser }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [symptoms, setSymptoms] = useState("none");
  const [predictionResult, setPredictionResult] = useState("");
  const [healthTips, setHealthTips] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [componentError, setComponentError] = useState("");

  // ✅ Restore user session if missing
  useEffect(() => {
    try {
      if (!user && setUser) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
      }
    } catch (error) {
      setComponentError("Failed to load user session.");
      console.error("Session Error:", error);
    }
  }, [user, setUser]);

  // 🔹 Fetch Weather Data
  const fetchWeather = async () => {
    if (!city) {
      setWeatherError("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      if (!response.ok) throw new Error("Weather data not found");
      const data = await response.json();
      setWeatherData(data);
      setWeatherError("");
    } catch (error) {
      setWeatherError("Failed to fetch weather data.");
      console.error("Weather API Error:", error);
    }
  };

  // 🔹 Predict Next Period & Show Save Button
  const predictPeriod = () => {
    if (!lastPeriodDate || !cycleLength || isNaN(cycleLength)) {
      alert("Please enter a valid period date and cycle length.");
      return;
    }

    try {
      const nextPeriodDate = new Date(lastPeriodDate);
      nextPeriodDate.setDate(nextPeriodDate.getDate() + parseInt(cycleLength, 10));
      const formattedDate = nextPeriodDate.toISOString().split("T")[0];

      setPredictionResult(`Your next period is predicted to start on: ${formattedDate}`);
      setShowSaveButton(true);

      // 🔹 Generate Health Tips Based on Weather & Symptoms
      let tips = "💡 **Health Tips Based on Weather:**\n";

if (weatherData) {
  const { temp, humidity, pressure } = weatherData?.main || {};
  const condition = weatherData?.weather?.[0]?.description?.toLowerCase() || "";
  const windSpeed = weatherData?.wind?.speed || 0;

  // ✅ Temperature-Based Tips
  if (temp > 30) tips += "🌞 It's hot! Stay hydrated, avoid excessive outdoor activity, and eat water-rich fruits (watermelon, cucumber).\n";
  if (temp < 15) tips += "❄️ It's cold! Keep warm, drink herbal teas, and avoid sudden temperature changes to prevent cramps.\n";

  // ✅ Humidity-Based Tips
  if (humidity > 70) tips += "💦 High humidity can cause bloating. Wear breathable clothes and drink ginger tea to reduce discomfort.\n";
  if (humidity < 30) tips += "🌵 Low humidity can lead to dehydration and dry skin. Increase water intake and use moisturizer.\n";

  // ✅ Air Pressure-Based Tips
  if (pressure < 1010) tips += "🌫 Low air pressure might increase cramps. Light stretching or yoga can help.\n";
  if (pressure > 1020) tips += "🌤 High air pressure can reduce period pain. A short walk outside may help you feel better.\n";

  // ✅ Wind Speed-Based Tips
  if (windSpeed > 15) tips += "🍃 Windy weather can make you feel colder. Wear warm layers and avoid caffeine to prevent cramps.\n";

  // ✅ Seasonal Changes
  if (condition.includes("rain")) tips += "🌧️ Rainy weather? Stay cozy, avoid cold drinks, and keep your feet warm to ease cramps.\n";
  if (condition.includes("snow")) tips += "❄️ Snowy weather can make joints stiff. Light stretching or warm baths can help.\n";
  if (condition.includes("thunderstorm")) tips += "⛈ Thunderstorms can cause headaches. Reduce screen time and try chamomile tea.\n";
}

// ✅ Symptoms-Based Tips
if (symptoms === "mild") tips += "🤗 Mild symptoms? Stay hydrated and rest. A short walk might help you feel better.\n";
if (symptoms === "moderate") tips += "💃 Moderate symptoms? Try light exercise, a warm compress, and magnesium-rich foods (bananas, nuts).\n";
if (symptoms === "severe") tips += "⚕️ Severe symptoms? Consider a warm bath, relaxation techniques, and consulting a doctor if needed.\n";

setHealthTips(tips);

    } catch (error) {
      setComponentError("Error predicting period.");
      console.error("Prediction Error:", error);
    }
  };

  // 🔹 Save Period Data
  const savePeriodData = async () => {
    const currentUser = user || JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser.email) {
      setSaveMessage("❌ Please log in to save data.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/add-period", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.email,
          periodData: { date: lastPeriodDate, duration: parseInt(cycleLength, 10) },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSaveMessage("✅ Saved Successfully!");

        // ✅ Fetch Updated Data from Backend
        fetch(`http://localhost:5000/api/users/history?email=${currentUser.email}`)
          .then((res) => res.json())
          .then((history) => {
            const updatedUser = { ...currentUser, periodHistory: history };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            if (setUser) setUser(updatedUser);
          })
          .catch((error) => console.error("Error updating history:", error));
      } else {
        setSaveMessage("❌ Error saving data.");
      }
    } catch (error) {
      setSaveMessage("❌ Failed to save data.");
      console.error("❌ Save error:", error);
    }
  };

  // ✅ Handle Errors Gracefully
  if (componentError) {
    return (
      <div style={styles.errorContainer}>
        <h2>An Error Occurred</h2>
        <p>{componentError}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* 🔹 Weather Section */}
      <section style={styles.weatherSection}>
        <br></br>
        <br></br>
        <br></br>
        <h2>Weather Predictor</h2>
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        /><br></br><br></br>
        <button onClick={fetchWeather} style={styles.button}>Get Weather</button>
        {weatherError && <p style={styles.error}>{weatherError}</p>}
        {weatherData && (
          <div style={styles.weatherResult}>
            <p>Weather: {weatherData.weather?.[0]?.description || "N/A"}</p>
            <p>Temperature: {weatherData.main?.temp || "N/A"}°C</p>
          </div>
        )}
      </section>

      {/* 🔹 Period Predictor Section */}
      
<section style={styles.periodSection}>
<br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
  <h2>Period Predictor</h2>
  <br></br>
  <label style={styles.label} >Last Period Date:</label>
   
  <input
    type="date"
    value={lastPeriodDate}
    onChange={(e) => setLastPeriodDate(e.target.value)}
    style={styles.input}
  /><br></br>
  <label style={styles.label}>Cycle Length (days):</label>
  <input
    type="number"
    placeholder="e.g., 28"
    value={cycleLength}
    onChange={(e) => setCycleLength(e.target.value)}
    style={styles.input}
  /><br>
  </br>
   <label style={styles.label}>How are you feeling?</label>
  <select
    value={symptoms}
    onChange={(e) => setSymptoms(e.target.value)}
    style={styles.select}
  >
    <option value="none">No Symptoms</option>
    <option value="mild">Mild Symptoms</option>
    <option value="moderate">Moderate Symptoms</option>
    <option value="severe">Severe Symptoms</option>
  </select>


<br></br>

  <button onClick={predictPeriod} style={styles.button}>Predict Next Period</button>

  {/* 🔹 Show prediction result */}
  {predictionResult && (
    <p style={styles.predictionResult}>{predictionResult}</p>
  )}

  {/* 🔹 Show Health Tips if available */}
  {healthTips && (
    <div style={styles.healthTipsContainer}>
      <h3 style={styles.healthTipsTitle}>Health Tips Based on Weather</h3>
      <p style={styles.healthTips}>{healthTips}</p>
    </div>
  )}

  {/* 🔹 Show Save Button after Prediction */}
  {showSaveButton && (
    <button onClick={savePeriodData} style={styles.saveButton}>
      Save Period Data
    </button>
  )}

  {/* 🔹 Show Save Confirmation */}
  {saveMessage && <p style={styles.saveMessage}>{saveMessage}</p>}
</section>

    </div>
  );
};

// ✅ Styles
const styles = {
   
  errorContainer: {
    color: "#ff4d4d",
    textAlign: "center",
    padding: "20px",
    fontSize: "18px",
    backgroundColor: "#ffe6e6",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(255, 77, 77, 0.3)",
  },
  container: {
    width: "93.5vw",
    margin: "0 auto",
    padding: "40px",
    background: "linear-gradient(135deg, #f0f0f0, #ffffff)",
    color: "#333",
    lineHeight: "1.6",
    textAlign: "center",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "40%",
    padding: "12px",
    fontSize: "1rem",
    border: "2px solid #ff69b4",
    borderRadius: "8px",
    marginBottom: "15px",
    background: "#FFE4E1",
    color: "#333",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s ease",
  },
  select: {
    width: "40%",
    padding: "12px",
    fontSize: "1rem",
    border: "2px solid #ff69b4",
    borderRadius: "8px",
    marginBottom: "15px",
    background: "#ffffff",
    color: "#333",
    appearance: "none",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px 30px",
    fontSize: "1rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #ff69b4, #ff1493)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(255, 105, 180, 0.3)",
  },
  buttonHover: {
    background: "linear-gradient(135deg, #ff1493, #ff69b4)",
    transform: "scale(1.05)",
  },
  saveButton: {
    marginTop: "20px",
    background: "#FF1493",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(40, 167, 69, 0.3)",
  },
  saveMessage: {
    marginTop: "10px",
    fontSize: "1.1rem",
    color: "#28a745",
    fontWeight: "bold",
  },
  healthTipsContainer: {
    marginTop: "20px",
    padding: "20px",
    background: "#FFE4E1",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  healthTipsTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "15px",
  },
  healthTips: {
    fontSize: "1rem",
    lineHeight: "1.7",
    color: "#333",
    textAlign: "left",
  },
  weatherSection: {
    padding: "20px",
    backgroundColor: "#FFC0CB",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
  },
  periodSection: {
    padding: "20px",
    backgroundColor: "#FFC0CB",
    borderRadius: "10px",
    marginTop: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
  },
  label: {
    display: "block",
    fontSize: "1.1rem",
    color: "#333",
    textAlign: "left",
    marginBottom: "10px",
  },
  predictionResult: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#333",
    fontWeight: "bold",
  },
  weatherResult: {
    marginTop: "20px",
    padding: "15px",
    background: "#FFE4E1",
    borderRadius: "10px",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
  },
  error: {
    color: "#ff4d4d",
    marginTop: "10px",
  },
};

export default PeriodPredictor;


/*
const styles = {
  errorContainer: {  color: "red", textAlign: "center", padding: "20px", fontSize: "18px" },
  container: { maxWidth:"500px",padding: "20px", textAlign: "center" },
  input: { width: "100%", padding: "10px", marginBottom: "10px" },
  button: { padding: "10px", background: "#ff69b4", color: "#fff", cursor: "pointer" },
  saveButton: { marginTop: "10px", background: "#4CAF50", color: "#fff", padding: "10px" },
  saveMessage: { marginTop: "10px", color: "#00ff00" },
};*/

 
