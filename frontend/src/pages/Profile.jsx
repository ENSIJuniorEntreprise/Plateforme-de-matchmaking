import { useState, useEffect } from "react";

/* ── Data ───────────────────────────────────────────────── */
const DATA = {
  name: "TechFlow AI",
  tagline: "Solution d'automatisation des workflows par IA générative",
  location: "Paris, France",
  founded: "Fondée en 2023",
  size: "11-50 employés",
  tags: ["AI/ML", "SaaS", "B2B", "Automatisation"],
  matchScore: 88,
  accomplishments: [
    { icon: "🏆", label: "Station F Batch 2023" },
    { icon: "📈", label: "€500k AAR" },
    { icon: "👥", label: "+100 clients" },
  ],
  about: [
    "TechFlow AI développe une plateforme SaaS révolutionnaire qui utilise l'intelligence artificielle générative pour automatiser les workflows complexes des entreprises.",
    "Notre solution permet aux équipes de réduire de 70% le temps passé sur les tâches répétitives, tout en améliorant la précision et la cohérence des processus métier.",
    "Nous recherchons activement des talents passionnés par l'IA et des investisseurs visionnaires pour nous accompagner dans notre phase de croissance.",
  ],
  skills: [
    { label: "Intelligence Artificielle", value: 95 },
    { label: "Automatisation",            value: 90 },
    { label: "Cloud Native",              value: 85 },
    { label: "API First",                 value: 88 },
    { label: "Entreprise Ready",          value: 80 },
  ],
  parcours: [
    { date: "Jan 2023", title: "Création",        desc: "Lancement de TechFlow AI" },
    { date: "Avr 2023", title: "Station F",        desc: "Intégration au programme" },
    { date: "Sep 2023", title: "Premiers Clients", desc: "10 entreprises pilotes" },
    { date: "Jan 2024", title: "Seed Round",       desc: "Levée de €2M" },
    { date: "Mai 2025", title: "Scale-Up",         desc: "100+ clients actifs" },
  ],
};

/* ── SVG Icons ──────────────────────────────────────────── */
const iconPaths = {
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  calendar: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z",
  users:    "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  star:     "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  share:    "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z",
  chat:     "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
  bolt:     "M7 2v11h3v9l7-12h-4l4-8z",
};
const Ico = ({ n, s = 14, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c} className="shrink-0">
    <path d={iconPaths[n]} />
  </svg>
);

/* ── Circular Match Score ───────────────────────────────── */
function MatchScore({ score }) {
  const [prog, setProg] = useState(0);
  const R = 38, C = 2 * Math.PI * R;
  useEffect(() => {
    const t = setTimeout(() => setProg(score), 400);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.07]">
      <p className="text-white font-bold text-sm text-center mb-4">
        Score de compatibilité
      </p>
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24">
          <svg width="96" height="96" viewBox="0 0 100 100" className="-rotate-90">
            <circle cx="50" cy="50" r={R} fill="none" stroke="#252836" strokeWidth="10" />
            <circle
              cx="50" cy="50" r={R} fill="none"
              stroke="#f97316" strokeWidth="10"  strokeLinecap="round"
              strokeDasharray={`${(prog / 100) * C} ${C}`}
              style={{ transition: "stroke-dasharray 1.4s cubic-bezier(0.34,1.4,0.64,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold text-white leading-none">{score}%</span>
            <span className="text-[10px] text-orange-400 font-semibold mt-0.5">Match</span>
          </div>
        </div>
      </div>
      <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:scale-[1.02]">
        <Ico n="bolt" s={14} c="#fff" /> Match
      </button>
    </div>
  );
}

/* ── Accomplishments ────────────────────────────────────── */
function Accomplishments({ items }) {
  return (
    <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.07] mt-3">
      <p className="text-white font-bold text-sm mb-3">Accomplissement</p>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="bg-[#11141d] rounded-xl px-3 py-2 flex items-center gap-3 border border-white/[0.05]">
            <span className="text-base">{item.icon}</span>
            <span className="text-gray-200 text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Skill Bar ──────────────────────────────────────────── */
function SkillBar({ label, value, delay, run }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!run) return;
    setW(0);
    const t = setTimeout(() => setW(value), 60 + delay);
    return () => clearTimeout(t);
  }, [run, value, delay]);

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-base font-bold text-gray-800">{label}</span>
        <span className="text-sm font-bold text-orange-500">{value}%</span>
      </div>
      <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${w}%`,
            background: "linear-gradient(90deg, #ea580c 0%, #f97316 60%, #fb923c 100%)",
            boxShadow: "0 0 10px rgba(249,115,22,0.45)",
            transition: `width 1s cubic-bezier(0.34,1.1,0.64,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Timeline Item ──────────────────────────────────────── */
function TimelineItem({ date, title, desc, isLast, idx, run }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!run) return;
    setVis(false);
    const t = setTimeout(() => setVis(true), idx * 130);
    return () => clearTimeout(t);
  }, [run, idx]);

  return (
    <div
      className="flex gap-4"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.42s ease, transform 0.42s ease",
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full shrink-0 mt-0.5"
          style={{
            background: "#f97316",
            border: "2px solid #fdba74",
            boxShadow: "0 0 8px rgba(249,115,22,0.55)",
          }}
        />
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1"
            style={{ background: "linear-gradient(to bottom, rgba(249,115,22,0.55), transparent)" }}
          />
        )}
      </div>
      <div className="pb-6">
        <span className="text-[11px] text-orange-500 font-bold tracking-widest uppercase">{date}</span>
        <p className="text-base font-bold text-gray-800 mt-0.5">{title}</p>
        <p className="text- text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────── */
