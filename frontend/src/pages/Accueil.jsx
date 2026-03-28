import React from "react";

export default function Accueil({ onNavigate }) {
  return (
    <section id="top" className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(to_bottom,#1a1d23,#20222C)] px-[16px] text-center">
      <h1 className="mb-[16px] text-[3rem] font-bold text-white">
        Bienvenue sur MatchHub 🚀
      </h1>
      <p className="mb-[32px] max-w-[600px] text-[1.2rem] text-[#9ca3af]">
        La plateforme de matching intelligent qui connecte startups, talents et investisseurs
      </p>
      <div className="flex gap-[16px]">
        <button 
          onClick={() => onNavigate && onNavigate('signup')}
          className="cursor-pointer rounded-[10px] border-none bg-[#FF540B] px-[32px] py-[12px] text-[1rem] font-bold text-white transition-colors duration-200 hover:bg-[#e04800]"
        >
          Commencer
        </button>
        <button
          onClick={() => onNavigate && onNavigate('signin')}
          className="cursor-pointer rounded-[10px] border-[2px] border-[#FF540B] bg-transparent px-[32px] py-[12px] text-[1rem] font-bold text-[#FF540B] transition-all duration-200 hover:bg-[#FF540B] hover:text-white"
        >
          Connexion
        </button>
      </div>
    </section>
  );
} 