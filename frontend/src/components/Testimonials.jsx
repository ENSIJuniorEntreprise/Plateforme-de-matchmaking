import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechFlow",
    quote: "\"MatchHub a complètement transformé notre approche du recrutement. En 2 semaines, nous avons trouvé 3 développeurs seniors parfaitement alignés avec notre culture.\"",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Thomas Dubois",
    role: "Partner, Venture Capital Plus",
    quote: "\"L'algorithme de matching est impressionnant. Nous avons découvert des startups prometteuses que nous n'aurions jamais trouvées autrement.\"",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Alexandre Petit",
    role: "Founder, GreenTech Solutions",
    quote: "\"Notre levée de fonds s'est concrétisée grâce à une connexion faite sur MatchHub. L'investisseur idéal était à portée de clic !\"",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Marie Chen",
    role: "Lead Developer, Freelance",
    quote: "\"En tant que freelance, trouver les bons projets était un défi. MatchHub me propose des missions qui correspondent exactement à mes compétences et aspirations.\"",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [ctrlVisible, setCtrlVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTitleVisible(true);
          setTimeout(() => setCardVisible(true), 200);
          setTimeout(() => setCtrlVisible(true), 400);
        }
      });
    }, { threshold: 0.12 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback((index, dir = "next") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 320);
  }, [animating]);

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, "prev");
  const next = () => goTo((current + 1) % testimonials.length, "next");

  useEffect(() => {
    const timer = setInterval(() => { goTo((current + 1) % testimonials.length, "next"); }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const t = testimonials[current];

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
        @keyframes slideInNext { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInPrev { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        .testimonial-card-enter-next { animation: slideInNext 0.32s ease forwards; }
        .testimonial-card-enter-prev { animation: slideInPrev 0.32s ease forwards; }
        .nav-btn {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
          color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; font-size: 22px; font-family: 'Inter', sans-serif;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.08); border-color: #F97316; color: #F97316; }
        .test-title { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .test-title.visible { opacity: 1; transform: translateY(0); }
        .test-sub { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s; }
        .test-sub.visible { opacity: 1; transform: translateY(0); }
        .test-card-wrap { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s; }
        .test-card-wrap.visible { opacity: 1; transform: translateY(0); }
        .test-ctrl { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s; }
        .test-ctrl.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 600px) {
          .test-card-inner { flex-direction: column !important; align-items: center !important; padding: 28px 20px !important; }
        }
      `}</style>

      <section ref={sectionRef} style={{ background: "#20222C", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 className={`test-title${titleVisible ? " visible" : ""}`} style={{ margin: "0 0 14px", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
            Ce qu'ils <span className="text-shiny">en disent</span>
          </h2>
          <p className={`test-sub${titleVisible ? " visible" : ""}`} style={{ margin: 0, fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 500, lineHeight: 1.6 }}>
            Des témoignages de professionnels qui ont transformé leur réseau.
          </p>
        </div>

        <div className={`test-card-wrap${cardVisible ? " visible" : ""}`} style={{ width: "100%", maxWidth: 760, marginBottom: 40 }}>
          <div
            key={current}
            className={animating ? "" : direction === "next" ? "testimonial-card-enter-next" : "testimonial-card-enter-prev"}
            style={{ background: "rgba(32,34,44)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "40px 44px", display: "flex", gap: 32, alignItems: "flex-start", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
          >
            <div className="test-card-inner" style={{ display: "flex", gap: 32, alignItems: "flex-start", width: "100%" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.12)" }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; e.target.parentNode.style.background = "#2a2a2e"; }} />
                </div>
                <div style={{ position: "absolute", bottom: -4, right: -4, width: 32, height: 32, borderRadius: "50%", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 10px rgba(232,76,10,0.3)" }}>
                  "
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F97316", fontSize: 20 }}>★</span>)}
                </div>
                <p style={{ margin: "0 0 18px", fontSize: 15.5, color: "rgba(255,255,255,0.85)", fontStyle: "italic", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{t.quote}</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#ffffff", marginBottom: 2, fontFamily: "'Inter', sans-serif" }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "rgba(127,131,147)", fontFamily: "'Inter', sans-serif" }}>{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`test-ctrl${ctrlVisible ? " visible" : ""}`} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="nav-btn" onClick={prev} aria-label="Précédent">‹</button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? "next" : "prev")} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? "#F97316" : "rgba(127,131,147,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} aria-label={`Témoignage ${i + 1}`} />
            ))}
          </div>
          <button className="nav-btn" onClick={next} aria-label="Suivant">›</button>
        </div>
      </section>
    </>
  );
}