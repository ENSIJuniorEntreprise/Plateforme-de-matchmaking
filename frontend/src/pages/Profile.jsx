import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPatch, apiDelete, resolveAssetUrl } from "../api/client";

/* ── SVG Icons ──────────────────────────────────────────── */
const iconPaths = {
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  calendar: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z",
  users:    "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  star:     "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  share:    "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z",
  chat:     "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
  bolt:     "M7 2v11h3v9l7-12h-4l4-8z",
  edit:     "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
};

// Vrai pour un lien de prise de rendez-vous (Calendly/Cal.com) — permet d'afficher "Prendre RDV"
// plutôt que le libellé générique "Site web" quand c'est pertinent.
const isSchedulingLink = (link = "") => /calendly\.com|cal\.com/i.test(link);
const normalizeUrl = (link = "") => (/^https?:\/\//i.test(link) ? link : `https://${link}`);
const Ico = ({ n, s = 14, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c} className="shrink-0">
    <path d={iconPaths[n]} />
  </svg>
);

/* ── Circular Match Score (uniquement si un score de compatibilité a été transmis) ── */
function MatchScore({ score, onNavigate }) {
  const [prog, setProg] = useState(0);
  const R = 38, C = 2 * Math.PI * R;
  const hasScore = typeof score === "number";
  useEffect(() => {
    if (!hasScore) return;
    const t = setTimeout(() => setProg(score), 400);
    return () => clearTimeout(t);
  }, [score, hasScore]);

  return (
    <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.07]">
      {hasScore && (
        <>
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
        </>
      )}
      <button
        onClick={() => onNavigate("matchmaking")}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:scale-[1.02]"
      >
        <Ico n="bolt" s={14} c="#fff" /> Match
      </button>
    </div>
  );
}

/* ── Accomplishments ────────────────────────────────────── */
function Accomplishments({ items }) {
  if (!items?.length) return null;
  return (
    <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.07] mt-3">
      <p className="text-white font-bold text-sm mb-3">Accomplissement</p>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
<div key={i} className="bg-[#11141d] rounded-xl px-3 py-2 flex items-center gap-3 border border-white/[0.05] cursor-default"
  style={{ transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.25s ease" }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = "scale(1.06)";
    e.currentTarget.style.boxShadow = "0 4px 20px rgba(249,115,22,0.25)";
    e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
  }}
>            <span className="text-base">{item.icon || "🏆"}</span>
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

function EmptySection({ text }) {
  return <p className="text-sm text-gray-500 italic">{text}</p>;
}

/* ── Edit profile form field ───────────────────────────── */
const editInputCls = "w-full bg-[#11141d] text-white text-sm rounded-lg p-2.5 border border-white/10 outline-none focus:border-orange-500 transition-colors";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-400">{label}</span>
      {children}
    </label>
  );
}

/* ── Main Page ──────────────────────────────────────────── */
const TABS = ["A propos", "Competence", "Parcours"];

