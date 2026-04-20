import React, { useState } from "react";
import { Users, Eye, MessageSquare, TrendingUp, Zap, ChevronRight, Bell } from "lucide-react";
import "../styles/dashboard-animations.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialNotifications = [
  { id: 1, title: "Nouveau match !", detail: "TechFlow vient de matcher avec Mikel Arteta — consultez son profil pour démarrer une conversation.", icon: "🎯", accentClass: "text-[#FF540B]", dotBgClass: "bg-[#FF540B]", dotShadowClass: "shadow-[0_0:7px_2px_#FF540B99]", hoverBgClass: "hover:bg-[rgba(255,84,11,0.08)]", hoverBorderClass: "hover:border-[rgba(255,84,11,0.18)]", read: false },
  { id: 2, title: "Message reçu", detail: "Sophie Chen vous a envoyé un message : « Bonjour, votre projet m'intéresse beaucoup ! »", icon: "💬", accentClass: "text-[#3b82f6]", dotBgClass: "bg-[#3b82f6]", dotShadowClass: "shadow-[0_0_7px_2px_#3b82f699]", hoverBgClass: "hover:bg-[rgba(59,130,246,0.08)]", hoverBorderClass: "hover:border-[rgba(59,130,246,0.18)]", read: false },
  { id: 3, title: "Profil Vu", detail: "Microsoft a consulté votre profil il y a 2 heures. Profitez-en pour envoyer un message !", icon: "👁️", accentClass: "text-[#10b981]", dotBgClass: "bg-[#10b981]", dotShadowClass: "shadow-[0_0_7px_2px_#10b98199]", hoverBgClass: "hover:bg-[rgba(16,185,129,0.08)]", hoverBorderClass: "hover:border-[rgba(16,185,129,0.18)]", read: true },
];

const stats = [
  { label: "Matchs",      value: "24",   delta: "+12%", positive: true,  icon: Users,         iconClass: "text-[#f59e0b]", iconBgClass: "bg-[rgba(245,158,11,0.12)]",  glowClass: "bg-[#f59e0b]",  animClass: "animate-float-1" },
  { label: "Vues profil", value: "1.2k", delta: "+8%",  positive: true,  icon: Eye,           iconClass: "text-[#3b82f6]", iconBgClass: "bg-[rgba(59,130,246,0.12)]",  glowClass: "bg-[#3b82f6]",  animClass: "animate-float-2" },
  { label: "Messages",    value: "18",   delta: "-2%",  positive: false, icon: MessageSquare, iconClass: "text-[#10b981]", iconBgClass: "bg-[rgba(16,185,129,0.12)]",  glowClass: "bg-[#10b981]",  animClass: "animate-float-3" },
  { label: "Score",       value: "92%",  delta: "+12%", positive: true,  icon: TrendingUp,    iconClass: "text-[#FF540B]", iconBgClass: "bg-[rgba(255,84,11,0.12)]",   glowClass: "bg-[#FF540B]",  animClass: "animate-float-4" },
];

