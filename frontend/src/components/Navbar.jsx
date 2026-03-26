import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

// ─── Variant config ───────────────────────────────────────────────────────────

const AUTH_PAGES    = ["signin", "signup"];
const DASHBOARD_PAGES = ["profile", "settings" , "forgot-password" , "reset-password" , "verify-email" , "profile-edit" , "email-preferences" , "delete-account" , "two-factor-auth" , "sessions" , "api-tokens"];
const DEFAULT_PAGES = ["accueil", "matchmaking", "dashboard"];

const NAVBAR_VARIANTS = {
  default: { 
    headerHeight: 102,
    innerMarginTop: 25,
  },
  auth: {
    headerHeight: 90,
    innerMarginTop: 1,
  },
};

/** Derive the variant key from the current page string. */
function getVariant(page) {
  if (AUTH_PAGES.includes(page))       return "auth";
  if (DASHBOARD_PAGES.includes(page))  return "auth";
  if (DEFAULT_PAGES.includes(page))    return "default";
  return "default";
}

/**
 * Which buttons to show in the right area.
 *
 * signin  → only "Commencer" (signup button)
 * signup  → only "Connexion" (signin button)
 * others  → both
 */
function getRightButtons(page) {
  if (page === "signin")                return { showConnexion: false, showCommencer: true  };
  if (page === "signup")                return { showConnexion: true,  showCommencer: false };
  if (DASHBOARD_PAGES.includes(page))   return { showConnexion: false, showCommencer: false };
  return                                       { showConnexion: true,  showCommencer: true  };
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

// ─── Global CSS ───────────────────────────────────────────────────────────────

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&display=swap');

  .nav-indicator::before {
    content: '';
    position: absolute;
    top: 77%;
    left: -11px;
    width: 17px;
    height: 18px;
    background: transparent;
    border-top-right-radius: 30px;
    box-shadow: 1px -8px 0 0 #20222C;
    rotate: -10deg;
  }

  .nav-indicator::after {
    content: '';
    position: absolute;
    top: 76.2%;
    right: -13px;
    width: 18px;
    height: 19px;
    background: transparent;
    border-top-left-radius: 30px;
    box-shadow: -1px -8px 0 0 #20222C;
    rotate: 15deg;
  }

  .nav-icon {
    display: block;
    line-height: 60px;
    font-size: 1.5em;
    text-align: center;
    transition: 0.5s;
    color: #3F3F3F;
    transform: translateY(0);
    margin-bottom: 10px;
  }

  .nav-icon.active {
    transform: translateY(-32px);
    color: #3F3F3F;
  }

  .mh-btn-conn {
    background: none;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: color 0.2s;
    letter-spacing: 0.2px;
  }
  .mh-btn-conn:hover { color: #FF540B; }

  .mh-btn-start {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 18px;
    border-radius: 12px;
    border: 1.5px solid #ff540b69;
    background: transparent;
    color: #ff540b69;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
    letter-spacing: 0.2px;
  }
  .mh-btn-start:hover {
    border-color: #FF540B;
    background: rgba(255, 84, 11, 0.10);
    color: #FF540B;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar({ currentPage, onNavigate, hideNav, variant }) {
  useIonicons();
  const [active, setActive] = useState(currentPage || "accueil");

  useEffect(() => {
    if (currentPage) setActive(currentPage);
  }, [currentPage]);

  const handleNav = (id) => {
    setActive(id);
    if (onNavigate) onNavigate(id);
  };

  // ✅ Fix : utilise currentPage (prop, source de vérité de App)
  // et non active (état local qui peut être désynchronisé sur les pages dashboard/auth)
  const handleLogoClick = () => {
    if (currentPage === "accueil") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (onNavigate) onNavigate("accueil");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activeIndex = navItems.findIndex((item) => item.id === active);

  const resolvedVariant = variant ?? getVariant(currentPage);
  const { headerHeight, innerMarginTop } = NAVBAR_VARIANTS[resolvedVariant];

  const { showConnexion, showCommencer } = getRightButtons(active);
  const isSingleAuthButton = (active === "signin" || active === "signup");

  return (
    <>
      <style>{globalCSS}</style>

      <header style={{ ...styles.header, height: headerHeight }}>
        <div
          style={{
            ...styles.inner,
            marginTop: innerMarginTop,
            gridTemplateColumns: hideNav || AUTH_PAGES.includes(active) || DASHBOARD_PAGES.includes(active)
              ? "auto 1fr"
              : "1fr auto 1fr",
          }}
        >

          {/* Logo */}
          <div onClick={handleLogoClick} style={styles.logo}>
            <div style={styles.logoIcon}>
              <Sparkles size={20} color="white" strokeWidth={2} />
            </div>
            <span style={styles.logoText}>
              Match<span style={{ color: "#FF540B" }}>Hub</span>
            </span>
          </div>

          {/* Nav pill — hidden on auth pages or when hideNav is set */}
          {!hideNav && (
            <nav style={{ position: "relative" }}>
              <div style={styles.navigation}>
                <ul style={styles.ul}>
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        style={styles.li}
                      >
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          style={styles.a}
                        >
                          <span className={`nav-icon${isActive ? " active" : ""}`}>
                            <ion-icon name={item.icon} />
                          </span>
                          <span style={styles.text}>{item.name}</span>
                        </a>
                      </li>
                    );
                  })}

                  <div
                    className="nav-indicator"
                    style={{
                      ...styles.indicator,
                      transform:
                        activeIndex >= 0
                          ? `translateX(calc(100px * ${activeIndex} + 20px))`
                          : "translateX(0)",
                      opacity: activeIndex >= 0 ? 1 : 0,
                      pointerEvents: activeIndex >= 0 ? "auto" : "none",
                    }}
                  />
                </ul>
              </div>
            </nav>
          )}

          {/* Right buttons */}
          <div
            style={{
              ...styles.right,
              justifySelf: "end",
              gridColumn: isSingleAuthButton && hideNav ? "3" : undefined,
            }}
          >
            {showConnexion && (
              <button className="mh-btn-conn" onClick={() => handleNav("signin")}>
                Connexion
              </button>
            )}
            {showCommencer && (
              <button className="mh-btn-start" onClick={() => handleNav("signup")}>
                <Sparkles size={15} strokeWidth={2} />
                Commencer
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: headerHeight }} />
    </>
  );
}

