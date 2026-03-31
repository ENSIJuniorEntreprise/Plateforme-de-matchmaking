import React, { useState, useEffect } from "react";
import { Sparkles, User, ChevronRight } from "lucide-react";

// ─── Variant config ───────────────────────────────────────────────────────────

const AUTH_PAGES      = ["signin", "signup"];
const DASHBOARD_PAGES = ["profile", "settings", "forgot-password", "reset-password", "verify-email", "profile-edit", "email-preferences", "delete-account", "two-factor-auth", "sessions", "api-tokens"];
const DEFAULT_PAGES   = ["accueil", "matchmaking", "dashboard"];

const NAVBAR_VARIANTS = {
  default: {
    headerClass:       "h-[102px]",
    innerMarginTopClass: "mt-[25px]",
    spacerClass:       "h-[102px]",
  },
  auth: {
    headerClass:       "h-[90px]",
    innerMarginTopClass: "mt-[1px]",
    spacerClass:       "h-[90px]",
  },
};

function getVariant(page) {
  if (AUTH_PAGES.includes(page))      return "auth";
  if (DASHBOARD_PAGES.includes(page)) return "auth";
  return "default";
}

/**
 * Which buttons to show on the right.
 * - When user is logged in: show profile name + "Visiter mon profil" button
 * - signin page  → only "Commencer"
 * - signup page  → only "Connexion"
 * - others       → both (or profile if logged in)
 */
function getRightButtons(page) {
  if (page === "signin")               return { showConnexion: false, showCommencer: true  };
  if (page === "signup")               return { showConnexion: true,  showCommencer: false };
  if (DASHBOARD_PAGES.includes(page))  return { showConnexion: false, showCommencer: false };
  return                                      { showConnexion: true,  showCommencer: true  };
}

// ─── Ionicons loader ──────────────────────────────────────────────────────────

function useIonicons() {
  useEffect(() => {
    if (document.querySelector('script[data-ionicons]')) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    s.setAttribute("data-ionicons", "true");
    document.head.appendChild(s);
    const s2 = document.createElement("script");
    s2.noModule = true;
    s2.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
    document.head.appendChild(s2);
  }, []);
}

// ─── Nav items ────────────────────────────────────────────────────────────────

