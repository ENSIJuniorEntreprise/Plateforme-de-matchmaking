import React from "react";
import { Sparkles } from "lucide-react";

export default function Footer({ onNavigate }) {
  const handleLogoClick = () => {
    if (onNavigate) onNavigate("accueil");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNav = (page) => {
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="font-inter w-full border-t border-[#2a2d35] bg-[#20222C]">

      {/* ── Main grid ── */}
      <div className="grid w-full grid-cols-1 items-start gap-[32px] px-[clamp(1rem,3vw,40px)] pb-[32px] pt-[48px] lg:grid-cols-[2fr_1fr]">

        {/* ── Logo + description + contact ── */}
        <div className="flex max-w-[300px] flex-col justify-self-start">
          <div className="mb-[14px] flex cursor-pointer items-center gap-[5px]" onClick={handleLogoClick}>
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[40%] bg-[#FF540B]">
              <Sparkles strokeWidth={2} className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="text-[19px] font-bold tracking-[-0.3px] text-white">
              Match<span className="text-[#FF540B]">Hub</span>
            </span>
          </div>

          <p className="mb-[24px] text-[13px] font-normal leading-[1.7] text-[#9ca3af]">
            La plateforme de matching intelligent qui connecte startups, talents et investisseurs
            pour accélérer leur succès.
          </p>

          <div className="mt-[4px] flex flex-col gap-[10px]">
            {/* LinkedIn */}
            <div className="flex items-center gap-[10px]">
              <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] border-[1.5px] border-[#FF540B] text-[#9ca3af]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <span className="text-[13px] text-[#9ca3af]">linkedin.com/company/ensi-junior-entreprise/</span>
            </div>
          </div>
        </div>

        {/* ── Produit (uniquement des destinations réelles) ── */}
        <div className="flex flex-col">
          <h4 className="mb-[24px] text-[16px] font-bold tracking-[-0.2px] text-white">Produit</h4>
          <button
            type="button"
            onClick={() => handleNav("matchmaking")}
            className="mb-[18px] block cursor-pointer text-left text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]"
          >
            Matchmaking
          </button>
          <button
            type="button"
            onClick={() => handleNav("dashboard")}
            className="mb-[18px] block cursor-pointer text-left text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]"
          >
            Dashboard
          </button>
        </div>

      </div>

      {/* ── Copyright bar ── */}
      <div className="flex justify-center border-t border-[#2a2d35] px-[clamp(1rem,3vw,40px)] py-[18px]">
        <p className="text-[13px] text-[#6b7280]">© 2026 - MatchHub (ENSI Junior Entreprise). Tous droits réservés.</p>
      </div>
    </footer>
  );
}
