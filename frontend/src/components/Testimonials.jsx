import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechFlow",
    quote:
      "\"MatchHub a complètement transformé notre approche du recrutement. En 2 semaines, nous avons trouvé 3 développeurs seniors parfaitement alignés avec notre culture.\"",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Thomas Dubois",
    role: "Partner, Venture Capital Plus",
    quote:
      "\"L'algorithme de matching est impressionnant. Nous avons découvert des startups prometteuses que nous n'aurions jamais trouvées autrement.\"",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Alexandre Petit",
    role: "Founder, GreenTech Solutions",
    quote:
      "\"Notre levée de fonds s'est concrétisée grâce à une connexion faite sur MatchHub. L'investisseur idéal était à portée de clic !\"",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Marie Chen",
    role: "Lead Developer, Freelance",
    quote:
      "\"En tant que freelance, trouver les bons projets était un défi. MatchHub me propose des missions qui correspondent exactement à mes compétences et aspirations.\"",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating) return;
      setAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 320);
    },
    [animating]
  );

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, "prev");
  const next = () => goTo((current + 1) % testimonials.length, "next");

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % testimonials.length, "next");
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const t = testimonials[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        @keyframes slideInNext {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInPrev {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutNext {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes slideOutPrev {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }

        .testimonial-card-enter-next {
          animation: slideInNext 0.32s ease forwards;
        }
        .testimonial-card-enter-prev {
          animation: slideInPrev 0.32s ease forwards;
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0);
          border: 1px solid rgba(255,255,255,0);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          font-size: 16px;
        }
        .nav-btn:hover {
          background: rgba(255,255,255,0);
        }
      `}</style>

      <section
        style={{
          background: "#20222C",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            Ce qu'ils{" "}
            <span style={{ color: "#ea580c" }}>en disent</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Des témoignages de professionnels qui ont transformé leur réseau.
          </p>
        </div>

        {/* Card */}
        <div style={{ width: "100%", maxWidth: 760, marginBottom: 40 }}>
          <div
            key={current}
            className={
              animating
                ? ""
                : direction === "next"
                ? "testimonial-card-enter-next"
                : "testimonial-card-enter-prev"
            }
            style={{
              background: "rgba(32,34,44)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "40px 44px",
              display: "flex",
              gap: 32,
              alignItems: "flex-start",
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.12)",
                }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.style.background = "#2a2a2e";
                  }}
                />
              </div>
              {/* Quote badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#FF540B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                "
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#FF540B", fontSize: 20 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: 15.5,
                  color: "rgba(255,255,255,0.85)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                {t.quote}
              </p>

              {/* Name & role */}
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#ffffff",
                    marginBottom: 2,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(127,131,147)",
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="nav-btn" onClick={prev} aria-label="Précédent">
            ‹
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? "#FF540B" : "rgba(127,131,147)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>

          <button className="nav-btn" onClick={next} aria-label="Suivant">
            ›
          </button>
        </div>
      </section>
    </>
  );
}