import React from "react";
import { Sparkles } from "lucide-react";

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&display=swap');

  .footer-link {
    color: #9ca3af;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    transition: color 0.2s;
    display: block;
    margin-bottom: 18px;
    cursor: pointer;
  }
  .footer-link:hover { color: #FF540B; }

  .footer-social-btn {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1.5px solid #ff540b96;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }
  .footer-social-btn:hover {
    border-color: #FF540B;
    background: rgba(255, 84, 11, 0.10);
  }

  .footer-contact-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .footer-contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1.5px solid #FF540B;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

export default function Footer({ onNavigate }) {
  const handleLogoClick = () => {
    if (onNavigate) onNavigate("accueil");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{globalCSS}</style>

      <footer style={styles.footer}>
        <div style={styles.inner}>

          {/* Colonne gauche : logo + description + contacts */}
          <div style={styles.colLeft}>
            <div style={styles.logo} onClick={handleLogoClick}>
              <div style={styles.logoIcon}>
                <Sparkles size={20} color="white" strokeWidth={2} />
              </div>
              <span style={styles.logoText}>
                Match<span style={{ color: "#FF540B" }}>Hub</span>
              </span>
            </div>

            <p style={styles.description}>
              La plateforme de matching intelligent qui connecte startups, talents et investisseurs
              pour accélérer leur succès.
            </p>

            <div style={{ marginTop: "8px" }}>
              <div className="footer-contact-row">
                <div className="footer-contact-icon">
                  <svg width="30" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="24" height="17" rx="2"/>
                    <polyline points="3,4 13,13 23,4"/>
                    <line x1="2" y1="19" x2="10" y2="11"/>
                    <line x1="23" y1="19" x2="16" y2="11"/>
                  </svg>
                </div>
                <span style={styles.contactText}>ensijunior@*****</span>
              </div>

              <div className="footer-contact-row">
                <div className="footer-contact-icon">
                  <svg width="30" height="30" viewBox="-1 1 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.418A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </div>
                <span style={styles.contactText}>+216 ** *** ***</span>
              </div>

              <div className="footer-contact-row">
                <div className="footer-contact-icon">
                  <svg width="24" height="27" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <span style={styles.contactText}>linkedin.com/company/ensi-junior-entreprise/</span>
              </div>
            </div>
          </div>

          {/* Colonne Produit */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Produit</h4>
            <a className="footer-link">Fonctionnalités</a>
            <a className="footer-link">Matchmaking</a>
            <a className="footer-link">Tarifs</a>
            <a className="footer-link">API</a>
          </div>

          {/* Colonne Entreprise */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Entreprise</h4>
            <a className="footer-link">À propos</a>
            <a className="footer-link">Carrieres</a>
            <a className="footer-link">Blog</a>
            <a className="footer-link">Contact</a>
          </div>

          {/* Colonne Légal */}
          <div style={styles.colLegal}>
            <h4 style={styles.colTitle}>Légal</h4>
            <a className="footer-link">Confidentialité</a>
            <a className="footer-link">CGU</a>
            <a className="footer-link">Cookies</a>
          </div>

          {/* Colonne Suivez-nous */}
          <div style={styles.colRight}>
            <p style={styles.suivezNous}>Suivez-nous</p>
            <div style={styles.socialRow}>
              <button className="footer-social-btn" aria-label="Facebook" onClick={() => window.open("https://www.facebook.com", "_blank")}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </button>
              <button className="footer-social-btn" aria-label="Instagram" onClick={() => window.open("https://www.instagram.com", "_blank")}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </button>
              <button className="footer-social-btn" aria-label="X" onClick={() => window.open("https://www.twitter.com", "_blank")}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#9ca3af">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Barre de copyright */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>© 2026 - MatchHub. Tous droits reserves.</p>
        </div>
      </footer>
    </>
  );
}

const styles = {
  footer: {
    backgroundColor: "#20222C",
    borderTop: "1px solid #2a2d35",
    width: "100%",
    fontFamily: '"Inter", sans-serif',
  },
  inner: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    gap: "40px",
    alignItems: "start",
    padding: "56px clamp(1rem, 3vw, 40px) 32px",
  },
  colLeft: {
    display: "flex",
    flexDirection: "column",
    justifySelf: "start",
    maxWidth: "300px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  colLegal: {
    display: "flex",
    flexDirection: "column",
  },
  colRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifySelf: "end",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "16px",
    cursor: "pointer",
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
  description: {
    color: "#9ca3af",
    fontSize: "13px",
    lineHeight: "1.7",
    fontWeight: 400,
    marginBottom: "24px",
    fontFamily: '"Inter", sans-serif',
  },
  contactText: {
    color: "#9ca3af",
    fontSize: "13px",
    fontFamily: '"Inter", sans-serif',
  },
  colTitle: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "24px",
    fontFamily: '"Inter", sans-serif',
    letterSpacing: "-0.2px",
  },
  suivezNous: {
    marginTop: "222px",
    color: "#7F8393",
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "16px",
    fontFamily: '"Inter", sans-serif',
    textAlign: "right",
    marginRight: "7px",
  },
  socialRow: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  bottomBar: {
    borderTop: "1px solid #2a2d35",
    padding: "20px clamp(1rem, 3vw, 40px)",
    display: "flex",
    justifyContent: "center",
  },
  copyright: {
    color: "#6b7280",
    fontSize: "13px",
    fontFamily: '"Inter", sans-serif',
  },
};