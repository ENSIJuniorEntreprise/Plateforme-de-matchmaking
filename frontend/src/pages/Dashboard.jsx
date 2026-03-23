import React, { useState } from "react";
import { Users, Eye, MessageSquare, TrendingUp, Zap, ChevronRight, Bell } from "lucide-react";

const initialNotifications = [
  { id: 1, title: "Nouveau match !", detail: "TechFlow vient de matcher avec Mikel Arteta — consultez son profil pour démarrer une conversation.", icon: "🎯", color: "#FF540B", bg: "rgba(255,84,11,0.08)", border: "rgba(255,84,11,0.18)", read: false },
  { id: 2, title: "Message reçu", detail: "Sophie Chen vous a envoyé un message : « Bonjour, votre projet m'intéresse beaucoup ! »", icon: "💬", color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.18)", read: false },
  { id: 3, title: "Profil Vu", detail: "Microsoft a consulté votre profil il y a 2 heures. Profitez-en pour envoyer un message !", icon: "👁️", color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)", read: true },
];

const stats = [
  { label: "matchs",      value: "24",   delta: "+12%", positive: true,  icon: Users,         color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { label: "Vues profil", value: "1.2k", delta: "+8%",  positive: true,  icon: Eye,           color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  { label: "Messages",    value: "18",   delta: "-2%",  positive: false, icon: MessageSquare, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { label: "Score",       value: "92%",  delta: "+12%", positive: true,  icon: TrendingUp,    color: "#FF540B", bg: "rgba(255,84,11,0.12)"  },
];

const recentMatches = [
  { name: "Sophie Chen", role: "Talent",   roleIcon: "👤", match: 95, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Capital VC",  role: "Investor", roleIcon: "💲", match: 88, img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop" },
  { name: "GreenScale",  role: "Startup",  roleIcon: "🏢", match: 85, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop" },
];

function NotifCard({ notif, onRead }) {
  const [hovered, setHovered] = useState(false);
  const isUnread = !notif.read;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onRead(notif.id)}
      style={{
        position: "relative",
        background: hovered ? notif.bg : isUnread ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.015)",
        border: `1px solid ${hovered ? notif.border : isUnread ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "14px",
        padding: hovered ? "16px 18px 18px" : "14px 18px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "hidden",
        opacity: notif.read ? 0.45 : 1,
        boxShadow: isUnread && !hovered ? "0 2px 14px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.06)" : "none",
      }}
    >
      {isUnread && (
        <div style={{
          position: "absolute", top: 15, right: 14,
          width: 7, height: 7, borderRadius: "50%",
          background: notif.color,
          boxShadow: `0 0 7px 2px ${notif.color}99`,
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "20px", filter: notif.read ? "grayscale(0.7)" : "none", transition: "filter 0.3s" }}>
          {notif.icon}
        </span>
        <span style={{ color: notif.read ? "#555c6b" : "#fff", fontWeight: notif.read ? 500 : 700, fontSize: "0.9rem", fontFamily: "'Sora', sans-serif", transition: "color 0.3s" }}>
          {notif.title}
        </span>
        <ChevronRight size={14} color={notif.color} style={{ marginLeft: "auto", marginRight: isUnread ? "18px" : "0", transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.25s ease", opacity: hovered ? 1 : 0.4 }} />
      </div>
      <div style={{ maxHeight: hovered ? "80px" : "0px", opacity: hovered ? 1 : 0, overflow: "hidden", transition: "max-height 0.35s ease, opacity 0.25s ease", marginTop: hovered ? "10px" : "0" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.78rem", lineHeight: 1.6, margin: 0, fontFamily: "'Sora', sans-serif" }}>
          {notif.detail}
        </p>
      </div>
    </div>
  );
}

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1, minWidth: 0, position: "relative", overflow: "hidden", animation: `float ${2.8 + index * 0.4}s ease-in-out infinite`, transition: "border-color 0.2s ease, box-shadow 0.2s ease" }}
      onMouseEnter={e => { e.currentTarget.style.animationPlayState = "paused"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.35)"; }}
      onMouseLeave={e => { e.currentTarget.style.animationPlayState = "running"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: stat.color, borderRadius: "50%", filter: "blur(35px)", opacity: 0.15, pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ background: stat.bg, borderRadius: "10px", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={stat.color} strokeWidth={2.2} />
        </div>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: stat.positive ? "#4ade80" : "#f87171", background: stat.positive ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", padding: "3px 8px", borderRadius: "20px", fontFamily: "'Sora', sans-serif" }}>
          {stat.delta}
        </span>
      </div>
      <div>
        <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Sora', sans-serif" }}>{stat.value}</div>
        <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 4, fontFamily: "'Sora', sans-serif" }}>{stat.label}</div>
      </div>
    </div>
  );
}

function MatchRow({ match }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 16px", borderRadius: "14px", background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "all 0.2s ease" }}>
      <img src={match.img} alt={match.name} style={{ width: 46, height: 46, borderRadius: "12px", objectFit: "cover", flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }} />
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Sora', sans-serif" }}>{match.name}</div>
        <div style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: 2, fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>{match.roleIcon} {match.role}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ color: "#FF540B", fontWeight: 800, fontSize: "1.05rem", fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>{match.match}%</div>
        <div style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: 3, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>Match</div>
      </div>
    </div>
  );
}

function VoirToutBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none",
        color: hovered ? "#FF540B" : "#6b7280",
        fontSize: "0.78rem", fontWeight: 600,
        cursor: "pointer", fontFamily: "'Sora', sans-serif",
        display: "flex", alignItems: "center", gap: 4,
        transition: "color 0.2s ease",
      }}
    >
      Voir tout <ChevronRight size={13} />
    </button>
  );
}

export default function Dashboard({ onNavigate }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        @keyframes float {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-7px); }
          100% { transform: translateY(0px); }
        }
        .dash-profile-btn { background: #FF540B; color: #fff; border: none; padding: 12px 28px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; cursor: pointer; font-family: 'Sora', sans-serif; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; letter-spacing: 0.3px; }
        .dash-profile-btn:hover { background: #e04800; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,84,11,0.35); }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#14161e", fontFamily: "'Sora', sans-serif", padding: "40px clamp(16px, 4vw, 48px) 60px" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", margin: 0 }}>
            Bonjour, <span style={{ color: "#FF540B" }}>TechFlow 👋</span>
          </h1>
          <p style={{ color: "#6b7280", marginTop: 6, fontSize: "0.88rem" }}>Voici votre tableau de bord</p>
        </div>

        <div style={{ display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap" }}>
          {stats.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px", marginBottom: "24px", alignItems: "start" }}>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Users size={17} color="#FF540B" />
                <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", margin: 0 }}>Matchs récents</h2>
              </div>
              <VoirToutBtn />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentMatches.map((m, i) => <MatchRow key={i} match={m} />)}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative" }}>
                  <Bell size={17} color="#FF540B" />
                  {unreadCount > 0 && (
                    <div style={{ position: "absolute", top: -7, right: -8, minWidth: 16, height: 16, background: "#FF540B", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: "#fff", fontFamily: "'Sora', sans-serif", border: "2px solid #14161e", padding: "0 3px", lineHeight: 1, boxShadow: "0 0 8px rgba(255,84,11,0.6)" }}>
                      {unreadCount}
                    </div>
                  )}
                </div>
                <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", margin: 0 }}>Notifications</h2>
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllRead} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'Sora', sans-serif", fontWeight: 600, transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.target.style.color = "#FF540B"} onMouseLeave={e => e.target.style.color = "#6b7280"}>
                  Tout lire
                </button>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {notifications.map(n => <NotifCard key={n.id} notif={n} onRead={markAsRead} />)}
            </div>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,84,11,0.15)", borderRadius: "20px", padding: "40px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 300, height: 120, background: "#FF540B", filter: "blur(80px)", opacity: 0.07, pointerEvents: "none" }} />
          <Zap size={32} color="#FF540B" strokeWidth={2.5} style={{ marginBottom: 14 }} />
          <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 800, margin: "0 0 6px" }}>Optimiser votre profil</h3>
          <p style={{ color: "#6b7280", fontSize: "0.83rem", margin: "0 0 22px" }}>Complétez votre profil pour améliorer vos matchs</p>
          <button className="dash-profile-btn" onClick={() => onNavigate && onNavigate("profile")}>
            <Zap size={15} strokeWidth={2.5} /> Voir mon profil
          </button>
        </div>

      </div>
    </>
  );
}