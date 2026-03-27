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
        <path d="M12 2L9 9L2 9.27" opacity="0.3"/>
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
    <div
      style={{
        position: "relative",
        width: 72,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,84,11) 0%, rgba(234,88,12) 50%, transparent 75%)",
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />
      {/* Number badge */}
      <div
        style={{
          position: "absolute",
          top: -4,
          right: -4,
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "2px solid #FF540B",
          background: "#20222C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          color: "#FF540B",
          zIndex: 2,
          fontFamily: "inherit",
        }}
      >
        {step.number}
      </div>
      {/* Icon */}
      <div style={{ position: "relative", zIndex: 1 }}>{step.icon}</div>
    </div>
  );
}

function StepCard({ step, visible }) {
  const isLeft = step.side === "left";
  return (
    <div
      style={{
        background: "rgba(32,34,44)",
        border: "1px solid rgba(255,255,255)",
        borderRadius: 14,
        padding: "22px 28px",
        maxWidth: 300,
        backdropFilter: "blur(6px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : isLeft
          ? "translateX(-40px)"
          : "translateX(40px)",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontFamily: "'Sora', 'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#ffffff",
          textAlign: isLeft ? "center" : "left",
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: "'Sora', 'Outfit', sans-serif",
          fontSize: 13.5,
          color: "rgba(127,131,147)",
          lineHeight: 1.6,
          textAlign: isLeft ? "center" : "left",
        }}
      >
        {step.description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, i) => {
              setTimeout(() => {
                setVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        /* Animation de scintillement doux */
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
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#20222C",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 20px 100px",
          fontFamily: "'Sora', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60, zIndex: 1 }}>
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            Comment ça <span className="text-shiny">fonctionne</span> ?
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 440,
              lineHeight: 1.6,
            }}
          >
            De la création de votre profil à votre première connexion en 4 étapes simples.
          </p>
        </div>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 780,
            zIndex: 1,
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 10%, rgba(255,255,255,0.12) 90%, transparent)",
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => {
            const isLeft = step.side === "left";
            return (
              <div
                key={step.number}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: i < steps.length - 1 ? 80 : 0,
                  flexDirection: isLeft ? "row" : "row-reverse",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Card side */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: isLeft ? "flex-end" : "flex-start",
                    paddingRight: isLeft ? 40 : 0,
                    paddingLeft: isLeft ? 0 : 40,
                  }}
                >
                  <StepCard step={step} visible={visible[i]} />
                </div>

                {/* Center icon */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                  }}
                >
                  <StepIcon step={step} visible={visible[i]} />
                </div>

                {/* Empty side */}
                <div style={{ flex: 1 }} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}