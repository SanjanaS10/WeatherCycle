import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
 
const GraphPage = ({ user, setUser }) => {
  const [periodData, setPeriodData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 🔹 Auth States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [isSignup, setIsSignup] = useState(false); // 🔄 Toggle between Login & Signup

  // 🔹 Restore session & fetch history
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchPeriodHistory(storedUser.email);
    }
  }, [setUser]);

  // 🔹 Fetch period history
  const fetchPeriodHistory = async (email) => {
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/users/history?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        setPeriodData(data.length > 0 ? data : []);
      } else {
        setPeriodData([]);
        setError("No previous history found.");
      }
    } catch (err) {
      setError("Failed to fetch period history.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsLoggedIn(true);
        fetchPeriodHistory(data.user.email);
      } else {
        setError(data.message || "Invalid login credentials.");
      }
    } catch (err) {
      setError("Login failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Signup Function
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // ✅ Store new user in local storage & login
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsLoggedIn(true);
        fetchPeriodHistory(data.user.email);
      } else {
        // ❌ Handle signup errors
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setError("Signup failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };
  

  // 🔹 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    setPeriodData([]);
  };

  // 🔹 Chart rendering logic
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // ✅ Destroy previous chart to prevent duplicate rendering
    }

    if (periodData.length > 0 && chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: periodData.map((_, index) => `Cycle ${index + 1}`),
          datasets: [
            {
              label: "Cycle Duration (Days)",
              data: periodData.map((period) => period.duration || 0),
              borderColor: "#ff6f61",
              backgroundColor: "rgba(255, 111, 97, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [periodData]);

  return (
    <div style={styles.pageWrapper}> {/* Light pink full-page background */}
      <div style={styles.container}>
        {!isLoggedIn ? (
          <form onSubmit={isSignup ? handleSignup : handleLogin} style={styles.form}>
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Sign Up" : "Login"}
            </button>
            {error && <p style={styles.error}>{error}</p>}
  
            <p style={styles.signupText}>
              {isSignup ? "Already have an account?" : "New user?"}{" "}
              <button type="button" style={styles.signupButton} onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </form>
        ) : (
          <>
            <p>Logged in as {user?.email}</p>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
            {loading ? (
              <p>Loading...</p>
            ) : periodData.length > 0 ? (
              <div style={styles.graphContainer}>
                <canvas ref={chartRef} width="400" height="300"></canvas>
              </div>
            ) : (
              <p>No period history available. Add data to see the graph.</p>
            )}
          </>
        )}
  
        <div style={styles.footerGap}></div> {/* Adds spacing before the footer */}
      </div>
      {/* 🔹 Previous Cycle Data Table */}
{periodData.length > 0 && (
  <div style={styles.historyContainer}>
    <h3>Previous Cycle Data</h3>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Cycle Duration (Days)</th>
        </tr>
      </thead>
      <tbody>
        {periodData.map((period, index) => (
          <tr key={index}>
            <td style={styles.td}>{new Date(period.date).toLocaleDateString()}</td>
            <td style={styles.td}>{period.duration || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
  
   };
   const styles = {
    body:{
      backgroundImage:`url('C:\Users\sanjana\Desktop\WTprojs\women-health-climate2\my-react-app\src\assets\featurebg.jpeg')`

    },
    historyContainer: {
      marginLeft:"20px",
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#fff5f8",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      width: "90%",
      maxWidth: "600px",
      textAlign: "center",
    },
    
    table: {
      
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
    },
    
    th: {
      backgroundColor: "#ffb3b3",
      padding: "10px",
      borderBottom: "2px solid #ff6666",
      color: "#fff",
    },
    
    td: {
      padding: "8px",
      borderBottom: "1px solid #ffcccc",
    },
    
    pageWrapper: { 
      background: "linear-gradient(to right, #ffcccc, #ffe6e6)", // 🔥 Smooth gradient  
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px", 
    },
  
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "40vw",
      padding: "50px",
      borderRadius: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)", 
      textAlign: "center",
      width: "350px", // 🔹 Slightly wider form
      transition: "transform 0.3s ease-in-out", 
    },
  
    form: {  
      display: "flex", 
      flexDirection: "column", 
      gap: "12px",
      width: "100%",
    },
  
    input: { 
       
      width: "100%", 
      padding: "14px", 
      margin: "5px 0", 
      border: "2px solid #ffb3b3", // 🔥 Light pink border
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.3s",
    },
  
    inputFocus: {
      borderColor: "#ff6666", // 🔥 Darker pink when focused
    },
  
    button: { 
      marginLeft:"230px",
      width: "30%", 
      padding: "12px", 
      backgroundColor: "#d63384", // 🔥 Dark Pink (Login Button)
      color: "#fff", 
      border: "none", 
      borderRadius: "8px", 
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      transition: "background 0.3s ease-in-out",
    },
  
    buttonHover: {
      backgroundColor: "#b92e6f", // 🔥 Darker shade on hover
    },
  
    signupText: { 
      marginTop: "12px",
      fontSize: "14px",
      color: "#555",
    },
  
    signupButton: { 
      background: "none", 
      border: "none", 
      color: "#d63384", 
      fontWeight: "bold",
      cursor: "pointer",
      transition: "color 0.3s",
    },
  
    signupButtonHover: {
      color: "#b92e6f", // 🔥 Darker color on hover
    },
  
    error: { 
      color: "red",
      fontSize: "13px",
      fontWeight: "bold",
    },
  
    // 🔹 Bigger Graph
    graphContainer: {  
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "25px",
      width: "90%", // 🔥 Makes graph larger
      height: "400px", // 🔥 Increased height for better visibility
      maxWidth: "800px", // 🔹 Prevents it from becoming too wide
    },
  
    footerGap: {
      marginBottom: "60px", // 🔥 Slightly more spacing for better layout
    },
     
      
  
  
    // 🔹 Animations & Effects
    cardHover: {
      transform: "scale(1.02)", // 🔥 Slight scale-up on hover
    }
  };
  
  export default GraphPage;
  
  /*
   const styles = {
    pageWrapper: { 
      backgroundColor: "#ffe6e6", // Light pink background  
      minHeight: "100vh", // Full height of the viewport
      display: "flex",
      justifyContent: "center", // Center horizontally  
      alignItems: "center", // Center vertically  
    },
  
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "40vw", 
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      backgroundColor: "#ffffff", // White form background
      width: "300px", // Adjusted width for better centering
    },
  
    form: {  
      display: "flex", 
      flexDirection: "column", 
      gap: "10px"
    },
  
    input: { 
      width: "100%", 
      padding: "15px", 
      margin: "5px 0", 
      border: "1px solid #ccc", 
      borderRadius: "5px" 
    },
  
    button: { 
    
      width: "100%", 
      padding: "10px", 
      backgroundColor: "#000", 
      color: "#fff", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer" 
    },
  
    signupText: { 
      marginTop: "10px" 
    },
  
    signupButton: { 
      background: "none", 
      border: "none", 
      color: "blue", 
      cursor: "pointer" 
    },
  
    error: { 
      color: "red" 
    },
  
    graphContainer: {  
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },
  
    footerGap: {
      marginBottom: "50px" // Adds spacing before the footer
    }
  };
  
// ✅ Styles (Same as Before)
const styles = {
  lmao:{
    paddingBottom:"100px",
    backgroundColor: "#ffffff",

  },
   
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centers horizontally
    justifyContent: "center", // Centers vertically
    minHeight: "40vh", 
    minWidth:"40vw",// Takes full height of the viewport
    backgroundColor: "#ffffff",
    padding: "100px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "200px",
    margin: "0 auto", // Ensures horizontal centering
  },
  form: {  display: "flex", flexDirection: "column", gap: "10px"},
  input: { width: "100%", padding: "15px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "5px" },
  button: { width: "100%", padding: "10px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  signupText: { marginLeft:"20px",marginTop: "10px" },
  signupButton: { background: "none", border: "none", color: "blue", cursor: "pointer" },
  error: { color: "red" },

  graphContainer: {  
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",  
  },

  footerGap: {
    marginBottom: "50px"
    
     
  }
};*/
 