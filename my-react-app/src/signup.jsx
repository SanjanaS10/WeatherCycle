import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => navigate("/GraphPage"), 1500);
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("Error connecting to server.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign Up</button>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    
    width: "400px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  form: {
    marginLeft:"20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#ff6f61",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: { color: "red" },
  success: { color: "green" },
};

export default Signup;
