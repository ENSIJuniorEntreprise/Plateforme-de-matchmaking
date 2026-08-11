import { useEffect, useRef, useState } from "react";

export default function CallToAction({ onNavigate }) {
  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTitleVisible(true);
          setTimeout(() => setSubVisible(true), 180);
          setTimeout(() => setBtnVisible(true), 340);
        }
      });
    }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        @keyframes shine { 0%, 100% { opacity: 1; } 50% { opacity: 0.88; } }
        @keyframes moveGradient { to { background-position: 200% center; } }
        .text-shiny {
          background: linear-gradient(135deg, #F97316 0%, #f07040 50%, #F97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 3s ease-in-out infinite, moveGradient 5s linear infinite;
          display: inline-block;
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          background: #F97316 !important; color: white !important;
          border: none !important; border-radius: 50px;
          padding: 22px 56px; font-size: 20px; font-weight: 700;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 16px rgba(232,76,10,0.3), 0 4px 24px rgba(232,76,10,0.25);
          text-decoration: none;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(232,76,10,0.45), 0 8px 32px rgba(232,76,10,0.38);
          filter: brightness(1.08);
        }
        .cta-title { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .cta-title.visible { opacity: 1; transform: translateY(0); }
        .cta-sub { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .cta-sub.visible { opacity: 1; transform: translateY(0); }
        .cta-btn-wrap { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .cta-btn-wrap.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#20222C", minHeight: "100vh", padding: "0 20px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 600, background: "radial-gradient(ellipse, rgba(232,76,10,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

        <h2 className={`cta-title${titleVisible ? " visible" : ""}`} style={{ margin: "0 0 28px", fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 850, position: "relative", zIndex: 2 }}>
          Prêt à trouver votre{" "}<span className="text-shiny">match parfait ?</span>
        </h2>

        <p className={`cta-sub${subVisible ? " visible" : ""}`} style={{ margin: "0 0 52px", fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(127,131,147,0.8)", maxWidth: 580, lineHeight: 1.7, position: "relative", zIndex: 2 }}>
          Rejoignez des milliers de professionnels qui accélèrent leur croissance grâce à des connexions intelligentes.
        </p>

        <div className={`cta-btn-wrap${btnVisible ? " visible" : ""}`} style={{ position: "relative", zIndex: 2 }}>
          <button className="cta-btn" onClick={() => onNavigate && onNavigate("signup")}>
            Créer mon profil gratuitement <span style={{ fontSize: 22 }}>→</span>
          </button>
        </div>
      </section>
    </>
  );
}