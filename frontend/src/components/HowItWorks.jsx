import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: 1,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/>
        <line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
    title: "Créez votre profil",
    description: "Renseignez vos compétences, votre projet ou vos critères d'investissement en quelques minutes.",
    side: "left",
  },
  {
    number: 2,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "L'algorithme analyse",
    description: "Notre moteur intelligent examine 50+ critères pour identifier les meilleures correspondances.",
    side: "right",
  },
  {
    number: 3,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        <circle cx="19" cy="4" r="2" fill="white" stroke="none"/>
        <circle cx="19" cy="4" r="1" fill="#1a1a1a" stroke="none"/>
      </svg>
    ),
    title: "Recevez vos matchs",
    description: "Découvrez des profils ultra-compatibles avec un score de matching détaillé.",
    side: "left",
  },
  {
    number: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Connectez-vous",
    description: "Entrez en contact direct et démarrez des collaborations fructueuses.",
    side: "right",
  },
];

function StepIcon({ step, visible }) {
  return (
    <div style={{
      position: "relative", width: 72, height: 72,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "opacity 0.6s ease, transform 0.6s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.7)",
    }}>
      <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,76,10,0.18) 0%, transparent 70%)", filter: "blur(10px)", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 16px rgba(232,76,10,0.12)", backdropFilter: "blur(8px)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: "50%", border: "1.5px solid rgba(232,76,10,0.65)", background: "rgba(20,22,30,0.85)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#F97316", zIndex: 3, fontFamily: "'Inter', sans-serif" }}>
        {step.number}
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>{step.icon}</div>
    </div>
  );
}

function StepCard({ step, visible }) {
  const isLeft = step.side === "left";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", maxWidth: 300, borderRadius: 20, padding: "24px 28px", overflow: "hidden", cursor: "pointer",
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        border: hovered ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        boxShadow: hovered
          ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 24px rgba(232,76,10,0.07)"
          : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateX(0) translateY(-4px) scale(1.02)" : "translateX(0)"
          : isLeft ? "translateX(-40px)" : "translateX(40px)",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: hovered ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", transition: "all 0.35s ease" }} />
      <div style={{ position: "absolute", bottom: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,76,10,0.14) 0%, transparent 70%)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }} />
      <h3 style={{ margin: "0 0 8px", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 16, color: "#ffffff", textAlign: isLeft ? "center" : "left" }}>{step.title}</h3>
      <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: "rgba(180,183,200,0.85)", lineHeight: 1.6, textAlign: isLeft ? "center" : "left" }}>{step.description}</p>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState([false, false, false, false]);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
            }, i * 200);
          });
        }
      });
    }, { threshold: 0.12 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        @keyframes shine {
          0%, 100% { opacity: 1; } 50% { opacity: 0.88; }
        }
        @keyframes moveGradient { to { background-position: 200% center; } }
        .text-shiny {
          background: linear-gradient(135deg, #F97316 0%, #f07040 50%, #F97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 3s ease-in-out infinite, moveGradient 5s linear infinite;
          display: inline-block;
        }
        .hiw-title { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .hiw-title.visible { opacity: 1; transform: translateY(0); }
        .hiw-sub { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s; }
        .hiw-sub.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 600px) {
          .timeline-row { flex-direction: column !important; align-items: center !important; }
          .timeline-row .card-side { padding: 0 !important; justify-content: center !important; display: flex; }
          .timeline-line { display: none !important; }
          .step-icon-wrap { position: static !important; transform: none !important; margin-bottom: 12px; }
        }
      `}</style>

      <section id="how-it-works" ref={sectionRef} style={{ background: "#20222C", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 20px 100px", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 60, zIndex: 1 }}>
          <h2 className={`hiw-title${titleVisible ? " visible" : ""}`} style={{ margin: "0 0 14px", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
            Comment ça <span className="text-shiny">fonctionne</span> ?
          </h2>
          <p className={`hiw-sub${titleVisible ? " visible" : ""}`} style={{ margin: 0, fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 440, lineHeight: 1.6 }}>
            De la création de votre profil à votre première connexion en 4 étapes simples.
          </p>
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: 780, zIndex: 1 }}>
          <div className="timeline-line" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 10%, rgba(255,255,255,0.12) 90%, transparent)", zIndex: 0 }} />
          {steps.map((step, i) => {
            const isLeft = step.side === "left";
            return (
              <div key={step.number} className="timeline-row" style={{ display: "flex", alignItems: "center", marginBottom: i < steps.length - 1 ? 80 : 0, flexDirection: isLeft ? "row" : "row-reverse", position: "relative", zIndex: 1 }}>
                <div className="card-side" style={{ flex: 1, display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start", paddingRight: isLeft ? 40 : 0, paddingLeft: isLeft ? 0 : 40 }}>
                  <StepCard step={step} visible={visible[i]} />
                </div>
                <div className="step-icon-wrap" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
                  <StepIcon step={step} visible={visible[i]} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}