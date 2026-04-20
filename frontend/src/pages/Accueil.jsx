import React from "react";
import { ChevronRight, User } from "lucide-react";

export default function Accueil({ onNavigate, user }) {
  return (
    <section id="top" className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(to_bottom,#1a1d23,#20222C)] px-[16px] text-center">
      <h1 className="mb-[16px] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white">
        Bienvenue sur MatchHub 🚀
      </h1>
      <p className="mb-[32px] max-w-[600px] text-[clamp(1rem,2.5vw,1.2rem)] text-[#9ca3af]">
        La plateforme de matching intelligent qui connecte startups, talents et investisseurs
      </p>
      <div className="flex flex-col items-center gap-[14px] sm:flex-row sm:gap-[16px]">
        {user ? (
          <>
            {/* Logged in: show profile info + visit profile button */}
            <div className="flex items-center gap-[10px] rounded-[12px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-[16px] py-[10px]">
              <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#FF540B]">
                <User strokeWidth={2} className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-white">{user.name}</span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('profile')}
              className="flex cursor-pointer items-center gap-[8px] rounded-[10px] border-none bg-[#FF540B] px-[28px] py-[12px] text-[1rem] font-bold text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#e04800] hover:shadow-[0_6px_20px_rgba(255,84,11,0.35)]"
            >
              Visiter mon profil
              <ChevronRight strokeWidth={2.5} className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            {/* Not logged in: show Commencer + Connexion */}
            <button
              onClick={() => onNavigate && onNavigate('signup')}
              className="cursor-pointer rounded-[10px] border-none bg-[#FF540B] px-[32px] py-[12px] text-[1rem] font-bold text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#e04800] hover:shadow-[0_6px_20px_rgba(255,84,11,0.35)]"
            >
              Commencer
            </button>
            <button
              onClick={() => onNavigate && onNavigate('signin')}
              className="cursor-pointer rounded-[10px] border-[2px] border-[#FF540B] bg-transparent px-[32px] py-[12px] text-[1rem] font-bold text-[#FF540B] transition-all duration-200 hover:bg-[#FF540B] hover:text-white"
            >
              Connexion
            </button>
          </>
        )}
      </div>
    </section>
  );
}
