import React from "react";

export default function Accueil({ onNavigate }) {
  return (
    <section
      id="top"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1a1d23, #20222C)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 16px",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>
        Bienvenue sur MatchHub 🚀
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#9ca3af", maxWidth: "600px", marginBottom: "32px" }}>
        La plateforme de matching intelligent qui connecte startups, talents et investisseurs
      </p>
      <div style={{ display: "flex", gap: "16px" }}>
        <button
          onClick={() => onNavigate && onNavigate('signup')}
          style={{
            backgroundColor: "#FF540B",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: "10px",
            border: "none",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e04800")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF540B")}
        >
          Commencer
        </button>
        <button
          onClick={() => onNavigate && onNavigate('signin')}
          style={{
            backgroundColor: "transparent",
            color: "#FF540B",
            padding: "12px 32px",
            borderRadius: "10px",
            border: "2px solid #FF540B",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FF540B";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#FF540B";
          }}
        >
          Connexion
        </button>
      </div>
    </section>
  );
} 