const recentMatches = [
  { name: "Sophie Chen", role: "Talent",   roleIcon: "👤", match: 95, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Capital VC",  role: "Investor", roleIcon: "💲", match: 88, img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop" },
  { name: "GreenScale",  role: "Startup",  roleIcon: "🏢", match: 85, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop" },
];

// ─── Animations via Tailwind - No inline styles needed ───────────────────────

// ─── Sub-components ───────────────────────────────────────────────────────────

function NotifCard({ notif, onRead, index }) {
  const isUnread = !notif.read;
  return (
    <div
      onClick={() => onRead(notif.id)}
      style={{ animationDelay: `${index * 120}ms` }}
      className={`group relative cursor-pointer overflow-hidden rounded-[14px] border transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] animate-drop-bounce ${notif.hoverBgClass} ${notif.hoverBorderClass} ${isUnread ? "border-[rgba(255,255,255,0.11)] bg-[rgba(255,255,255,0.055)] shadow-[0_2px_14px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.06)]" : "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.015)] opacity-45"} px-[16px] py-[13px] hover:px-[16px] hover:pb-[16px] hover:pt-[14px]`}
    >
      {isUnread && (
        <div className={`absolute right-[12px] top-[13px] h-[7px] w-[7px] rounded-full ${notif.dotBgClass} ${notif.dotShadowClass}`} />
      )}
      <div className="flex items-center gap-[12px]">
        <span className={`text-[18px] transition-[filter] duration-300 ${notif.read ? "grayscale-[0.7]" : "grayscale-0"}`}>
          {notif.icon}
        </span>
        <span className={`font-sora text-[0.85rem] transition-colors duration-300 ${notif.read ? "font-medium text-[#555c6b]" : "font-bold text-white"}`}>
          {notif.title}
        </span>
        <ChevronRight className={`ml-auto h-4 w-4 opacity-40 transition-all duration-200 ease-in group-hover:translate-x-[3px] group-hover:opacity-100 ${isUnread ? "mr-[16px]" : "mr-0"} ${notif.accentClass}`} />
      </div>
      <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:mt-[8px] group-hover:max-h-[80px] group-hover:opacity-100">
        <p className="font-sora m-0 text-[0.75rem] leading-[1.6] text-[#9ca3af]">
          {notif.detail}
        </p>
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  const animationMap = {
    'animate-float-1': 'animate-float-1',
    'animate-float-2': 'animate-float-2',
    'animate-float-3': 'animate-float-3',
    'animate-float-4': 'animate-float-4',
  };
  
  return (
    <div
      className={`stat-card group relative flex min-w-0 w-full flex-col gap-[12px] overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] px-[20px] py-[20px] transition-[border-color,box-shadow,transform] duration-300 ease-out ${animationMap[stat.animClass]} hover:scale-[1.04] hover:border-[rgba(255,255,255,0.22)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:animate-stat-shadow-glow sm:flex-1 sm:basis-[calc(50%-8px)] lg:basis-0`}
    >
      <div className={`pointer-events-none absolute right-[-20px] top-[-20px] h-[80px] w-[80px] rounded-full opacity-15 blur-[35px] ${stat.glowClass}`} />
      <div className="flex items-start justify-between">
        <div className={`flex h-[36px] w-[36px] items-center justify-center rounded-[10px] ${stat.iconBgClass}`}>
          <Icon strokeWidth={2.2} className={`h-[18px] w-[18px] ${stat.iconClass}`} />
        </div>
        <span className={`font-sora rounded-[20px] px-[8px] py-[3px] text-[0.72rem] font-bold ${stat.positive ? "bg-[rgba(74,222,128,0.1)] text-[#4ade80]" : "bg-[rgba(248,113,113,0.1)] text-[#f87171]"}`}>
          {stat.delta}
        </span>
      </div>
      <div>
        <div className="font-sora text-[1.7rem] font-extrabold leading-none text-white sm:text-[1.9rem]">{stat.value}</div>
        <div className="font-sora mt-[4px] text-[0.75rem] text-[#6b7280]">{stat.label}</div>
      </div>
    </div>
  );
}

function MatchRow({ match, index }) {
  return (
    <div 
      style={{ animationDelay: `${index * 150}ms` }}
      className="match-row group animate-slide-in-right flex items-center gap-[12px] rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-[14px] py-[12px] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [cursor:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22%23FF540B%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/><path d=%22M8 12l3 3 5-5%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 fill=%22none%22/></svg>'),pointer] hover:border-[rgba(255,84,11,0.3)] hover:bg-[rgba(255,84,11,0.06)] hover:shadow-[0_4px_20px_rgba(255,84,11,0.15)] hover:scale-[1.03] hover:z-10"
    >
      <img src={match.img} alt={match.name} className="h-[42px] w-[42px] shrink-0 rounded-[10px] border border-[rgba(255,255,255,0.1)] object-cover transition-all duration-300 group-hover:border-[rgba(255,84,11,0.4)] group-hover:shadow-[0_0_12px_rgba(255,84,11,0.3)]" />
      <div className="flex-1 min-w-0">
        <div className="font-sora text-[0.95rem] font-bold text-white truncate transition-colors duration-200 group-hover:text-[#FF540B]">{match.name}</div>
        <div className="font-sora mt-[2px] text-[0.82rem] font-semibold text-[#6b7280]">{match.roleIcon} {match.role}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="font-sora text-[1rem] font-extrabold leading-none text-[#FF540B] transition-all duration-300 group-hover:scale-110 animate-pulse-glow">{match.match}%</div>
        <div className="font-sora mt-[3px] text-[0.72rem] font-extrabold text-[#6b7280]">Match</div>
      </div>
    </div>
  );
}

function VoirToutBtn() {
  return (
    <button className="font-sora flex cursor-pointer items-center gap-[4px] border-none bg-transparent text-[0.75rem] font-semibold text-[#6b7280] transition-colors duration-200 ease-in hover:text-[#FF540B]">
      Voir tout <ChevronRight className="h-4 w-4" />
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Dashboard({ onNavigate }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead  = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="font-sora min-h-screen bg-[#14161e] px-[clamp(12px,4vw,48px)] pb-[60px] pt-[32px] sm:pt-[40px] perspective-[1000px]">

        {/* ── Welcome ── */}
        <div className="mb-[32px] text-center sm:mb-[40px]">
          <h1 className="m-0 text-[clamp(1.4rem,3vw,2.2rem)] font-extrabold text-white">
            Bonjour, <span className="text-[#FF540B]">TechFlow 👋</span>
          </h1>
          <p className="mt-[6px] text-[0.85rem] text-[#6b7280]">Voici votre tableau de bord interactif</p>
        </div>

        {/* ── Stat cards with float animation ── */}
        <div className="mb-[40px] flex flex-wrap gap-[14px] sm:mb-[48px] sm:gap-[16px]">
          {stats.map((s, i) => <StatCard key={i} stat={s} />)}
        </div>

        {/* ── Matches + Notifications ── */}
        <div className="mb-[40px] grid grid-cols-1 items-start gap-[32px] lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_360px]">

          {/* Matchs récents */}
          <div className="animate-matches-float relative z-1 rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[20px] sm:p-[28px] backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_30px_rgba(255,84,11,0.4)] hover:z-10" style={{ animationDelay: '0s', cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%2210%22 cy=%2210%22 r=%228%22 fill=%22%23FF540B%22/></svg>") 10 10, auto' }}>
            <div className="mb-[18px] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Users className="h-5 w-5 text-[#FF540B]" />
                <h2 className="m-0 text-[1rem] font-extrabold text-white sm:text-[1.05rem]">Matchs récents</h2>
              </div>
              <VoirToutBtn />
            </div>
            <div className="flex flex-col gap-[10px] matches-container">
              {recentMatches.map((m, i) => <MatchRow key={i} match={m} index={i} />)}
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
              {notifications.map((n, i) => <NotifCard key={n.id} notif={n} onRead={markAsRead} index={i} />)}
            </div>
          </div>
        </div>

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
