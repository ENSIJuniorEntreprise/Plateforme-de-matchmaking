export default function CallToAction() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Effet de brillance/scintillement */
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
          gap: 10px;
          background: #FF540B !important;
          color: white !important;
          border: none !important;
          border-radius: 50px;
          padding: 18px 44px;
          font-size: 17px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          /* On ajoute une lueur externe constante au bouton */
          box-shadow: 0 0 20px rgba(255, 84, 11, 0.4), 0 4px 32px rgba(234,88,12,0.35);
          text-decoration: none;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          /* Lueur plus intense au survol */
          box-shadow: 0 0 30px rgba(255, 84, 11, 0.6), 0 8px 40px rgba(234,88,12,0.5);
          filter: brightness(1.1);
        }
      `}</style>

      <section
        style={{
          background: "#20222C",
          padding: "100px 20px 120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "'Sora', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Lueur radiale de fond un peu plus prononcée */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(255, 84, 11, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Heading */}
        <h2
          style={{
            margin: "0 0 20px",
            fontSize: "clamp(32px, 5.5vw, 56px)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
            animation: "fadeUp 0.7s ease both",
            animationDelay: "0.1s",
            maxWidth: 700,
            position: "relative",
            zIndex: 2,
          }}
        >
          Prêt à trouver votre{" "}
          <span className="text-shiny">match parfait ?</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            margin: "0 0 40px",
            fontSize: 18,
            color: "rgba(127,131,147, 0.8)",
            maxWidth: 520,
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

        {/* CTA Button */}
        <div
          style={{
            animation: "fadeUp 0.7s ease both",
            animationDelay: "0.4s",
            position: "relative",
            zIndex: 2,
          }}
        >
          <button className="cta-btn">
            Créer mon profil gratuitement <span style={{ fontSize: 20 }}>→</span>
          </button>
        </div>
      </section>
    </>
  );
}