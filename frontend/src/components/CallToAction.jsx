export default function CallToAction() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes shine {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(255, 84, 11, 0.5), 0 0 20px rgba(255, 84, 11, 0.3); }
          50% { opacity: 0.9; text-shadow: 0 0 15px rgba(255, 84, 11, 0.8), 0 0 30px rgba(255, 84, 11, 0.5); }
        }

        @keyframes moveGradient {
          to { background-position: 200% center; }
        }

        .text-shiny {
          background: linear-gradient(135deg, #FF540B 0%, #ff8c5a 50%, #FF540B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 3s ease-in-out infinite, moveGradient 5s linear infinite;
          display: inline-block;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #FF540B !important;
          color: white !important;
          border: none !important;
          border-radius: 50px;
          padding: 22px 56px;
          font-size: 20px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(255, 84, 11, 0.4), 0 4px 32px rgba(234,88,12,0.35);
          text-decoration: none;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(255, 84, 11, 0.6), 0 8px 40px rgba(234,88,12,0.5);
          filter: brightness(1.1);
        }
      `}</style>

      <section
        style={{
          background: "#20222C",
          minHeight: "100vh",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow de fond */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 600,
            background: "radial-gradient(ellipse, rgba(255, 84, 11, 0.14) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Titre */}
        <h2
          style={{
            margin: "0 0 28px",
            fontSize: "clamp(48px, 8vw, 80px)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            animation: "fadeUp 0.7s ease both",
            animationDelay: "0.1s",
            maxWidth: 850,
            position: "relative",
            zIndex: 2,
          }}
        >
          Prêt à trouver votre{" "}
          <span className="text-shiny">match parfait ?</span>
        </h2>

        {/* Sous-titre */}
        <p
          style={{
            margin: "0 0 52px",
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(127,131,147, 0.8)",
            maxWidth: 580,
            lineHeight: 1.7,
            animation: "fadeUp 0.7s ease both",
            animationDelay: "0.25s",
            position: "relative",
            zIndex: 2,
          }}
        >
          Rejoignez des milliers de professionnels qui accélèrent leur croissance grâce à
          des connexions intelligentes.
        </p>

        {/* Bouton */}
        <div
          style={{
            animation: "fadeUp 0.7s ease both",
            animationDelay: "0.4s",
            position: "relative",
            zIndex: 2,
          }}
        >
          <button className="cta-btn">
            Créer mon profil gratuitement <span style={{ fontSize: 22 }}>→</span>
          </button>
        </div>
      </section>
    </>
  );
}