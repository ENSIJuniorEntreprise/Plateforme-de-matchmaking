import React from "react";
import { Sparkles } from "lucide-react";

export default function Footer({ onNavigate }) {
  const handleLogoClick = () => {
    if (onNavigate) onNavigate("accueil");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return ( 
      <footer className="font-inter w-full border-t border-[#2a2d35] bg-[#20222C]">
        <div className="grid w-full grid-cols-[2fr_1fr_1fr_1fr_1fr] items-start gap-[40px] px-[clamp(1rem,3vw,40px)] pb-[32px] pt-[56px]">

          {/* Colonne gauche : logo + description + contacts */}
          <div className="flex max-w-[300px] flex-col justify-self-start">
            <div className="mb-[16px] flex cursor-pointer items-center gap-[5px]" onClick={handleLogoClick}>
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[40%] bg-[#FF540B]">
                <Sparkles strokeWidth={2} className="h-5 w-5 text-white" />
              </div>
              <span className="text-[20px] font-bold tracking-[-0.3px] text-white">
                Match<span className="text-[#FF540B]">Hub</span>
              </span>
            </div>

            <p className="mb-[24px] text-[13px] font-normal leading-[1.7] text-[#9ca3af]">
              La plateforme de matching intelligent qui connecte startups, talents et investisseurs
              pour accélérer leur succès.
            </p>

            <div className="mt-[8px]">
              <div className="mb-[14px] flex items-center gap-[12px]">
                <div className="text-[#9ca3af] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-[#FF540B]">
                  <svg width="30" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="24" height="17" rx="2"/>
                    <polyline points="3,4 13,13 23,4"/>
                    <line x1="2" y1="19" x2="10" y2="11"/>
                    <line x1="23" y1="19" x2="16" y2="11"/>
                  </svg>
                </div>
                <span className="text-[13px] text-[#9ca3af]">ensijunior@*****</span>
              </div>

              <div className="mb-[14px] flex items-center gap-[12px]">
                <div className="text-[#9ca3af] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-[#FF540B]">
                  <svg width="30" height="30" viewBox="-1 1 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.418A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </div>
                <span className="text-[13px] text-[#9ca3af]">+216 ** *** ***</span>
              </div>

              <div className="mb-[14px] flex items-center gap-[12px]">
                <div className="text-[#9ca3af] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-[#FF540B]">
                  <svg width="24" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <span className="text-[13px] text-[#9ca3af]">linkedin.com/company/ensi-junior-entreprise/</span>
              </div>
            </div>
          </div>

          {/* Colonne Produit */}
          <div className="flex flex-col">
            <h4 className="mb-[24px] text-[16px] font-bold tracking-[-0.2px] text-white">Produit</h4>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Fonctionnalités</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Matchmaking</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Tarifs</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">API</a>
          </div>

          {/* Colonne Entreprise */}
          <div className="flex flex-col">
            <h4 className="mb-[24px] text-[16px] font-bold tracking-[-0.2px] text-white">Entreprise</h4>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">À propos</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Carrieres</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Blog</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Contact</a>
          </div>

          {/* Colonne Légal */}
          <div className="flex flex-col">
            <h4 className="mb-[24px] text-[16px] font-bold tracking-[-0.2px] text-white">Légal</h4>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Confidentialité</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">CGU</a>
            <a className="mb-[18px] block cursor-pointer text-[14px] font-normal text-[#9ca3af] transition-colors duration-200 hover:text-[#FF540B]">Cookies</a>
          </div>

          {/* Colonne Suivez-nous */}
          <div className="flex flex-col items-end justify-self-end">
            <p className="mb-[16px] mr-[7px] mt-[222px] text-right text-[22px] font-semibold text-[#7F8393]">Suivez-nous</p>
            <div className="flex items-center gap-[5px]">
              <button className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-[#ff540b96] bg-transparent transition-[border-color,background] duration-200 hover:border-[#FF540B] hover:bg-[rgba(255,84,11,0.10)]" aria-label="Facebook" onClick={() => window.open("https://www.facebook.com", "_blank")}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#9ca3af]">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </button>
              <button className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-[#ff540b96] bg-transparent transition-[border-color,background] duration-200 hover:border-[#FF540B] hover:bg-[rgba(255,84,11,0.10)]" aria-label="Instagram" onClick={() => window.open("https://www.instagram.com", "_blank")}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#9ca3af]">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </button>
              <button className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-[#ff540b96] bg-transparent transition-[border-color,background] duration-200 hover:border-[#FF540B] hover:bg-[rgba(255,84,11,0.10)]" aria-label="X" onClick={() => window.open("https://www.twitter.com", "_blank")}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-[#9ca3af]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Barre de copyright */}
        <div className="flex justify-center border-t border-[#2a2d35] px-[clamp(1rem,3vw,40px)] py-[20px]">
          <p className="text-[13px] text-[#6b7280]">© 2026 - MatchHub. Tous droits reserves.</p>
        </div>
      </footer>
  );
}