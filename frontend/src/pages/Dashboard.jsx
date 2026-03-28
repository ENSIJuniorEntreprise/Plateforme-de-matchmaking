import React, { useState } from "react";
import { Users, Eye, MessageSquare, TrendingUp, Zap, ChevronRight, Bell } from "lucide-react";

const initialNotifications = [
  { id: 1, title: "Nouveau match !", detail: "TechFlow vient de matcher avec Mikel Arteta — consultez son profil pour démarrer une conversation.", icon: "🎯", accentClass: "text-[#FF540B]", dotBgClass: "bg-[#FF540B]", dotShadowClass: "shadow-[0_0_7px_2px_#FF540B99]", hoverBgClass: "hover:bg-[rgba(255,84,11,0.08)]", hoverBorderClass: "hover:border-[rgba(255,84,11,0.18)]", read: false },
  { id: 2, title: "Message reçu", detail: "Sophie Chen vous a envoyé un message : « Bonjour, votre projet m'intéresse beaucoup ! »", icon: "💬", accentClass: "text-[#3b82f6]", dotBgClass: "bg-[#3b82f6]", dotShadowClass: "shadow-[0_0_7px_2px_#3b82f699]", hoverBgClass: "hover:bg-[rgba(59,130,246,0.08)]", hoverBorderClass: "hover:border-[rgba(59,130,246,0.18)]", read: false },
  { id: 3, title: "Profil Vu", detail: "Microsoft a consulté votre profil il y a 2 heures. Profitez-en pour envoyer un message !", icon: "👁️", accentClass: "text-[#10b981]", dotBgClass: "bg-[#10b981]", dotShadowClass: "shadow-[0_0_7px_2px_#10b98199]", hoverBgClass: "hover:bg-[rgba(16,185,129,0.08)]", hoverBorderClass: "hover:border-[rgba(16,185,129,0.18)]", read: true },
];

const stats = [
  { label: "matchs",      value: "24",   delta: "+12%", positive: true,  icon: Users,         iconClass: "text-[#f59e0b]", iconBgClass: "bg-[rgba(245,158,11,0.12)]", glowClass: "bg-[#f59e0b]" },
  { label: "Vues profil", value: "1.2k", delta: "+8%",  positive: true,  icon: Eye,           iconClass: "text-[#3b82f6]", iconBgClass: "bg-[rgba(59,130,246,0.12)]", glowClass: "bg-[#3b82f6]" },
  { label: "Messages",    value: "18",   delta: "-2%",  positive: false, icon: MessageSquare, iconClass: "text-[#10b981]", iconBgClass: "bg-[rgba(16,185,129,0.12)]", glowClass: "bg-[#10b981]" },
  { label: "Score",       value: "92%",  delta: "+12%", positive: true,  icon: TrendingUp,    iconClass: "text-[#FF540B]", iconBgClass: "bg-[rgba(255,84,11,0.12)]", glowClass: "bg-[#FF540B]"  },
];
 
const recentMatches = [
  { name: "Sophie Chen", role: "Talent",   roleIcon: "👤", match: 95, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Capital VC",  role: "Investor", roleIcon: "💲", match: 88, img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop" },
  { name: "GreenScale",  role: "Startup",  roleIcon: "🏢", match: 85, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop" },
];

function NotifCard({ notif, onRead }) {
  const isUnread = !notif.read;
  return (
    <div
      onClick={() => onRead(notif.id)}
      className={`group relative cursor-pointer overflow-hidden rounded-[14px] border transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${notif.hoverBgClass} ${notif.hoverBorderClass} ${isUnread ? "border-[rgba(255,255,255,0.11)] bg-[rgba(255,255,255,0.055)] shadow-[0_2px_14px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.06)]" : "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.015)] opacity-45"} px-[18px] py-[14px] hover:px-[18px] hover:pb-[18px] hover:pt-[16px]`}
    >
      {isUnread && (
        <div className={`absolute right-[14px] top-[15px] h-[7px] w-[7px] rounded-full ${notif.dotBgClass} ${notif.dotShadowClass}`} />
      )}
      <div className="flex items-center gap-[12px]">
        <span className={`text-[20px] transition-[filter] duration-300 ${notif.read ? "grayscale-[0.7]" : "grayscale-0"}`}>
          {notif.icon}
        </span>
        <span className={`font-sora text-[0.9rem] transition-colors duration-300 ${notif.read ? "font-medium text-[#555c6b]" : "font-bold text-white"}`}>
          {notif.title}
        </span>
        <ChevronRight className={`ml-auto h-5 w-5 opacity-40 transition-all duration-200 ease-in group-hover:translate-x-[3px] group-hover:opacity-100 ${isUnread ? "mr-[18px]" : "mr-0"} ${notif.accentClass}`} />
      </div>
      <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity,margin-top] duration-[350ms,250ms,250ms] ease-[ease,ease,ease] group-hover:mt-[10px] group-hover:max-h-[80px] group-hover:opacity-100">
        <p className="font-sora m-0 text-[0.78rem] leading-[1.6] text-[#9ca3af]">
          {notif.detail}
        </p>
      </div>
    </div>
  );
}