// ─── Static styles ────────────────────────────────────────────────────────────

const styles = {
  header: {
    backgroundColor: "#20222C",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottom: "1px solid #2a2d35",
  },
  inner: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "0 clamp(1rem, 3vw, 40px)",
    height: "90px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    userSelect: "none",
    justifySelf: "start",
  },
  logoIcon: {
    backgroundColor: "#FF540B",
    borderRadius: "40%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "20px",
    fontWeight: 700,
    color: "white",
    letterSpacing: "-0.3px",
    fontFamily: '"Inter", sans-serif',
  },
  navigation: {
    position: "relative",
    width: "320px",
    height: "50px",
    backgroundColor: "#3F3F3F",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    justifySelf: "center",
  },
  ul: {
    display: "flex",
    width: "300px",
    padding: 0,
    margin: 0,
    listStyle: "none",
    position: "relative",
  },
  li: {
    position: "relative",
    width: "100px",
    height: "70px",
    zIndex: 1,
    cursor: "pointer",
  },
  a: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontWeight: 500,
    textDecoration: "none",
    fontFamily: '"Inter", sans-serif',
  },
  text: {
    position: "absolute",
    bottom: "22px",
    color: "#fff",
    fontWeight: 550,
    fontSize: "0.725rem",
    letterSpacing: "0.05rem",
    transition: "0.5s",
    opacity: 1,
    fontFamily: '"Inter", sans-serif',
  },
  indicator: {
    position: "absolute",
    top: "-50%",
    width: "60px",
    height: "60px",
    backgroundColor: "#FF540B",
    borderRadius: "50%",
    border: "6px solid #20222C",
    transition: "transform 0.5s",
  },
  right: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifySelf: "end",
  },
};