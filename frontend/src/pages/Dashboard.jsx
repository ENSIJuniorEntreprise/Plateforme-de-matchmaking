import React, { useEffect, useState } from "react";
import { Users, Eye, MessageSquare, TrendingUp, Zap, ChevronRight, Bell, UserPlus, Check, X } from "lucide-react";
import "../styles/dashboard-animations.css";
import { apiGet, apiPatch, resolveAssetUrl } from "../api/client";

// ─── Static config (icônes / styles, pas de données métier) ──────────────────

const STAT_DEFS = [
  { key: "matches",         label: "Matchs",      icon: Users,         iconClass: "text-[#f59e0b]", iconBgClass: "bg-[rgba(245,158,11,0.12)]", glowClass: "bg-[#f59e0b]", animClass: "animate-float-1" },
  { key: "profileViews",    label: "Vues profil", icon: Eye,           iconClass: "text-[#3b82f6]", iconBgClass: "bg-[rgba(59,130,246,0.12)]", glowClass: "bg-[#3b82f6]", animClass: "animate-float-2" },
  { key: "unreadMessages",  label: "Messages",    icon: MessageSquare, iconClass: "text-[#10b981]", iconBgClass: "bg-[rgba(16,185,129,0.12)]", glowClass: "bg-[#10b981]", animClass: "animate-float-3" },
  { key: "averageScore",    label: "Score",       icon: TrendingUp,    iconClass: "text-[#FF540B]", iconBgClass: "bg-[rgba(255,84,11,0.12)]",  glowClass: "bg-[#FF540B]", animClass: "animate-float-4", suffix: "%" },
];

const ROLE_META = {
  startup:      { icon: "🏢", label: "Startup" },
  talent:       { icon: "👤", label: "Talent" },
  investisseur: { icon: "💲", label: "Investisseur" },
  incubateur:   { icon: "🚀", label: "Incubateur" },
};