function StatCard({ stat, floatClass }) {
  const Icon = stat.icon;
  return (
    <div className={`group relative flex min-w-0 flex-1 flex-col gap-[12px] overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] px-[24px] py-[22px] transition-[border-color,box-shadow] duration-200 hover:border-[rgba(255,255,255,0.18)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)] ${floatClass} hover:[animation-play-state:paused]`}>
      <div className={`pointer-events-none absolute right-[-20px] top-[-20px] h-[80px] w-[80px] rounded-full opacity-15 blur-[35px] ${stat.glowClass}`} />
      <div className="flex items-start justify-between">
        <div className={`flex h-[38px] w-[38px] items-center justify-center rounded-[10px] ${stat.iconBgClass}`}>
          <Icon strokeWidth={2.2} className={`h-5 w-5 ${stat.iconClass}`} />
        </div>
        <span className={`font-sora rounded-[20px] px-[8px] py-[3px] text-[0.75rem] font-bold ${stat.positive ? "bg-[rgba(74,222,128,0.1)] text-[#4ade80]" : "bg-[rgba(248,113,113,0.1)] text-[#f87171]"}`}>
          {stat.delta}
        </span>
      </div>
      <div>
        <div className="font-sora text-[1.9rem] font-extrabold leading-none text-white">{stat.value}</div>
        <div className="font-sora mt-[4px] text-[0.78rem] text-[#6b7280]">{stat.label}</div>
      </div>
    </div>
  );
}

function MatchRow({ match }) {
  return (
    <div className="flex cursor-pointer items-center gap-[14px] rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-[16px] py-[13px] transition-all duration-200 ease-in hover:bg-[rgba(255,255,255,0.06)]">
      <img src={match.img} alt={match.name} className="h-[46px] w-[46px] shrink-0 rounded-[12px] border border-[rgba(255,255,255,0.1)] object-cover" />
      <div className="flex-1">
        <div className="font-sora text-[1rem] font-bold text-white">{match.name}</div>
        <div className="font-sora mt-[2px] text-[0.9rem] font-semibold text-[#6b7280]">{match.roleIcon} {match.role}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="font-sora text-[1.05rem] font-extrabold leading-none text-[#FF540B]">{match.match}%</div>
        <div className="font-sora mt-[3px] text-[0.75rem] font-extrabold text-[#6b7280]">Match</div>
      </div>
    </div>
  );
}

function VoirToutBtn() {
  return (
    <button
      className="font-sora flex cursor-pointer items-center gap-[4px] border-none bg-transparent text-[0.78rem] font-semibold text-[#6b7280] transition-colors duration-200 ease-in hover:text-[#FF540B]"
    >
      Voir tout <ChevronRight className="h-5 w-5" />
    </button>
  );
}

export default function Dashboard({ onNavigate }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
      <div className="font-sora min-h-screen bg-[#14161e] px-[clamp(16px,4vw,48px)] pb-[60px] pt-[40px]">

        <div className="mb-[40px] text-center">
          <h1 className="m-0 text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-white">
            Bonjour, <span className="text-[#FF540B]">TechFlow 👋</span>
          </h1>
          <p className="mt-[6px] text-[0.88rem] text-[#6b7280]">Voici votre tableau de bord</p>
        </div>

        <div className="mb-[28px] flex flex-wrap gap-[16px]">
          {stats.map((s, i) => <StatCard key={i} stat={s} floatClass={i === 0 ? "animate-float-1" : i === 1 ? "animate-float-2" : i === 2 ? "animate-float-3" : "animate-float-4"} />)}
        </div>

        <div className="mb-[24px] grid grid-cols-[1fr_360px] items-start gap-[20px]">

          <div className="rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[28px]">
            <div className="mb-[20px] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Users className="h-5 w-5 text-[#FF540B]" />
                <h2 className="m-0 text-[1.05rem] font-extrabold text-white">Matchs récents</h2>
              </div>
              <VoirToutBtn />
            </div>
            <div className="flex flex-col gap-[10px]">
              {recentMatches.map((m, i) => <MatchRow key={i} match={m} />)}
            </div>
          </div>

          <div className="rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[28px]">
            <div className="mb-[20px] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <div className="relative">
                  <Bell className="h-5 w-5 text-[#FF540B]" />
                  {unreadCount > 0 && (
                    <div className="font-sora absolute right-[-8px] top-[-7px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full border-[2px] border-[#14161e] bg-[#FF540B] px-[3px] text-[0.6rem] font-extrabold leading-none text-white shadow-[0_0_8px_rgba(255,84,11,0.6)]">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <h2 className="m-0 text-[1.05rem] font-extrabold text-white">Notifications</h2>
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="font-sora cursor-pointer border-none bg-transparent text-[0.72rem] font-semibold text-[#6b7280] transition-colors duration-200 ease-in hover:text-[#FF540B]">
                  Tout lire
                </button>
              )}
            </div>
            <div className="flex flex-col gap-[10px]">
              {notifications.map(n => <NotifCard key={n.id} notif={n} onRead={markAsRead} />)}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-[rgba(255,84,11,0.15)] bg-[rgba(255,255,255,0.03)] px-[28px] py-[40px] text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-[#FF540B] opacity-[0.07] blur-[80px]" />
          <Zap strokeWidth={2.5} className="mb-[14px] inline-block h-5 w-5 text-[#FF540B]" />
          <h3 className="m-0 mb-[6px] text-[1.1rem] font-extrabold text-white">Optimiser votre profil</h3>
          <p className="m-0 mb-[22px] text-[0.83rem] text-[#6b7280]">Complétez votre profil pour améliorer vos matchs</p>
          <button className="font-sora inline-flex cursor-pointer items-center gap-[8px] rounded-[50px] border-none bg-[#FF540B] px-[28px] py-[12px] text-[0.9rem] font-bold tracking-[0.3px] text-white transition-all duration-200 ease-in hover:-translate-y-[2px] hover:bg-[#e04800] hover:shadow-[0_8px_25px_rgba(255,84,11,0.35)]" onClick={() => onNavigate && onNavigate("profile")}>
            <Zap strokeWidth={2.5} className="h-5 w-5" /> Voir mon profil
          </button> 
        </div>

      </div>
  );
} 