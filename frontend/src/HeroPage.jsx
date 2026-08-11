import { useEffect, useRef, useState } from "react";

function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.6 + 0.2, twinkleSpeed: Math.random() * 0.01 + 0.003,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.0002, vy: (Math.random() - 0.5) * 0.0002,
      alpha: Math.random() * 0.3 + 0.1,
    }));
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha >= 0.8 || s.alpha <= 0.1) s.twinkleDir *= -1;
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`; ctx.fill();
      });
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${p.alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function Stat({ value, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <span className="text-shiny" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
        {value}
      </span>
      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

function MatchingGraph() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hoveredRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId, t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = [
      { id: "TE", label: "TechFlow",   type: "startup",      x: 0.28, y: 0.38 },
      { id: "AI", label: "AIBot",      type: "startup",      x: 0.42, y: 0.58 },
      { id: "GR", label: "GreenTech",  type: "startup",      x: 0.75, y: 0.65 },
      { id: "DE", label: "Designer",   type: "talent",       x: 0.28, y: 0.72 },
      { id: "DV", label: "Dev Senior", type: "talent",       x: 0.58, y: 0.55 },
      { id: "AN", label: "Angel",      type: "investisseur", x: 0.50, y: 0.28 },
      { id: "VC", label: "VC Capital", type: "investisseur", x: 0.78, y: 0.32 },
      { id: "FU", label: "Fund A",     type: "investisseur", x: 0.65, y: 0.82 },
    ];
    const edges = [[0,5],[0,1],[0,3],[1,3],[1,4],[2,6],[2,7],[4,5],[5,6],[2,4]];
    const typeColor = { startup: "#F97316", talent: "#38bdf8", investisseur: "#34d399" };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };
      const w = canvas.width, h = canvas.height;
      let found = null;
      nodes.forEach((n, i) => {
        const nx = n.x * w, ny = n.y * h;
        const dist = Math.sqrt((mx - nx) ** 2 + (my - ny) ** 2);
        if (dist < 40) found = i;
      });
      hoveredRef.current = found;
      canvas.style.cursor = found !== null ? "pointer" : "crosshair";
    };

    const handleMouseLeave = () => { hoveredRef.current = null; canvas.style.cursor = "crosshair"; };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      t += 0.008;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const hovered = hoveredRef.current;

      edges.forEach(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const x1 = na.x * w, y1 = na.y * h;
        const x2 = nb.x * w, y2 = nb.y * h;
        const isHighlighted = hovered !== null && (a === hovered || b === hovered);

        if (isHighlighted) {
          ctx.save();
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = "rgba(232,76,10,0.18)"; ctx.lineWidth = 8; ctx.stroke();
          ctx.restore();
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = "#F97316"; ctx.lineWidth = 2; ctx.stroke();
        } else {
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = hovered !== null ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)";
          ctx.lineWidth = 1.5; ctx.stroke();
        }

        if (!isHighlighted) {
          const progress = ((t * 0.6 + i * 0.37) % 1);
          const px = x1 + (x2 - x1) * progress;
          const py = y1 + (y2 - y1) * progress;
          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = typeColor[nodes[a].type];
          ctx.globalAlpha = hovered !== null ? 0.2 : 0.7;
          ctx.fill(); ctx.globalAlpha = 1;
        }
      });

      nodes.forEach((n, i) => {
        const x = n.x * w, y = n.y * h;
        const color = typeColor[n.type];
        const r = 28;
        const isHovered = hovered === i;
        const isDimmed = hovered !== null && !isHovered;

        const glowSize = isHovered ? r * 3 : r * 2;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        grd.addColorStop(0, isHovered ? color + "44" : color + "22");
        grd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.globalAlpha = isDimmed ? 0.3 : 1; ctx.fill(); ctx.globalAlpha = 1;

        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "#20222C"; ctx.globalAlpha = isDimmed ? 0.5 : 1; ctx.fill();
        ctx.strokeStyle = isHovered ? color : color + "99";
        ctx.lineWidth = isHovered ? 2.5 : 2; ctx.stroke(); ctx.globalAlpha = 1;

        ctx.fillStyle = isDimmed ? "rgba(255,255,255,0.4)" : "#fff";
        ctx.font = `bold ${r * 0.65}px 'Inter', sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(n.id.slice(0, 2), x, y);

        ctx.fillStyle = isDimmed ? "rgba(255,255,255,0.3)" : "#fff";
        ctx.font = `600 12px 'Inter', sans-serif`;
        ctx.fillText(n.label, x, y + r + 14);

        ctx.fillStyle = isDimmed ? "rgba(150,150,150,0.3)" : color;
        ctx.font = `500 10px 'Inter', sans-serif`;
        ctx.fillText(n.type.charAt(0).toUpperCase() + n.type.slice(1), x, y + r + 28);
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "980px", margin: "0 auto" }}>
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        overflow: "hidden",
        padding: "16px",
      }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "500px", display: "block", cursor: "crosshair" }}
        />
        <div style={{ display: "flex", gap: "24px", padding: "12px 16px 4px" }}>
          {[["#F97316", "Startup"], ["#38bdf8", "Talent"], ["#34d399", "Investisseur"]].map(([color, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} />
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const IconEclair = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M13 7l-4 5h5l-1 5 4-5h-5l1-5z" fill="#F97316" stroke="none" opacity="0.9" />
  </svg>
);
const IconPersonnes = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="3" /><path d="M1 20v-1a6 6 0 0 1 6-6" />
    <circle cx="17" cy="7" r="3" /><path d="M23 20v-1a6 6 0 0 0-6-6" />
    <line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);
const IconCible = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="#F97316" stroke="none" />
  </svg>
);
const IconGraphe = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 8 12 12 15 17 9 21 13" />
    <polyline points="16 6 21 6 21 11" /><line x1="21" y1="6" x2="17" y2="9" />
  </svg>
);

