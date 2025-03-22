import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Features = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation to Period Predictor
  const handleTrackPeriodsClick = () => {
    navigate("/period-predictor"); // Navigate to Period Predictor page
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.heading}>Features: Weather & Menstrual Health</h1>
        <p style={styles.subheading}>
          Discover how weather influences menstrual cycles and learn tips to manage your health effectively.
        </p>
      </header>

      {/* How Weather Affects Your Menstrual Cycle */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>🌦 How Weather Affects Your Menstrual Cycle</h2>
        <div style={styles.weatherEffects}>
          <div style={styles.weatherEffect}>
            <h3 style={styles.weatherEffectHeading}>Temperature & Cycle Length</h3>
            <p style={styles.weatherEffectText}>
              <strong>Cold Weather (Winter):</strong> Colder temperatures may lengthen cycles due to changes in melatonin and hormone levels.
            </p>
            <p style={styles.weatherEffectText}>
              <strong>Hot Weather (Summer):</strong> Warmer temperatures may shorten cycles and lead to heavier periods due to increased metabolism.
            </p>
          </div>
          <div style={styles.weatherEffect}>
            <h3 style={styles.weatherEffectHeading}>Humidity & PMS Symptoms</h3>
            <p style={styles.weatherEffectText}>
              <strong>High Humidity:</strong> Can cause bloating and water retention, making PMS symptoms worse.
            </p>
            <p style={styles.weatherEffectText}>
              <strong>Low Humidity:</strong> May cause dry skin and dehydration, leading to headaches or fatigue.
            </p>
          </div>
          <div style={styles.weatherEffect}>
            <h3 style={styles.weatherEffectHeading}>Air Pressure & Pain Sensitivity</h3>
            <p style={styles.weatherEffectText}>
              <strong>Low Air Pressure (before storms):</strong> Can trigger migraines or joint pain, making period cramps worse.
            </p>
            <p style={styles.weatherEffectText}>
              <strong>High Air Pressure:</strong> May reduce inflammation, slightly easing symptoms.
            </p>
          </div>
          <div style={styles.weatherEffect}>
            <h3 style={styles.weatherEffectHeading}>Seasonal Changes & Hormones</h3>
            <p style={styles.weatherEffectText}>
              <strong>Less Sunlight (Winter/Fall):</strong> Can lower vitamin D and serotonin, leading to mood swings, fatigue, or irregular periods.
            </p>
            <p style={styles.weatherEffectText}>
              <strong>More Sunlight (Spring/Summer):</strong> Can boost hormone balance and improve mood.
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Periods Using Weather */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>📅 Tracking Periods Using Weather</h2>
        <div style={styles.featureCards}>
          <div style={styles.featureCard} onClick={handleTrackPeriodsClick}>
            <h3 style={styles.featureCardHeading}>WeatherCycle Period Tracker</h3>
            <p style={styles.featureCardText}>
              Click here to predict your next period.
            </p>
          </div>
        </div>
      </section>

      {/* Weather-Based Health Tips */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>💡 Weather-Based Health Tips for Periods</h2>
        <div style={styles.healthTips}>
          <div style={styles.healthTip}>
            <h3 style={styles.healthTipHeading}>☀️ Hot Weather</h3>
            <p style={styles.healthTipText}>
              ✅ Stay hydrated to prevent bloating.<br />✅ Wear breathable clothing.<br />✅ Eat cooling foods like watermelon and cucumber.
            </p>
          </div>
          <div style={styles.healthTip}>
            <h3 style={styles.healthTipHeading}>❄️ Cold Weather</h3>
            <p style={styles.healthTipText}>
              ✅ Drink warm teas like ginger or chamomile.<br />✅ Keep warm to reduce muscle tension.<br />✅ Eat iron-rich foods to prevent fatigue.
            </p>
          </div>
          <div style={styles.healthTip}>
            <h3 style={styles.healthTipHeading}>🌧️ Rainy/Humid Weather</h3>
            <p style={styles.healthTipText}>
              ✅ Reduce salt intake to prevent bloating.<br />✅ Get enough vitamin D to boost mood.<br />✅ Avoid caffeine if prone to headaches.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styles
const styles = {
  
    container: {
      width: "96vw",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Arial', sans-serif",
      background: "pink",// Pink Gradient /* Black Gradient */
      color: "white",
      lineHeight: "1.6",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      marginTop: "59px",
    },
    heading: {
      fontSize: "2.5rem",
      color: "rgba(71, 2, 38, 0.9)", /* Light Pink */
      marginBottom: "10px",
      animation: "glow 2s infinite alternate",
    },
    subheading: {
      fontSize: "1.1rem",
      color: "white", /* Softer White */
    },
    section: {
      background: " #FDA4BA", /* Light Pink Transparent */
      borderRadius: "15px",
      boxShadow: "0px 8px 25px rgba(255, 182, 193, 0.2)", /* Pink Glow */
      padding: "40px",
      marginBottom: "40px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      backdropFilter: "blur(8px)",
      animation: "fadeIn 1s ease-in-out", /* Glass Effect */
    },
    sectionHeading: {
      fontSize: "2rem",
      color: "rgba(71, 2, 38, 0.9)", /* Teal */
      marginBottom: "20px",
    },
    weatherEffects: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
    },
    weatherEffect: {
      background: "rgba(0, 0, 0, 0.5)", /* Semi-Transparent Black */
      borderRadius: "15px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
      padding: "30px",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    weatherEffectHeading: {
      fontSize: "1.5rem",
      color: "#ffb6c1", /* Light Pink */
      marginBottom: "15px",
    },
    weatherEffectText: {
      fontSize: "1rem",
      color: "WHITE",
    },
    featureCards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
    },
    featureCard: {
      backgroundImage: "url('C:\Users\sanjana\Desktop\WTprojs\women-health-climate2\my-react-app\src\assets\featurebg.jpeg')",
        /* Semi-Transparent Black */
      borderRadius: "15px",
      boxShadow: "0px 8px 20px rgba(255, 182, 193, 0.3)", /* Pink Glow */
      padding: "30px",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    featureCardHeading: {
      fontSize: "1.8rem",
      color: "", /* Teal */
      marginBottom: "15px",
    },
    featureCardText: {
      fontSize: "1rem",
      color: "#ddd",
    },
    healthTips: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
    },
    healthTip: {
      background: "rgba(0, 0, 0, 0.5)", /* Semi-Transparent Black */
      borderRadius: "15px",
      boxShadow: "0px 8px 20px rgba(255, 182, 193, 0.3)", /* Pink Glow */
      padding: "30px",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    healthTipHeading: {
      fontSize: "1.5rem",
      color: "#ffb6c1", /* Light Pink */
      marginBottom: "15px",
    },
    healthTipText: {
      fontSize: "1rem",
      color: "#ddd",
    },
    "@media (max-width: 768px)": {
      weatherEffects: {
        gridTemplateColumns: "1fr",
      },
      featureCards: {
        gridTemplateColumns: "1fr",
      },
      healthTips: {
        gridTemplateColumns: "1fr",
      },
    },
    button: {
      padding: "12px 24px",
      fontSize: "1rem",
      fontWeight: "bold",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      background: "#ff6f91",
      color: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      animation: "bounce 2s infinite",
  },

  // 🔹 Keyframe animations
  "@keyframes fadeIn": {
      "0%": { opacity: 0, transform: "translateY(20px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
  },

  "@keyframes glow": {
      "0%": { textShadow: "0 0 5px rgba(255, 182, 193, 0.6)" },
      "100%": { textShadow: "0 0 15px rgba(255, 182, 193, 0.9)" },
  },

  "@keyframes bounce": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-5px)" },
  },

  "@media (max-width: 768px)": {
      section: {
          padding: "20px",
      },
      button: {
          fontSize: "0.9rem",
          padding: "10px 20px",
      },
  },
    
  

  
};

export default Features;