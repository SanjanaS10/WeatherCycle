import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
 
import Signup from "./signup";
import "./App.css";
import image1 from "./assets/img1.png";
import Features from "./Features";
import image2 from "./assets/img2.jpg";
import logo from "./assets/logo.png";
 
import PeriodPredictor from "./periodpredictor";
import GraphPage from "./Graphpage";  

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  // ✅ User state for authentication
  const [user, setUser] = useState(null);

  // ✅ Check if a user is already logged in (localStorage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={logo} className="logo" alt="WeatherCycle logo"/>
          </div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/periodhistory">Period History</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section className="hero">
                  <div className="hero-content">
                    <h1 className="hero-title">Weather  Cycle</h1>
                    <p className="hero-subtitle">
                      Predict your menstrual cycle based on weather patterns.
                    </p>
                    <Link to="/period-predictor">
                      <button className="cta-button">Get Started</button>
                    </Link>
                  </div>
                </section>

                {/* Features Section */}
                <section className="features" id="features">
                
                  <h2>Why  Choose  Weather  Cycle?</h2>
                  <div className="feature-cards">
                    <div className="feature-card">
                      <h3>Weather-Integrated Tracking</h3>
                      <p>Predict cycle irregularities based on real-time weather conditions.</p>
                    </div>
                    <div className="feature-card">
                      <h3>Personalized Health Tips</h3>
                      <p>Get health recommendations tailored to climate and seasonal changes.</p>
                    </div>
                    <div className="feature-card">
                      <h3>Easy-to-Use Interface</h3>
                      <p>Track and visualize menstrual cycles for better understanding.</p>
                    </div>
                  </div>
                </section>

                {/* Weather Effects Section */}
                <section className="features" id="aff">
                  <h3>How Weather Affects the Menstrual Cycle</h3>
                  <p>
                    🌡 Temperature : Cold weather can lengthen cycles, while hot weather may shorten them.<br></br>  
                    💧Humidity: High humidity causes bloating; low humidity leads to dehydration.<br></br>
                    🌪 Air Pressure: Low pressure can trigger cramps, while high pressure may reduce pain.<br></br> 
                    ☀ Seasons: Winter reduces vitamin D, affecting mood; summer boosts serotonin levels.  
                  </p>
                </section>

                {/* Track Your Period Section */}
                <section className="features2">
                  <h2>Track Your Period</h2><br></br>
                  <div className="feature2-cards">
                    <div className="feature2-card"><br></br>
                      <h3>Graph Analysis</h3><br></br><br></br>
                      <p>Your menstrual cycle is unique, and understanding its patterns can help you take control of your health. With our interactive charts, you can visualize changes in cycle length, flow intensity, and symptom trends over time. By spotting irregularities early, you can make informed decisions and discuss any concerns with your healthcare provider. Whether you're tracking for health reasons, pregnancy planning, or simply self-awareness, our data-driven graphs offer valuable insights to keep you in sync with your body</p>
                    </div>
                    <img src={image1} id="image1" alt="Graph Analysis" />
                  </div>
                </section>

                <section className="features3">
                  <h2>Understand Your Cycle</h2><br></br>
                  <div className="feature3-cards">
                    <img src={image2} id="image2" alt="Cycle Insights" />  
                    <div className="feature3-card"><br></br>
                      <h3>Data-Driven Insights</h3><br></br><br></br>
                      <p>Your menstrual cycle is unique, and understanding its patterns can help you take control of your health. With our interactive charts, you can visualize changes in cycle length, flow intensity, and symptom trends over time. By spotting irregularities early, you can make informed decisions and discuss any concerns with your healthcare provider. Whether you're tracking for health reasons, pregnancy planning, or simply self-awareness, our data-driven graphs offer valuable insights to keep you in sync with your body</p>
                    </div>
                  </div>
                </section>
              </>
            }
          />
          <Route path="/period-predictor" element={<PeriodPredictor />} />
          <Route path="/features" element={<Features />} />
           
          <Route path="/signup" element={<Signup />} />
          
          {/* ✅ Pass user & setUser to GraphPage */}
          <Route path="/periodhistory" element={<GraphPage user={user} setUser={setUser} />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>WeatherCycle</h3>
              <p>Predict and track your menstrual cycle with weather-based insights.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/features">Features</Link></li>
                
                
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>Email: support@weathercycle.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} WeatherCycle. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