const FEATURES = [
  { icon: <IconEclair />,    title: "Matching Intelligent",  desc: "Notre algorithme analyse 50+ critères pour des connexions ultra-pertinentes." },
  { icon: <IconPersonnes />, title: "Communauté Qualifiée",  desc: "Startups, talents et investisseurs vérifiés et engagés." },
  { icon: <IconCible />,     title: "Précision Maximale",    desc: "Ciblage affiné pour des rencontres qui génèrent de la valeur." },
  { icon: <IconGraphe />,    title: "Croissance Accélérée",  desc: "Accédez aux ressources et connexions pour scaler rapidement." },
];

function FeatureCard({ icon, title, desc, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="feature-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#f5f5f5" : "#ffffff",
        borderRadius: "20px",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxShadow: hovered
          ? "0 12px 60px rgba(232,76,10,0.18), 0 4px 20px rgba(0,0,0,0.1)"
          : "0 4px 32px rgba(0,0,0,0.13)",
        cursor: "pointer",
        animation: `floatCard${index} ${3.5 + index * 0.4}s ease-in-out infinite`,
        fontFamily: "'Inter', sans-serif",
        border: hovered ? "1px solid rgba(232,76,10,0.3)" : "1px solid rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "box-shadow 0.3s, border 0.3s, background 0.3s, transform 0.3s",
      }}
    >
      <div style={{
        width: "48px", height: "48px",
        background: hovered ? "rgba(232,76,10,0.15)" : "rgba(232,76,10,0.10)",
        borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.3s",
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f1624", lineHeight: 1.3, margin: 0 }}>{title}</h3>
      <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>{desc}</p>
    </div>
  );
}