const NOTIF_TYPE_STYLES = {
  match:         { accentClass: "text-[#FF540B]", dotBgClass: "bg-[#FF540B]", dotShadowClass: "shadow-[0_0_7px_2px_#FF540B99]", hoverBgClass: "hover:bg-[rgba(255,84,11,0.08)]", hoverBorderClass: "hover:border-[rgba(255,84,11,0.18)]" },
  message:       { accentClass: "text-[#3b82f6]", dotBgClass: "bg-[#3b82f6]", dotShadowClass: "shadow-[0_0_7px_2px_#3b82f699]", hoverBgClass: "hover:bg-[rgba(59,130,246,0.08)]", hoverBorderClass: "hover:border-[rgba(59,130,246,0.18)]" },
  profile_view:  { accentClass: "text-[#10b981]", dotBgClass: "bg-[#10b981]", dotShadowClass: "shadow-[0_0_7px_2px_#10b98199]", hoverBgClass: "hover:bg-[rgba(16,185,129,0.08)]", hoverBorderClass: "hover:border-[rgba(16,185,129,0.18)]" },
  system:        { accentClass: "text-[#8A8FA8]", dotBgClass: "bg-[#8A8FA8]", dotShadowClass: "shadow-[0_0_7px_2px_#8A8FA899]", hoverBgClass: "hover:bg-[rgba(138,143,168,0.08)]", hoverBorderClass: "hover:border-[rgba(138,143,168,0.18)]" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function NotifCard({ notif, onRead, index }) {
  const isUnread = !notif.read;
  const style = NOTIF_TYPE_STYLES[notif.type] || NOTIF_TYPE_STYLES.system;
  return (
    <div
      onClick={() => onRead(notif._id)}
      style={{ animationDelay: `${index * 120}ms` }}
      className={`group relative cursor-pointer overflow-hidden rounded-[14px] border transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] animate-drop-bounce ${style.hoverBgClass} ${style.hoverBorderClass} ${isUnread ? "border-[rgba(255,255,255,0.11)] bg-[rgba(255,255,255,0.055)] shadow-[0_2px_14px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.06)]" : "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.015)] opacity-45"} px-[16px] py-[13px] hover:px-[16px] hover:pb-[16px] hover:pt-[14px]`}
    >
      {isUnread && (
        <div className={`absolute right-[12px] top-[13px] h-[7px] w-[7px] rounded-full ${style.dotBgClass} ${style.dotShadowClass}`} />
      )}
      <div className="flex items-center gap-[12px]">
        <span className={`text-[18px] transition-[filter] duration-300 ${notif.read ? "grayscale-[0.7]" : "grayscale-0"}`}>
          {notif.icon || "🔔"}
        </span>
        <span className={`font-sora text-[0.85rem] transition-colors duration-300 ${notif.read ? "font-medium text-[#555c6b]" : "font-bold text-white"}`}>
          {notif.title}
        </span>
        <ChevronRight className={`ml-auto h-4 w-4 opacity-40 transition-all duration-200 ease-in group-hover:translate-x-[3px] group-hover:opacity-100 ${isUnread ? "mr-[16px]" : "mr-0"} ${style.accentClass}`} />
      </div>
      <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:mt-[8px] group-hover:max-h-[80px] group-hover:opacity-100">
        <p className="font-sora m-0 text-[0.75rem] leading-[1.6] text-[#9ca3af]">
          {notif.detail}
        </p>
      </div>
    </div>
  );
}

function StatCard({ def, value }) {
  const Icon = def.icon;
  return (
    <div
      className={`stat-card group relative flex min-w-0 w-full flex-col gap-[12px] overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] px-[20px] py-[20px] transition-[border-color,box-shadow,transform] duration-300 ease-out ${def.animClass} hover:scale-[1.04] hover:border-[rgba(255,255,255,0.22)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:animate-stat-shadow-glow sm:flex-1 sm:basis-[calc(50%-8px)] lg:basis-0`}
    >
      <div className={`pointer-events-none absolute right-[-20px] top-[-20px] h-[80px] w-[80px] rounded-full opacity-15 blur-[35px] ${def.glowClass}`} />
      <div className="flex items-start justify-between">
        <div className={`flex h-[36px] w-[36px] items-center justify-center rounded-[10px] ${def.iconBgClass}`}>
          <Icon strokeWidth={2.2} className={`h-[18px] w-[18px] ${def.iconClass}`} />
        </div>
      </div>
      <div>
        <div className="font-sora text-[1.7rem] font-extrabold leading-none text-white sm:text-[1.9rem]">
          {value.toLocaleString("fr-FR")}{def.suffix || ""}
        </div>
        <div className="font-sora mt-[4px] text-[0.75rem] text-[#6b7280]">{def.label}</div>
      </div>
    </div>
  );
}

function MatchAvatar({ match }) {
  const src = resolveAssetUrl(match.avatarUrl);
  if (src) {
    return <img src={src} alt={match.name} className="h-[42px] w-[42px] shrink-0 rounded-[10px] border border-[rgba(255,255,255,0.1)] object-cover transition-all duration-300 group-hover:border-[rgba(255,84,11,0.4)] group-hover:shadow-[0_0_12px_rgba(255,84,11,0.3)]" />;
  }
  return (
    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[#2A2D3E] text-[0.9rem] font-bold text-[#FF540B] transition-all duration-300 group-hover:border-[rgba(255,84,11,0.4)]">
      {match.name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

function MatchRow({ match, index, onNavigate }) {
  const roleMeta = ROLE_META[match.role] || { icon: "👤", label: match.role };
  return (
    <div
      onClick={() => onNavigate && onNavigate("profile", { userId: match.id, compatibilityScore: match.match })}
      style={{ animationDelay: `${index * 150}ms` }}
      className="match-row group animate-slide-in-right flex cursor-pointer items-center gap-[12px] rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-[14px] py-[12px] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-[rgba(255,84,11,0.3)] hover:bg-[rgba(255,84,11,0.06)] hover:shadow-[0_4px_20px_rgba(255,84,11,0.15)] hover:scale-[1.03] hover:z-10"
    >
      <MatchAvatar match={match} />
      <div className="flex-1 min-w-0">
        <div className="font-sora text-[0.95rem] font-bold text-white truncate transition-colors duration-200 group-hover:text-[#FF540B]">{match.name}</div>
        <div className="font-sora mt-[2px] text-[0.82rem] font-semibold text-[#6b7280]">{roleMeta.icon} {roleMeta.label}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="font-sora text-[1rem] font-extrabold leading-none text-[#FF540B] transition-all duration-300 group-hover:scale-110 animate-pulse-glow">{match.match}%</div>
        <div className="font-sora mt-[3px] text-[0.72rem] font-extrabold text-[#6b7280]">Match</div>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <p className="font-sora py-[24px] text-center text-[0.82rem] text-[#6b7280]">{text}</p>
  );
}

function ConnectionRequestCard({ connection, index, busy, onRespond }) {
  const requester = connection.requester;
  const roleMeta = ROLE_META[requester?.role] || { icon: "👤", label: requester?.role };
  const name = requester?.company || `${requester?.firstName || ""} ${requester?.lastName || ""}`.trim() || "Utilisateur";

  return (
    <div
      style={{ animationDelay: `${index * 120}ms` }}
      className="animate-drop-bounce flex flex-wrap items-center gap-[12px] rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-[14px] py-[12px] transition-all duration-300"
    >
      <MatchAvatar match={{ avatarUrl: requester?.avatarUrl, name }} />
      <div className="min-w-0 flex-1">
        <div className="font-sora truncate text-[0.95rem] font-bold text-white">{name}</div>
        <div className="font-sora mt-[2px] text-[0.78rem] font-semibold text-[#6b7280]">
          {roleMeta.icon} {roleMeta.label} · {connection.compatibilityScore}% compatibilité
        </div>
      </div>
      <div className="flex shrink-0 gap-[8px]">
        <button
          disabled={busy}
          onClick={() => onRespond(connection._id, "accepted")}
          className="font-sora flex cursor-pointer items-center gap-[6px] rounded-[10px] border-none bg-[#FF540B] px-[14px] py-[8px] text-[0.78rem] font-bold text-white transition-all duration-200 hover:bg-[#e04800] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check strokeWidth={2.5} className="h-[14px] w-[14px]" />
          {busy ? "..." : "Accepter"}
        </button>
        <button
          disabled={busy}
          onClick={() => onRespond(connection._id, "declined")}
          className="font-sora flex cursor-pointer items-center gap-[6px] rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-transparent px-[14px] py-[8px] text-[0.78rem] font-bold text-[#9ca3af] transition-all duration-200 hover:border-[rgba(255,255,255,0.25)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X strokeWidth={2.5} className="h-[14px] w-[14px]" />
          {busy ? "..." : "Refuser"}
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Dashboard({ onNavigate, user }) {
  const [stats, setStats] = useState(null);
  const [matches, setMatches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [respondingId, setRespondingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [statsRes, matchesRes, notifRes, connectionsRes] = await Promise.all([
          apiGet("/dashboard/stats"),
          apiGet("/dashboard/recent-matches"),
          apiGet("/dashboard/notifications"),
          apiGet("/matches/connections?status=pending"),
        ]);
        if (cancelled) return;
        setStats(statsRes.stats);
        setMatches(matchesRes.matches || []);
        setNotifications(notifRes.notifications || []);
        // Seules les demandes où l'utilisateur connecté est le destinataire
        setPendingRequests(
          (connectionsRes.connections || []).filter(
            (c) => String(c.recipient?._id || c.recipient) === String(user?._id)
          )
        );
      } catch (err) {
        if (!cancelled) setError(err.message || "Impossible de charger le tableau de bord.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [user?._id]);

  const respondToRequest = async (id, status) => {
    setRespondingId(id);
    try {
      await apiPatch(`/matches/connections/${id}`, { status });
      setPendingRequests((prev) => prev.filter((c) => c._id !== id));
    } catch {
      // échec réseau : la demande reste affichée, l'utilisateur peut réessayer
    } finally {
      setRespondingId(null);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id) => {
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    try {
      await apiPatch(`/dashboard/notifications/${id}/read`);
    } catch {
      // état local déjà mis à jour ; on ignore l'échec réseau ici
    }
  };

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await apiPatch("/dashboard/notifications/read-all");
    } catch {
      // idem
    }
  };

  return (
    <div className="font-sora min-h-screen bg-[#14161e] px-[clamp(12px,4vw,48px)] pb-[60px] pt-[32px] sm:pt-[40px] perspective-[1000px]">

        {/* ── Welcome ── */}
        <div className="mb-[32px] text-center sm:mb-[40px]">
          <h1 className="m-0 text-[clamp(1.4rem,3vw,2.2rem)] font-extrabold text-white">
            Bonjour, <span className="text-[#FF540B]">{user?.firstName || user?.fullName || "vous"} 👋</span>
          </h1>
          <p className="mt-[6px] text-[0.85rem] text-[#6b7280]">Voici votre tableau de bord interactif</p>
        </div>

        {error && (
          <p className="mb-[24px] rounded-[12px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-[16px] py-[10px] text-center text-[0.82rem] font-medium text-[#ff7043]">
            {error}
          </p>
        )}

        {/* ── Stat cards ── */}
        <div className="mb-[40px] flex flex-wrap gap-[14px] sm:mb-[48px] sm:gap-[16px]">
          {STAT_DEFS.map((def) => (
            <StatCard key={def.key} def={def} value={loading ? 0 : (stats?.[def.key] ?? 0)} />
          ))}
        </div>

        {/* ── Matches + Notifications ── */}
        <div className="mb-[40px] grid grid-cols-1 items-start gap-[32px] lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_360px]">

          {/* Matchs récents */}
          <div className="animate-matches-float relative z-1 rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[20px] sm:p-[28px] backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_30px_rgba(255,84,11,0.4)] hover:z-10" style={{ animationDelay: '0s' }}>
            <div className="mb-[18px] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Users className="h-5 w-5 text-[#FF540B]" />
                <h2 className="m-0 text-[1rem] font-extrabold text-white sm:text-[1.05rem]">Matchs récents</h2>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] matches-container">
              {loading ? (
                <EmptyState text="Chargement…" />
              ) : matches.length === 0 ? (
                <EmptyState text="Aucun match pour l'instant. Lancez une recherche pour trouver vos premiers matchs !" />
              ) : (
                matches.map((m, i) => <MatchRow key={m.id} match={m} index={i} onNavigate={onNavigate} />)
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="animate-notifications-rotate relative z-1 rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[20px] sm:p-[28px] backdrop-blur-md min-h-[330px] transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_30px_rgba(255,84,11,0.4)] hover:z-10" style={{ animationDelay: '-2.5s' }}>
            <div className="mb-[18px] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <div className="relative">
                  <Bell className={`h-5 w-5 text-[#FF540B] ${unreadCount > 0 ? 'animate-bell-shake' : ''}`} />
                  {unreadCount > 0 && (
                    <div className="font-sora absolute right-[-8px] top-[-7px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full border-[2px] border-[#14161e] bg-[#FF540B] px-[3px] text-[0.6rem] font-extrabold leading-none text-white shadow-[0_0_8px_rgba(255,84,11,0.6)]">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <h2 className="m-0 text-[1rem] font-extrabold text-white sm:text-[1.05rem]">Notifications</h2>
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="font-sora cursor-pointer border-none bg-transparent text-[0.72rem] font-semibold text-[#6b7280] transition-colors duration-200 ease-in hover:text-[#FF540B]">
                  Tout lire
                </button>
              )}
            </div>
            <div className="flex flex-col gap-[10px]">
              {loading ? (
                <EmptyState text="Chargement…" />
              ) : notifications.length === 0 ? (
                <EmptyState text="Aucune notification pour le moment." />
              ) : (
                notifications.map((n, i) => <NotifCard key={n._id} notif={n} onRead={markAsRead} index={i} />)
              )}
            </div>
          </div>
        </div>

        {/* ── Demandes reçues ── */}
        {!loading && pendingRequests.length > 0 && (
          <div className="mb-[40px] rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[20px] backdrop-blur-md sm:mb-[48px] sm:p-[28px]">
            <div className="mb-[18px] flex items-center gap-[10px]">
              <UserPlus className="h-5 w-5 text-[#FF540B]" />
              <h2 className="m-0 text-[1rem] font-extrabold text-white sm:text-[1.05rem]">Demandes reçues</h2>
              <span className="font-sora flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#FF540B] px-[6px] text-[0.7rem] font-extrabold text-white">
                {pendingRequests.length}
              </span>
            </div>
            <div className="flex flex-col gap-[10px]">
              {pendingRequests.map((c, i) => (
                <ConnectionRequestCard
                  key={c._id}
                  connection={c}
                  index={i}
                  busy={respondingId === c._id}
                  onRespond={respondToRequest}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA Banner ── */}
        <div className="animate-cta-bounce relative z-1 overflow-hidden rounded-[20px] border border-[rgba(255,84,11,0.15)] bg-[rgba(255,255,255,0.03)] px-[20px] py-[36px] text-center sm:px-[28px] sm:py-[40px] backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_30px_rgba(255,84,11,0.4)] hover:z-10" style={{ animationDelay: '-1.2s' }}>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120px] w-[300px] bg-[#FF540B] opacity-[0.07] blur-[80px] animate-rotate-glow" />
          <div className="animate-levitate inline-block">
            <Zap strokeWidth={2.5} className="mb-[12px] h-5 w-5 text-[#FF540B]" />
          </div>
          <h3 className="m-0 mb-[6px] text-[1rem] font-extrabold text-white sm:text-[1.1rem]">Optimiser votre profil</h3>
          <p className="m-0 mb-[20px] text-[0.82rem] text-[#6b7280]">Complétez votre profil pour améliorer vos matchs</p>
          <button
            className="font-sora relative overflow-hidden btn-shine inline-flex cursor-pointer items-center gap-[8px] rounded-[50px] border-none bg-[#FF540B] px-[24px] py-[11px] text-[0.88rem] font-bold tracking-[0.3px] text-white transition-all duration-300 ease-in hover:-translate-y-[2px] hover:bg-[#e04800] hover:shadow-[0_8px_25px_rgba(255,84,11,0.35)]"
            onClick={() => onNavigate && onNavigate("profile")}
          >
            <Zap strokeWidth={2.5} className="h-4 w-4" /> Voir mon profil
          </button>
        </div>

      </div>
    );
  }