const navItems = [
  { id: "accueil",     name: "Accueil",     icon: "home-outline"      },
  { id: "matchmaking", name: "Matchmaking", icon: "people-outline"    },
  { id: "dashboard",   name: "Dashboard",   icon: "bar-chart-outline" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar({ currentPage, onNavigate, hideNav, variant, user }) {
  useIonicons();
  const [active, setActive]           = useState(currentPage || "accueil");
  const [mobileOpen, setMobileOpen]   = useState(false);

  useEffect(() => {
    if (currentPage) setActive(currentPage);
  }, [currentPage]);

  const handleNav = (id) => {
    setMobileOpen(false);
    if (DEFAULT_PAGES.includes(id)) {
      if (currentPage !== id) {
        setActive(id);
        if (onNavigate) onNavigate(id);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActive(id);
    if (onNavigate) onNavigate(id);
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (currentPage === "accueil") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (onNavigate) onNavigate("accueil");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activeIndex       = navItems.findIndex((item) => item.id === active);
  const resolvedVariant   = variant ?? getVariant(currentPage);
  const { headerClass, innerMarginTopClass, spacerClass } = NAVBAR_VARIANTS[resolvedVariant];
  const { showConnexion, showCommencer } = getRightButtons(active);
  const isSingleAuthButton = active === "signin" || active === "signup";
  const isAuthOrDash       = AUTH_PAGES.includes(active) || DASHBOARD_PAGES.includes(active);
  const showNavPill        = !hideNav && !isAuthOrDash;

  // Toujours 3 colonnes quand la nav pill est affichée pour garder le centrage parfait
  const gridClass = showNavPill
    ? "grid-cols-[1fr_auto_1fr]"
    : "grid-cols-[auto_1fr]";

  const indicatorTranslate =
    activeIndex === 0 ? "translate-x-[20px]"  :
    activeIndex === 1 ? "translate-x-[120px]" :
    activeIndex === 2 ? "translate-x-[220px]" :
    "translate-x-0";

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-[100] border-b border-[#2a2d35] bg-[#20222C] ${headerClass}`}>
        <div className={`grid h-[90px] w-full items-center px-[clamp(1rem,3vw,40px)] ${innerMarginTopClass} ${gridClass}`}>

          {/* ── Logo ── */}
          <div onClick={handleLogoClick} className="flex cursor-pointer select-none items-center justify-self-start gap-[5px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[40%] bg-[#FF540B]">
              <Sparkles strokeWidth={2} className="h-5 w-5 text-white" />
            </div>
            <span className="font-inter text-[20px] font-bold tracking-[-0.3px] text-white">
              Match<span className="text-[#FF540B]">Hub</span>
            </span>
          </div>

          {/* ── Nav pill — desktop, centered ── */}
          {showNavPill && (
            <nav className="hidden justify-self-center md:flex">
              <div className="relative flex h-[50px] w-[300px] items-center justify-center rounded-[10px] bg-[#3F3F3F] xl:w-[320px]">
                <ul className="relative m-0 flex w-[280px] list-none p-0 xl:w-[300px]">
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className="group relative z-[1] h-[70px] w-[93px] cursor-pointer xl:w-[100px]"
                      >
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="font-inter relative flex h-full w-full flex-col items-center justify-center text-center font-medium no-underline"
                        >
                          <span className={`mb-[10px] block text-center text-[1.5em] leading-[60px] text-[#3F3F3F] transition duration-500 ${isActive ? "-translate-y-[32px]" : "translate-y-0"}`}>
                            <ion-icon name={item.icon} />
                          </span>
                          <span className={`font-inter absolute bottom-[22px] text-[0.7rem] font-[550] tracking-[0.05rem] opacity-100 transition-all duration-300 ease-out xl:text-[0.725rem] translate-y-[-3px] ${
                            isActive
                              ? "text-[#FF540B]"
                              : "text-white group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-[#FF540B]"
                          }`}>
                            {item.name}
                          </span>
                        </a>
                      </li>
                    );
                  })}

                  <div
                    className={`before:content-[''] after:content-[''] absolute top-[-50%] h-[60px] w-[60px] rounded-full border-[6px] border-[#20222C] bg-[#FF540B] transition-transform duration-500 before:absolute before:left-[-11px] before:top-[77%] before:h-[18px] before:w-[17px] before:rotate-[-10deg] before:rounded-tr-[30px] before:bg-transparent before:shadow-[1px_-8px_0_0_#20222C] after:absolute after:right-[-13px] after:top-[76.2%] after:h-[19px] after:w-[18px] after:rotate-[15deg] after:rounded-tl-[30px] after:bg-transparent after:shadow-[-1px_-8px_0_0_#20222C] ${indicatorTranslate} ${activeIndex >= 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                  />
                </ul>
              </div>
            </nav>
          )}

          {/* ── Right area ── */}
          <div className="flex items-center justify-self-end gap-[12px] sm:gap-[20px]">

            {/* Logged-in state: profile name + visit button (hidden on profile page) */}
            {user && currentPage !== "profile" ? (
              <div className="flex items-center gap-[10px]">
                <div className="hidden items-center gap-[8px] sm:flex">
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#FF540B]">
                    <User strokeWidth={2} className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-inter text-[14px] font-semibold text-white">{user.name}</span>
                </div>
                <button
                  className="font-inter flex cursor-pointer items-center gap-[6px] rounded-[12px] border-[1.5px] border-[#FF540B] bg-transparent px-[14px] py-[7px] text-[13px] font-semibold text-[#FF540B] transition-all duration-200 hover:bg-[rgba(255,84,11,0.10)]"
                  onClick={() => handleNav("profile")}
                >
                  Visiter mon profil
                  <ChevronRight strokeWidth={2.5} className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                {showConnexion && (
                  <button
                    className="font-inter cursor-pointer border-none bg-transparent text-[15px] font-bold tracking-[0.2px] text-white transition-colors duration-200 hover:text-[#FF540B]"
                    onClick={() => handleNav("signin")}
                  >
                    Connexion
                  </button>
                )}
                {showCommencer && (
                  <button
                    className="font-inter flex cursor-pointer items-center gap-[6px] sm:gap-[10px] rounded-[12px] border-[1.5px] border-[#ff540b69] bg-transparent px-[12px] sm:px-[18px] py-[7px] sm:py-[8px] text-[13px] sm:text-[14px] font-semibold tracking-[0.2px] text-[#ff540b69] transition-all duration-200 ease-in hover:border-[#FF540B] hover:bg-[rgba(255,84,11,0.10)] hover:text-[#FF540B]"
                    onClick={() => handleNav("signup")}
                  >
                    <Sparkles strokeWidth={2} className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Commencer</span>
                    <span className="sm:hidden">Start</span>
                  </button>
                )}
              </>
            )}

            {/* ── Mobile hamburger (only when nav pill is shown) ── */}
            {showNavPill && (
              <button
                className="flex h-[36px] w-[36px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[8px] border border-[#3a3d52] bg-transparent transition-colors duration-200 hover:bg-[#2a2d3e] md:hidden"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Menu"
              >
                <span className={`block h-[2px] w-[18px] rounded-full bg-white transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`block h-[2px] w-[18px] rounded-full bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[2px] w-[18px] rounded-full bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile nav dropdown ── */}
        {showNavPill && mobileOpen && (
          <div className="border-t border-[#2a2d35] bg-[#20222C] px-[16px] py-[12px] md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex w-full items-center gap-[12px] rounded-[10px] px-[14px] py-[12px] text-[15px] font-semibold transition-colors duration-200 ${
                  active === item.id
                    ? "bg-[rgba(255,84,11,0.12)] text-[#FF540B]"
                    : "text-white hover:bg-[#2a2d3e] hover:text-[#FF540B]"
                }`}
              >
                <ion-icon name={item.icon} />
                {item.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className={spacerClass} />
    </>
  );
}