const TABS = ["A propos", "Competence", "Parcours"];

export default function ProfilePage() {
  const [tab, setTab]       = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [out, setOut]       = useState(false);
  const [dir, setDir]       = useState(1);
  const [favori, setFavori] = useState(false);
  const [partagerVisible, setPartagerVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  function changeTab(i) {
    if (i === tab || out) return;
    setDir(i > tab ? 1 : -1);
    setOut(true);
    setTimeout(() => {
      setTab(i);
      setAnimKey(k => k + 1);
      setOut(false);
    }, 230);
  }

  return (
    <>
      <style>{`
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes popUp {
  from { opacity: 0; transform: scale(0.85) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
      `}</style>

      <div className="min-h-screen bg-[#0f1117] p-5">

        {/* ── Hero Card ── */}
        <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl mb-5">

          {/* Banner */}
          <div className="h-32 sm:h-40 lg:h-48 relative overflow-visible"
            style={{ background: "linear-gradient(130deg, #3b1208 0%, #6b2009 30%, #7c2d12 55%, #4a1609 80%, #2d0d05 100%)" }}
          >
            {/* Glow overlay */}
            <div className="absolute inset-0 overflow-hidden rounded-none"
              style={{ background: "radial-gradient(ellipse at 68% 55%, rgba(249,115,22,0.28) 0%, transparent 60%)" }} />
            {/* Pattern overlay */}
            <div className="absolute inset-0 overflow-hidden"
              style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.018) 35px, rgba(255,255,255,0.018) 36px)" }} />

            {/* Avatar — centered vertically on the banner */}
            <div
              className="absolute left-3 sm:left-5 flex items-center justify-center rounded-2xl z-10"
              style={{
                top: "50%", transform: "translateY(-50%)",
                width: 100, height: 100,
                background: "#f97316",
                border: "3px solid #f97316",
                boxShadow: "0 4px 24px rgba(249,115,22,0.6)",
              }}
            >
              <span className="text-white font-extrabold text-3xl tracking-tight">TF</span>
            </div>
          </div>

          {/* Info bar */}
          <div className="bg-[#1a1d27] flex flex-wrap items-start gap-4 pl-5 sm:pl-20 pr-5 py-3">

            {/* Name + meta */}
            <div className="flex-1 min-w-[180px]">
              <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">TechFlow AI</h1>
              <p className="text-gray-400 text-xm mt-0.5">Solution d'automatisation des workflows par IA générative</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {[["location","Paris, France"],["calendar","Fondée en 2023"],["users","11-50 employés"]].map(([ic, txt]) => (
                  <span key={txt} className="flex items-center gap-1 text-[15px] text-gray-400">
                    <Ico n={ic} s={12} c="#9ca3af" />{txt}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {DATA.tags.map(t => (
                  <span key={t} className="px-3 py-0.5 rounded-full text-[11px] font-semibold text-orange-300 border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>

{/* Action buttons */}
<div className="flex gap-2 flex-wrap pt-1 w-full lg:w-auto">

  {/* Ajouter aux favoris */}
  <button
    onClick={() => setFavori(!favori)}
    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xm font-semibold transition-all duration-200 border ${
      favori
        ? "bg-orange-500 text-white border-orange-500"
        : "border-orange-500/60 text-orange-400 bg-transparent"
    }`}
  >
    {favori ? "✓" : <Ico n="star" s={13} c="#fb923c" />}
    {favori ? "Ajouté aux favoris" : "Ajouter aux favoris"}
  </button>

  {/* Partager */}
  <button
    onClick={() => setPartagerVisible(true)}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-orange-500/60 text-orange-400 bg-transparent hover:border-orange-400 transition-all duration-200"
  >
    <Ico n="share" s={13} c="#fb923c" />
    Partager
  </button>

  {/* Contacter */}
  <button
    onClick={() => setContactVisible(true)}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all duration-200"
  >
    <Ico n="chat" s={13} c="#fff" />
    Contacter
  </button>

</div>

{/* Modal Partager */}
{partagerVisible && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
  style={{ animation: "fadeIn 0.2s ease" }}>
  <div className="bg-[#1a1d27] rounded-2xl p-6 w-80 border border-white/10 shadow-2xl"
    style={{ animation: "popUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
      <h3 className="text-white font-bold text-lg mb-5 text-center">Partager via</h3>
      <div className="flex justify-center gap-6 mb-6">

        {/* Facebook */}
        <a href="https://www.facebook.com/login" target="_blank" rel="noreferrer"
          className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-[#1877F2] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </div>
          <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Facebook</span>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/accounts/login" target="_blank" rel="noreferrer"
          className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200"
            style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
            </svg>
          </div>
          <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Instagram</span>
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/login" target="_blank" rel="noreferrer"
          className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-[#0A66C2] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </div>
          <span className="text-xs text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
        </a>

      </div>
      <button
        onClick={() => setPartagerVisible(false)}
        className="w-full py-2 rounded-xl text-sm font-semibold text-gray-400 border border-white/10 hover:border-white/30 transition-colors"
      >
        Fermer
      </button>
    </div>
  </div>
)}

{/* Modal Contacter */}
{contactVisible && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#1a1d27] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
      <h3 className="text-white font-bold text-lg mb-4">Contacter TechFlow AI</h3>
      <textarea
        className="w-full bg-[#0f1117] text-white text-sm rounded-xl p-3 border border-white/10 resize-none outline-none focus:border-orange-500 transition-colors"
        rows={4}
        placeholder="Écrivez votre message..."
      />
      <div className="flex gap-3 mt-4 justify-end">
        <button
          onClick={() => setContactVisible(false)}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 border border-white/10 hover:border-white/30 transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={() => setContactVisible(false)}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          Envoyer
        </button>
      </div>
    </div>
  </div>
)}
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* Left: tabs + content */}
          <div className="flex-1 min-w-0">

            {/* Tab bar */}
            <div className="bg-[#1a1d27] rounded-xl p-1.5 flex gap-1 border border-white/[0.07] mb-3">
              {TABS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => changeTab(i)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-250 ${
                    tab === i
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "text-gray-400 hover:text-white bg-transparent"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div
              className="bg-[#f1f2f5] rounded-2xl p-6 border border-black/[0.07] shadow-lg min-h-[280px] overflow-hidden"
              style={{
                opacity: out ? 0 : 1,
                transform: out ? `translateX(${dir * 20}px) scale(0.982)` : "translateX(0) scale(1)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
              }}
            >
              {/* A PROPOS */}
              {tab === 0 && (
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">A propos</h2>
                  {DATA.about.map((p, i) => (
                    <p
                      key={i}
                      className={`text-base leading-relaxed text-gray-600 mb-3 ${i === 0 ? "font-semibold" : "font-normal"}`}
                      style={{ opacity: 0, animation: `fadeUp 0.42s ease ${i * 90}ms forwards` }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {/* COMPÉTENCES */}
              {tab === 1 && (
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Compétences clés</h2>
                  {DATA.skills.map((s, i) => (
                    <SkillBar key={s.label + animKey} label={s.label} value={s.value} delay={i * 100} run={!out} />
                  ))}
                </div>
              )}

              {/* PARCOURS */}
              {tab === 2 && (
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Notre parcours</h2>
                  {DATA.parcours.map((item, i) => (
                    <TimelineItem
                      key={i + animKey} idx={i}
                      date={item.date} title={item.title} desc={item.desc}
                      isLast={i === DATA.parcours.length - 1}
                      run={!out}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-52 lg:shrink-0">
            <MatchScore score={DATA.matchScore} />
            <Accomplishments items={DATA.accomplishments} />
          </div>

        </div>
      </div>
    </>
  );
}
