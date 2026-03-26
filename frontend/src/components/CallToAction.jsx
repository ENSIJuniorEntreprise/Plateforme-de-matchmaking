export default function CallToAction() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
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
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 32px rgba(234,88,12,0.35);
  text-decoration: none;
}
.cta-btn:hover {
  background: #FF540B !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 40px rgba(234,88,12,0.5);
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
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 32px rgba(234,88,12,0.35);
  text-decoration: none;
}
.cta-btn:hover {
  background: #FF540B !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 40px rgba(234,88,12,0.5);
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
        {/* Subtle radial glow background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(234,88,12,0.08) 0%, transparent 70%)",
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
            maxWidth: 640,
          }}
        >
          Prêt à trouver votre{" "}
          <span style={{ color: "#FF540B" }}>match</span>
          <br />
          <span style={{ color: "#FF540B" }}>parfait</span> ?
        </h2>

        {/* Subtitle */}
        <p
          style={{
            margin: "0 0 40px",
            fontSize: 16,
            color: "rgba(127,131,147)",
            maxWidth: 480,
            lineHeight: 1.7,
            animation: "fadeUp 0.7s ease both",
            animationDelay: "0.25s",
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
          }}
        >
          <button className="cta-btn">
            Créer mon profil gratuitement <span style={{ fontSize: 18 }}>→</span>
          </button>
        </div>
      </section>
    </>
  );
}