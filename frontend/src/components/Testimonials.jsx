import { useEffect, useRef, useState } from "react";

// Pas encore de témoignages réels côté produit — mieux vaut le dire honnêtement
// qu'attribuer des citations inventées à des personnes qui n'existent pas.
export default function Testimonials() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes shine { 0%, 100% { opacity: 1; } 50% { opacity: 0.88; } }
        @keyframes moveGradient { to { background-position: 200% center; } }
        .text-shiny {
          background: linear-gradient(135deg, #F97316 0%, #f07040 50%, #F97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 3s ease-in-out infinite, moveGradient 5s linear infinite;
          display: inline-block;
        }
        .test-wrap { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .test-wrap.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#20222C",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px",
          fontFamily: "inherit",
        }}
      >
        <div className={`test-wrap${visible ? " visible" : ""}`} style={{ textAlign: "center", maxWidth: 620 }}>
          <h2 style={{ margin: "0 0 14px", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
            On <span className="text-shiny">construit ça avec vous</span>
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
            MatchHub est une plateforme récente — pas encore d'historique à afficher, mais une équipe
            qui itère vite. Rejoignez les premiers membres et aidez-nous à façonner l'expérience.
          </p>
        </div>
      </section>
    </>
  );
}