// Scroll animation hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function HeroPage({ onNavigate, user }) {
  const [sec2Ref, sec2Visible] = useScrollReveal(0.1);
  const [sec3Ref, sec3Visible] = useScrollReveal(0.1);

  // La recherche de matchs exige d'être connecté (route backend protégée) :
  // on envoie directement les visiteurs anonymes vers l'inscription.
  const handleFindMatch = () => {
    onNavigate && onNavigate(user ? "matchmaking" : "signup");
  };

  const handleDiscover = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      background: "linear-gradient(160deg, #20222C , #20222C 40%, #20222C 100%)",
      fontFamily: "'Inter', sans-serif",
      color: "#fff",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
        .hero-root * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.7s ease both 0.1s; }
        .fade-up-2 { animation: fadeUp 0.7s ease both 0.3s; }
        .fade-up-3 { animation: fadeUp 0.7s ease both 0.5s; }
        .fade-up-4 { animation: fadeUp 0.7s ease both 0.7s; }
        .fade-up-5 { animation: fadeUp 0.7s ease both 0.9s; }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal-title { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-title.visible { opacity: 1; transform: translateY(0); }
        .reveal-sub { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s; }
        .reveal-sub.visible { opacity: 1; transform: translateY(0); }
        .reveal-graph { opacity: 0; transform: translateY(50px); transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s; }
        .reveal-graph.visible { opacity: 1; transform: translateY(0); }
        .reveal-card-0 { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s; }
        .reveal-card-0.visible { opacity: 1; transform: translateY(0); }
        .reveal-card-1 { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s; }
        .reveal-card-1.visible { opacity: 1; transform: translateY(0); }
        .reveal-card-2 { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s; }
        .reveal-card-2.visible { opacity: 1; transform: translateY(0); }
        .reveal-card-3 { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s; }
        .reveal-card-3.visible { opacity: 1; transform: translateY(0); }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        .bounce { animation: bounce 1.6s ease-in-out infinite; }

        .btn-primary { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(232,76,10,0.35) !important; }
        .btn-outline { transition: background 0.2s; cursor: pointer; }
        .btn-outline:hover { background: rgba(232,76,10,0.10) !important; }

        .hero-glow {
          position: absolute; top: 30%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 380px;
          background: radial-gradient(ellipse, rgba(232,76,10,0.09) 0%, transparent 70%);
          pointer-events: none; z-index: 1;
        }

        @keyframes floatCard0 { 0%,100% { transform: translateY(0px); }    50% { transform: translateY(-12px); } }
        @keyframes floatCard1 { 0%,100% { transform: translateY(-8px); }   50% { transform: translateY(8px); } }
        @keyframes floatCard2 { 0%,100% { transform: translateY(0px); }    50% { transform: translateY(-10px); } }
        @keyframes floatCard3 { 0%,100% { transform: translateY(-6px); }   50% { transform: translateY(10px); } }

        @keyframes shine {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.88; }
        }
        .text-shiny {
          color: #F97316;
          background: linear-gradient(135deg, #F97316 0%, #f07040 50%, #F97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 3s ease-in-out infinite, moveGradient 5s linear infinite;
        }
        @keyframes moveGradient { to { background-position: 200% center; } }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 100%;
          padding: 0;
          position: relative;
          z-index: 2;
          align-items: end;
        }
        @media (max-width: 900px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .cards-grid { grid-template-columns: 1fr; }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 6vw, 80px);
          width: 100%;
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
      `}</style>

      <StarCanvas />

      {/* SECTION 1 — HERO */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div className="hero-glow" />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px 40px", position: "relative", zIndex: 2 }}>
          <div className="fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "999px", padding: "6px 16px", marginBottom: "40px", fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.04)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F97316", flexShrink: 0, boxShadow: "0 0 6px #F97316", display: "inline-block" }} />
            La plateforme de matching #1 en France
          </div>
          <h1 className="fade-up-2" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "8px", color: "#fff" }}>
            Connectez-vous
          </h1>
          <h1 className="fade-up-2 text-shiny" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "32px" }}>
            à votre succès
          </h1>
          <p className="fade-up-3" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.55)", maxWidth: "560px", lineHeight: 1.7, marginBottom: "48px" }}>
            Startups, talents &amp; investisseurs réunis par un moteur de matching intelligent. Trouvez vos partenaires idéaux en quelques clics.
          </p>
          <div className="fade-up-4" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "80px" }}>
            <button onClick={handleFindMatch} className="btn-primary" style={{ background: "#F97316", color: "#fff", border: "none", borderRadius: "12px", padding: "16px 36px", fontSize: "1rem", fontWeight: 700, fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 6px 24px rgba(232,76,10,0.28)", cursor: "pointer" }}>
              Trouver mon match <span>→</span>
            </button>
            <button onClick={handleDiscover} className="btn-outline" style={{ background: "transparent", color: "#F97316", border: "2px solid #F97316", borderRadius: "12px", padding: "16px 36px", fontSize: "1rem", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>
              Découvrir la plateforme
            </button>
          </div>
          <div className="fade-up-5 stats-grid">
            <Stat value="2,500+" label="Projets connectés" />
            <Stat value="850+"   label="Investisseurs actifs" />
            <Stat value="95%"    label="Taux de satisfaction" />
            <Stat value="€50M+"  label="Levées de fonds" />
          </div>
          <div className="bounce" style={{ marginTop: "56px", width: "28px", height: "44px", border: "2px solid rgba(255,255,255,0.25)", borderRadius: "14px", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "6px" }}>
            <div style={{ width: "4px", height: "8px", background: "rgba(255,255,255,0.4)", borderRadius: "2px" }} />
          </div>
        </main>
      </section>

      {/* SECTION 2 — MATCHING GRAPH */}
      <section ref={sec2Ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px", position: "relative" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
        <div className={`reveal-title${sec2Visible ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: "60px", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "16px", color: "#fff" }}>
            Matching en <span className="text-shiny">temps réel</span>
          </h2>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(127,131,147,1)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Visualisez les connexions qui se créent entre startups, talents et investisseurs.
          </p>
        </div>
        <div className={`reveal-graph${sec2Visible ? " visible" : ""}`} style={{ width: "100%", position: "relative", zIndex: 2 }}>
          <MatchingGraph />
        </div>
      </section>

      {/* SECTION 3 — POURQUOI MATCHHUB */}
      <section ref={sec3Ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 32px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(232,76,10,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
        <div className={`reveal-title${sec3Visible ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: "72px", position: "relative", zIndex: 2, width: "100%" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "16px", color: "#fff" }}>
            Pourquoi <span className="text-shiny">MatchHub</span> ?
          </h2>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(127,131,147,1)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Une technologie de pointe au service de connexions significatives.
          </p>
        </div>
        <div className="cards-grid" style={{ position: "relative", zIndex: 2 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`reveal-card-${i}${sec3Visible ? " visible" : ""}`}>
              <FeatureCard {...f} index={i} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}