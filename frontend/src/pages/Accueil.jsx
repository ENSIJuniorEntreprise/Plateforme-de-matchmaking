import { useEffect, useRef } from "react";

// ─── Stars background (couvre toute la page) ──────────────────────────────────
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
      alpha: Math.random() * 0.5 + 0.2,
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
        position: "fixed",   // fixed = reste en place pendant le scroll
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,           // derrière tout le contenu
      }}
    />
  );
}

// ─── Stat ──────────────────────────────────────────────────────────────────────
function Stat({ value, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <span style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#f97316", letterSpacing: "-0.02em" }}>{value}</span>
      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem" }}>{label}</span>
    </div>
  );
}

// ─── Matching Graph ────────────────────────────────────────────────────────────
function MatchingGraph() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
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
    const typeColor = { startup: "#f97316", talent: "#38bdf8", investisseur: "#34d399" };
    const draw = () => {
      t += 0.008;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      edges.forEach(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const x1 = na.x*w, y1 = na.y*h, x2 = nb.x*w, y2 = nb.y*h;
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
        ctx.strokeStyle = "rgba(255,255,255,0.07)"; ctx.lineWidth = 1.5; ctx.stroke();
        const progress = ((t*0.6 + i*0.37) % 1);
        const px = x1 + (x2-x1)*progress, py = y1 + (y2-y1)*progress;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI*2);
        ctx.fillStyle = typeColor[nodes[a].type]; ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1;
      });
      nodes.forEach((n) => {
        const x = n.x*w, y = n.y*h, color = typeColor[n.type], r = 28;
        const grd = ctx.createRadialGradient(x,y,0,x,y,r*2);
        grd.addColorStop(0, color+"33"); grd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(x,y,r*2,0,Math.PI*2); ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fillStyle = "#1a2035"; ctx.fill();
        ctx.strokeStyle = color+"99"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = `bold ${r*0.65}px 'Sora',sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(n.id.slice(0,2), x, y);
        ctx.fillStyle = "#fff"; ctx.font = `600 12px 'Sora',sans-serif`; ctx.fillText(n.label, x, y+r+14);
        ctx.fillStyle = color; ctx.font = `500 10px 'Sora',sans-serif`;
        ctx.fillText(n.type.charAt(0).toUpperCase()+n.type.slice(1), x, y+r+28);
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <div style={{ width: "100%", maxWidth: "860px", margin: "0 auto" }}>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", padding: "16px" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "420px", display: "block" }} />
        <div style={{ display: "flex", gap: "24px", padding: "12px 16px 4px" }}>
          {[["#f97316","Startup"],["#38bdf8","Talent"],["#34d399","Investisseur"]].map(([color, label]) => (
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

// ─── Feature Card ──────────────────────────────────────────────────────────────
// Éclair avec cercle autour — comme dans le capture
const IconEclair = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M13 7l-4 5h5l-1 5 4-5h-5l1-5z" fill="#f97316" stroke="none" opacity="0.9" />
  </svg>
);

// Deux personnes avec + entre elles — matching
const IconPersonnes = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="3" />
    <path d="M1 20v-1a6 6 0 0 1 6-6" />
    <circle cx="17" cy="7" r="3" />
    <path d="M23 20v-1a6 6 0 0 0-6-6" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9"  y1="14" x2="15" y2="14" />
  </svg>
);

// Cible triple cercle avec point central — matching
const IconCible = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6"  />
    <circle cx="12" cy="12" r="2" fill="#f97316" stroke="none" />
  </svg>
);

// Flèche tendance haussière — matching
const IconGraphe = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 8 12 12 15 17 9 21 13" />
    <polyline points="16 6 21 6 21 11" />
    <line x1="21" y1="6" x2="17" y2="9" />
  </svg>
);

const FEATURES = [
  { icon: <IconEclair />,   title: "Matching Intelligent",   desc: "Notre algorithme analyse 50+ critères pour des connexions ultra-pertinentes." },
  { icon: <IconPersonnes />, title: "Communauté Qualifiée",  desc: "Startups, talents et investisseurs vérifiés et engagés." },
  { icon: <IconCible />,    title: "Précision Maximale",     desc: "Ciblage affiné pour des rencontres qui génèrent de la valeur." },
  { icon: <IconGraphe />,   title: "Croissance Accélérée",   desc: "Accédez aux ressources et connexions pour scaler rapidement." },
];

function FeatureCard({ icon, title, desc, index }) {
  return (
    <div className="feature-card" style={{
      background: "#ffffff",
      borderRadius: "28px",
      padding: "48px 36px",
      display: "flex", flexDirection: "column", gap: "24px",
      boxShadow: "0 8px 60px rgba(0,0,0,0.3)",
      cursor: "default",
      animation: `floatCard${index} ${3.5 + index * 0.4}s ease-in-out infinite`,
      minHeight: "260px",
    }}>
      <div style={{ width: "64px", height: "64px", background: "rgba(249,115,22,0.12)", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f1624", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HeroPage() {
  return (
    <div style={{
      background: "linear-gradient(160deg, #0f1624 0%, #111827 40%, #0c1320 100%)",
      fontFamily: "'Sora', sans-serif",
      color: "#fff",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.7s ease both 0.1s; }
        .fade-up-2 { animation: fadeUp 0.7s ease both 0.3s; }
        .fade-up-3 { animation: fadeUp 0.7s ease both 0.5s; }
        .fade-up-4 { animation: fadeUp 0.7s ease both 0.7s; }
        .fade-up-5 { animation: fadeUp 0.7s ease both 0.9s; }
        .fade-up-6 { animation: fadeUp 0.7s ease both 0.2s; }
        .fade-up-7 { animation: fadeUp 0.7s ease both 0.4s; }
        .fade-up-8 { animation: fadeUp 0.7s ease both 0.1s; }
        .fade-up-9 { animation: fadeUp 0.7s ease both 0.3s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        .bounce { animation: bounce 1.6s ease-in-out infinite; }

        .btn-primary { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(249,115,22,0.45); }
        .btn-outline { transition: background 0.2s; cursor: pointer; }
        .btn-outline:hover { background: rgba(249,115,22,0.12) !important; }

        .hero-glow {
          position: absolute; top: 30%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 380px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.13) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        @keyframes floatCard0 { 0%,100% { transform: translateY(0px); }    50% { transform: translateY(-12px); } }
        @keyframes floatCard1 { 0%,100% { transform: translateY(-8px); }   50% { transform: translateY(8px); } }
        @keyframes floatCard2 { 0%,100% { transform: translateY(0px); }    50% { transform: translateY(-10px); } }
        @keyframes floatCard3 { 0%,100% { transform: translateY(-6px); }   50% { transform: translateY(10px); } }

        .feature-card { transition: box-shadow 0.3s; }
        .feature-card:hover { box-shadow: 0 8px 60px rgba(249,115,22,0.25) !important; }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (max-width: 1000px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px)  { .cards-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* ★ Étoiles sur TOUT le fond (position: fixed) */}
      <StarCanvas />

      {/* ══════════ SECTION 1 — HERO ══════════ */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div className="hero-glow" />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px 40px", position: "relative", zIndex: 2 }}>

          <div className="fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "999px", padding: "6px 16px", marginBottom: "40px", fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.04)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", flexShrink: 0, boxShadow: "0 0 8px #f97316", display: "inline-block" }} />
            La plateforme de matching #1 en France
          </div>

          <h1 className="fade-up-2" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "8px", color: "#fff" }}>
            Connectez-vous
          </h1>
          <h1 className="fade-up-2" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f97316", marginBottom: "32px" }}>
            à votre succès
          </h1>

          <p className="fade-up-3" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.55)", maxWidth: "560px", lineHeight: 1.7, marginBottom: "48px" }}>
            Startups, talents &amp; investisseurs réunis par un moteur de matching intelligent. Trouvez vos partenaires idéaux en quelques clics.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "80px" }}>
            <button className="btn-primary" style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: "12px", padding: "16px 36px", fontSize: "1rem", fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: "8px" }}>
              Trouver mon match <span>→</span>
            </button>
            <button className="btn-outline" style={{ background: "transparent", color: "#f97316", border: "2px solid #f97316", borderRadius: "12px", padding: "16px 36px", fontSize: "1rem", fontWeight: 600, fontFamily: "inherit" }}>
              Découvrir la plateforme
            </button>
          </div>

          <div className="fade-up-5" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(24px, 6vw, 80px)", width: "100%", maxWidth: "780px" }}>
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

      {/* ══════════ SECTION 2 — MATCHING GRAPH ══════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px", position: "relative" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

        <div className="fade-up-6" style={{ textAlign: "center", marginBottom: "60px", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "16px", color: "#fff" }}>
            Matching en <span style={{ color: "#f97316" }}>temps réel</span>
          </h2>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Visualisez les connexions qui se créent entre startups, talents et investisseurs.
          </p>
        </div>

        <div className="fade-up-7" style={{ width: "100%", position: "relative", zIndex: 2 }}>
          <MatchingGraph />
        </div>
      </section>

      {/* ══════════ SECTION 3 — POURQUOI MATCHHUB ══════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 48px", position: "relative" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

        <div className="fade-up-8" style={{ textAlign: "center", marginBottom: "64px", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "16px", color: "#fff" }}>
            Pourquoi <span style={{ color: "#f97316" }}>MatchHub</span> ?
          </h2>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Une technologie de pointe au service de connexions significatives.
          </p>
        </div>

        <div className="fade-up-9 cards-grid" style={{ position: "relative", zIndex: 2 }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </section>

    </div>
  );
}