export default function ProfilePage({ onNavigate, userId, currentUser, matchScore }) {
  const targetId = userId || currentUser?._id;
  const isOwnProfile = Boolean(currentUser && targetId === currentUser._id);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(Boolean(targetId));
  const [error, setError] = useState("");

  const [tab, setTab]       = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [out, setOut]       = useState(false);
  const [dir, setDir]       = useState(1);
  const [favori, setFavori] = useState(false);
  const [favoriBusy, setFavoriBusy] = useState(false);
  const [partagerVisible, setPartagerVisible] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [sendingContact, setSendingContact] = useState(false);
  const [contactError, setContactError] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    if (!targetId) return undefined;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiGet(`/users/${targetId}`);
        if (!cancelled) setProfile(data.user);
      } catch (err) {
        if (!cancelled) setError(err.message || "Impossible de charger ce profil.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [targetId]);

  useEffect(() => {
    const favs = currentUser?.favorites || [];
    setFavori(favs.some((id) => String(id?._id || id) === String(targetId)));
  }, [currentUser, targetId]);

  async function toggleFavori() {
    if (!currentUser) {
      onNavigate && onNavigate("signin");
      return;
    }
    if (isOwnProfile || favoriBusy) return;

    const next = !favori;
    setFavori(next);
    setFavoriBusy(true);
    try {
      if (next) {
        await apiPost(`/users/me/favorites/${targetId}`);
      } else {
        await apiDelete(`/users/me/favorites/${targetId}`);
      }
      // Persiste localement pour que l'état des favoris survive à un rafraîchissement
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "null");
        if (stored) {
          const favorites = new Set((stored.favorites || []).map(String));
          if (next) favorites.add(String(targetId));
          else favorites.delete(String(targetId));
          stored.favorites = Array.from(favorites);
          localStorage.setItem("user", JSON.stringify(stored));
        }
      } catch {
        // pas bloquant pour l'action elle-même
      }
    } catch {
      setFavori(!next);
    } finally {
      setFavoriBusy(false);
    }
  }

  async function copyProfileLink() {
    const url = `${window.location.origin}/profile/${targetId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback pour les navigateurs sans permission Clipboard API (contexte non sécurisé, etc.)
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function closeContactModal() {
    setContactVisible(false);
    setContactMessage("");
    setContactError("");
  }

  async function handleSendContact() {
    const content = contactMessage.trim();
    if (!content || sendingContact) return;
    setSendingContact(true);
    setContactError("");
    try {
      await apiPost(`/messages/${targetId}`, { content });
      setContactVisible(false);
      setContactMessage("");
      onNavigate && onNavigate("messages", { contactId: targetId });
    } catch (err) {
      setContactError(err.message || "Échec de l'envoi du message.");
    } finally {
      setSendingContact(false);
    }
  }

  function openEdit() {
    setEditForm({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      company: profile.company || "",
      location: profile.location || "",
      link: profile.link || "",
      tagline: profile.tagline || "",
      founded: profile.founded || "",
      size: profile.size || "",
      description: profile.description || "",
      interests: (profile.interests || []).join(", "),
      tags: (profile.tags || []).join(", "),
    });
    setEditError("");
    setEditVisible(true);
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    if (savingEdit) return;
    setSavingEdit(true);
    setEditError("");
    try {
      const link = editForm.link.trim();
      const normalizedLink = link && !/^https?:\/\//i.test(link) ? `https://${link}` : link;
      const payload = {
        firstName: editForm.firstName.trim(),
        lastName: editForm.lastName.trim(),
        company: editForm.company.trim(),
        location: editForm.location.trim(),
        link: normalizedLink,
        tagline: editForm.tagline.trim(),
        founded: editForm.founded.trim(),
        size: editForm.size.trim(),
        description: editForm.description.trim(),
        interests: editForm.interests.split(",").map((s) => s.trim()).filter(Boolean),
        tags: editForm.tags.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const data = await apiPatch("/users/me", payload);
      setProfile(data.user);
      // Garde le localStorage synchronisé (nom affiché dans la Navbar, etc.)
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "null");
        if (stored) localStorage.setItem("user", JSON.stringify({ ...stored, ...data.user }));
      } catch {
        // pas bloquant
      }
      setEditVisible(false);
    } catch (err) {
      setEditError(err.message || "Échec de la mise à jour du profil.");
    } finally {
      setSavingEdit(false);
    }
  }

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

  if (!targetId) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-5">
        <div className="bg-[#1a1d27] rounded-2xl p-8 border border-white/[0.08] text-center max-w-sm">
          <p className="text-white font-bold text-lg mb-2">Connectez-vous</p>
          <p className="text-gray-400 text-sm mb-5">Vous devez être connecté pour consulter un profil.</p>
          <button
            onClick={() => onNavigate && onNavigate("signin")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-5">
        <p className="text-gray-400 text-sm">Chargement du profil…</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-5">
        <div className="bg-[#1a1d27] rounded-2xl p-8 border border-white/[0.08] text-center max-w-sm">
          <p className="text-white font-bold text-lg mb-2">Profil introuvable</p>
          <p className="text-gray-400 text-sm">{error || "Ce profil n'existe pas ou plus."}</p>
        </div>
      </div>
    );
  }

  const displayName = profile.company || profile.fullName || `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Profil";
  const subtitle = profile.tagline || profile.description || "";
  const avatarUrl = resolveAssetUrl(profile.avatarUrl);
  const initials = displayName.slice(0, 2).toUpperCase();
  const metaItems = [
    profile.location ? ["location", profile.location] : null,
    profile.founded ? ["calendar", profile.founded] : null,
    profile.size ? ["users", profile.size] : null,
  ].filter(Boolean);
  const tags = profile.tags?.length ? profile.tags : (profile.interests || []);
  const about = profile.about?.length ? profile.about : (profile.description ? [profile.description] : []);
  const skills = profile.skills || [];
  const parcours = profile.parcours || [];

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
              className="absolute left-3 sm:left-5 flex items-center justify-center rounded-2xl z-10 overflow-hidden"
              style={{
                top: "50%", transform: "translateY(-50%)",
                width: 100, height: 100,
                background: "#f97316",
                border: "3px solid #f97316",
                boxShadow: "0 4px 24px rgba(249,115,22,0.6)",
              }}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                <span className="text-white font-extrabold text-3xl tracking-tight">{initials}</span>
              )}
            </div>
          </div>

          {/* Info bar */}
          <div className="bg-[#1a1d27] flex flex-wrap items-start gap-4 pl-5 sm:pl-20 pr-5 py-3">

            {/* Name + meta */}
            <div className="flex-1 min-w-[180px]">
              <h1 className="flex items-center gap-2 text-white text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
                {displayName}
                {profile.isVerified && (
                  <span
                    title="Profil vérifié"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white"
                  >
                    ✓
                  </span>
                )}
              </h1>
              {subtitle && <p className="text-gray-400 text-xm mt-0.5">{subtitle}</p>}
              {metaItems.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  {metaItems.map(([ic, txt]) => (
                    <span key={txt} className="flex items-center gap-1 text-[15px] text-gray-400">
                      <Ico n={ic} s={12} c="#9ca3af" />{txt}
                    </span>
                  ))}
                </div>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {tags.map(t => (
                    <span key={t} className="px-3 py-0.5 rounded-full text-[11px] font-semibold text-orange-300 border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

{/* Action buttons */}
<div className="flex gap-2 flex-wrap pt-1 w-full lg:w-auto">

  {/* Ajouter aux favoris */}
  {!isOwnProfile && (
    <button
      onClick={toggleFavori}
      disabled={favoriBusy}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xm font-semibold transition-all duration-200 border hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-60 ${
        favori
          ? "bg-orange-500 text-white border-orange-500"
          : "border-orange-500/60 text-orange-400 bg-transparent"
      }`}
    >
      {favori ? "✓" : <Ico n="star" s={13} c="#fb923c" />}
      {favori ? "Ajouté aux favoris" : "Ajouter aux favoris"}
    </button>
  )}

  {/* Partager */}
  <button
    onClick={() => setPartagerVisible(true)}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-orange-500/60 text-orange-400 bg-transparent hover:border-orange-400 transition-all duration-200"
  >
    <Ico n="share" s={13} c="#fb923c" />
    Partager
  </button>

  {/* Prendre RDV (lien Calendly/Cal.com) ou Site web */}
  {profile.link && (
    <a
      href={normalizeUrl(profile.link)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-orange-500/60 text-orange-400 bg-transparent hover:border-orange-400 transition-all duration-200"
    >
      <Ico n={isSchedulingLink(profile.link) ? "calendar" : "share"} s={13} c="#fb923c" />
      {isSchedulingLink(profile.link) ? "Prendre RDV" : "Site web"}
    </a>
  )}

  {/* Contacter */}
  {!isOwnProfile && (
    <button
      onClick={() => setContactVisible(true)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all duration-200"
    >
      <Ico n="chat" s={13} c="#fff" />
      Contacter
    </button>
  )}

  {/* Modifier mon profil */}
  {isOwnProfile && (
    <button
      onClick={openEdit}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all duration-200"
    >
      <Ico n="edit" s={13} c="#fff" />
      Modifier mon profil
    </button>
  )}

</div>

{/* Modal Partager */}
{partagerVisible && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
  style={{ animation: "fadeIn 0.2s ease" }}>
  <div className="bg-[#1a1d27] rounded-2xl p-6 w-80 border border-white/10 shadow-2xl"
    style={{ animation: "popUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
      <h3 className="text-white font-bold text-lg mb-4 text-center">Partager ce profil</h3>

      <div className="bg-[#11141d] border border-white/10 rounded-xl px-3 py-2.5 mb-4 overflow-hidden">
        <p className="text-gray-400 text-xs truncate">{`${window.location.origin}/profile/${targetId}`}</p>
      </div>

      <button
        onClick={copyProfileLink}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${
          linkCopied ? "bg-green-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        {linkCopied ? "✓ Lien copié !" : "Copier le lien"}
      </button>

      <button
        onClick={() => setPartagerVisible(false)}
        className="w-full py-2 mt-3 rounded-xl text-sm font-semibold text-gray-400 border border-white/10 hover:border-white/30 transition-colors"
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
      <h3 className="text-white font-bold text-lg mb-4">Contacter {displayName}</h3>
      <textarea
        value={contactMessage}
        onChange={(e) => setContactMessage(e.target.value)}
        className="w-full bg-[#0f1117] text-white text-sm rounded-xl p-3 border border-white/10 resize-none outline-none focus:border-orange-500 transition-colors"
        rows={4}
        placeholder="Écrivez votre message..."
      />
      {contactError && (
        <p className="mt-2 text-xs font-medium text-[#ff7043]">{contactError}</p>
      )}
      <div className="flex gap-3 mt-4 justify-end">
        <button
          onClick={closeContactModal}
          disabled={sendingContact}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 border border-white/10 hover:border-white/30 transition-colors disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          onClick={handleSendContact}
          disabled={!contactMessage.trim() || sendingContact}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sendingContact ? "Envoi…" : "Envoyer"}
        </button>
      </div>
    </div>
  </div>
)}

{/* Modal Modifier mon profil */}
{editVisible && editForm && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    style={{ animation: "fadeIn 0.2s ease" }}>
    <div className="bg-[#1a1d27] rounded-2xl p-6 w-full max-w-lg border border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto"
      style={{ animation: "popUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
      <h3 className="text-white font-bold text-lg mb-4">Modifier mon profil</h3>
      <form onSubmit={handleSaveEdit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom">
            <input className={editInputCls} value={editForm.firstName}
              onChange={(e) => setEditForm((f) => ({ ...f, firstName: e.target.value }))} />
          </Field>
          <Field label="Nom">
            <input className={editInputCls} value={editForm.lastName}
              onChange={(e) => setEditForm((f) => ({ ...f, lastName: e.target.value }))} />
          </Field>
        </div>

        <Field label="Entreprise / Organisation">
          <input className={editInputCls} value={editForm.company}
            onChange={(e) => setEditForm((f) => ({ ...f, company: e.target.value }))} />
        </Field>

        <Field label="Titre affiché (tagline)">
          <input className={editInputCls} value={editForm.tagline}
            onChange={(e) => setEditForm((f) => ({ ...f, tagline: e.target.value }))} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Localisation">
            <input className={editInputCls} value={editForm.location}
              onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))} />
          </Field>
          <Field label="Fondée en">
            <input className={editInputCls} value={editForm.founded}
              onChange={(e) => setEditForm((f) => ({ ...f, founded: e.target.value }))} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Taille de l'équipe">
            <input className={editInputCls} value={editForm.size}
              onChange={(e) => setEditForm((f) => ({ ...f, size: e.target.value }))} />
          </Field>
          <Field label="Lien site web / LinkedIn">
            <input className={editInputCls} placeholder="www.monsite.com" value={editForm.link}
              onChange={(e) => setEditForm((f) => ({ ...f, link: e.target.value }))} />
          </Field>
        </div>

        <Field label="Description">
          <textarea rows={4} className={`${editInputCls} resize-none`} value={editForm.description}
            onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} />
        </Field>

        <Field label="Centres d'intérêt / secteurs (séparés par des virgules)">
          <input className={editInputCls} placeholder="Tech, Finance, IA" value={editForm.interests}
            onChange={(e) => setEditForm((f) => ({ ...f, interests: e.target.value }))} />
        </Field>

        <Field label="Tags affichés sur le profil (séparés par des virgules)">
          <input className={editInputCls} placeholder="Startup, Seed, B2B" value={editForm.tags}
            onChange={(e) => setEditForm((f) => ({ ...f, tags: e.target.value }))} />
        </Field>

        {editError && <p className="text-xs font-medium text-[#ff7043]">{editError}</p>}

        <div className="flex gap-3 mt-2 justify-end">
          <button
            type="button"
            onClick={() => setEditVisible(false)}
            disabled={savingEdit}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 border border-white/10 hover:border-white/30 transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={savingEdit}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingEdit ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </form>
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
 onMouseEnter={e => {
    e.currentTarget.style.transform = "scale(1.01)";
    e.currentTarget.style.boxShadow = "0 4px 20px rgba(249,115,22,0.25)";
    e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = out ? `translateX(${dir * 20}px) scale(0.982)` : "translateX(0) scale(1)";
    e.currentTarget.style.boxShadow = "";
    e.currentTarget.style.borderColor = "";
  }}
            >
              {/* A PROPOS */}
              {tab === 0 && (
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">A propos</h2>
                  {about.length > 0 ? about.map((p, i) => (
                    <p
                      key={i}
                      className={`text-base leading-relaxed text-gray-600 mb-3 ${i === 0 ? "font-semibold" : "font-normal"}`}
                      style={{ opacity: 0, animation: `fadeUp 0.42s ease ${i * 90}ms forwards` }}
                    >
                      {p}
                    </p>
                  )) : <EmptySection text="Aucune description disponible pour le moment." />}
                </div>
              )}

              {/* COMPÉTENCES */}
              {tab === 1 && (
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Compétences clés</h2>
                  {skills.length > 0 ? skills.map((s, i) => (
                    <SkillBar key={s.label + animKey} label={s.label} value={s.value} delay={i * 100} run={!out} />
                  )) : <EmptySection text="Aucune compétence renseignée pour le moment." />}
                </div>
              )}

              {/* PARCOURS */}
              {tab === 2 && (
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Notre parcours</h2>
                  {parcours.length > 0 ? parcours.map((item, i) => (
                    <TimelineItem
                      key={i + animKey} idx={i}
                      date={item.date} title={item.title} desc={item.desc}
                      isLast={i === parcours.length - 1}
                      run={!out}
                    />
                  )) : <EmptySection text="Aucun parcours renseigné pour le moment." />}
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-52 lg:shrink-0">
            <MatchScore score={matchScore} onNavigate={onNavigate} />
            <Accomplishments items={profile.accomplishments} />
          </div>

        </div>
      </div>
    </>
  );
}
