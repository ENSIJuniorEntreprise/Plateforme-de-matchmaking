import React, { useState } from "react";
import { Sparkles, User, Lock, Eye, EyeOff } from "lucide-react";

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #161822;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .conn-card {
    background: #1E2130;
    border-radius: 20px;
    padding: 32px 52px 28px;
    width: 100%;
    max-width: 600px;
  }

  .conn-title {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
  }

  .conn-subtitle {
    font-size: 13px;
    color: #8A8FA8;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .social-btn {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    background: #2A2D3E;
    color: #BBBFD4;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.2s, color 0.2s;
    margin-bottom: 10px;
    position: relative;
  }
  .social-btn:hover:not(:disabled) { background: #32364A; color: #ffffff; }
  .social-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .social-icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #3A3D52;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .social-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #4a4f6a;
    border-top-color: #FF540B;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-left: auto;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 16px 0;
  }
  .divider-line { flex: 1; height: 1px; background: #2E3147; }
  .divider-text { color: #5A5F7A; font-size: 13px; font-weight: 500; }

  .input-group { margin-bottom: 14px; }
  .input-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #BBBFD4;
    margin-bottom: 6px;
  }
  .input-wrap { position: relative; display: flex; align-items: center; }
  .input-icon {
    position: absolute;
    left: 14px;
    color: #5A5F7A;
    display: flex;
    align-items: center;
    pointer-events: none;
  }
  .conn-input {
    width: 100%;
    padding: 11px 14px 11px 44px;
    background: #252838;
    border: 1.5px solid #ff540b52;
    border-radius: 10px;
    color: #ffffff;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .conn-input::placeholder { color: #4A4F6A; }
  .conn-input:focus { border-color: #ff4d00; background: #2A2D3E; }
  .conn-input.error { border-color: #e84a00; }

  .eye-btn {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: #5A5F7A;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: #BBBFD4; }

  .row-extras {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
  }
  .custom-checkbox {
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 1.5px solid #3A3D52;
    background: #252838;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
  }
  .custom-checkbox.checked { background: #FF540B; border-color: #FF540B; }
  .checkbox-text { font-size: 13px; color: #8A8FA8; font-weight: 500; }

  .forgot-link {
    font-size: 13px;
    color: #8A8FA8;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
  }
  .forgot-link:hover { color: #FF540B; }

  /* ── Error banner ── */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(232, 74, 0, 0.12);
    border: 1px solid rgba(232, 74, 0, 0.35);
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 14px;
    font-size: 13px;
    color: #ff7043;
    font-weight: 500;
  }

  /* ── reCAPTCHA ── */
  .recaptcha-widget {
    display: flex;
    align-items: center;
    width: 260px;
    height: 64px;
    background: #f9f9f9;
    border: 1px solid #d3d3d3;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0,0,0,.08);
    margin-bottom: 18px;
    padding: 0 12px;
    cursor: pointer;
    user-select: none;
    position: relative;
    overflow: hidden;
  }
  .recaptcha-widget:hover { background: #f2f2f2; }
  .recaptcha-widget::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #4285f4 0%, #34a853 33%, #fbbc05 66%, #ea4335 100%);
  }

  .rc-checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid #c1c1c1;
    border-radius: 2px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 12px;
  }

  .rc-spinning {
    width: 24px;
    height: 24px;
    border: 2px solid #e0e0e0;
    border-top-color: #4285f4;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
    margin-right: 12px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .rc-label {
    font-size: 14px;
    color: #333;
    font-family: 'Roboto', 'Inter', sans-serif;
    font-weight: 400;
  }

  .rc-branding {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    flex-shrink: 0;
  }

  .rc-brand-text {
    font-size: 9px;
    color: #9aa0ab;
    font-family: 'Roboto', 'Inter', sans-serif;
    font-weight: 400;
    text-align: center;
    line-height: 1.3;
  }
  .rc-brand-text a { color: #9aa0ab; text-decoration: none; }
  .rc-brand-text a:hover { text-decoration: underline; }

  /* ── Submit button ── */
  .conn-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 200px;
    margin: 0 auto 16px;
    padding: 12px 24px;
    border-radius: 50px;
    border: none;
    background: #ff540b41;
    color: #6a6f8aba;
    font-size: 16px;
    font-weight: 700;
    cursor: not-allowed;
    font-family: 'Inter', sans-serif;
    transition: background 0.3s, color 0.3s, transform 0.15s, box-shadow 0.3s;
    letter-spacing: 0.1px;
  }
  .conn-btn.active {
    background: #FF540B;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(255, 84, 11, 0.35);
  }
  .conn-btn.active:hover:not(:disabled) { background: #e84a00; transform: translateY(-1px); }
  .conn-btn.active:active { transform: translateY(0); }
  .conn-btn:disabled { cursor: not-allowed; }

  .btn-spinner {
    width: 17px;
    height: 17px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .conn-footer {
    text-align: center;
    font-size: 13px;
    color: #5A5F7A;
    font-weight: 500;
  }
  .conn-footer a {
    color: #ff540bdb;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.2s;
  }
  .conn-footer a:hover { color: #e84900; }
`;

// ─── SVG icons ────────────────────────────────────────────────────────────────

const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#9AA0B4" d="M24 9.5c3.15 0 5.64 1.08 7.56 2.84l5.63-5.63C33.7 3.54 29.2 1.5 24 1.5 14.72 1.5 6.84 7.1 3.28 15.06l6.57 5.1C11.57 13.63 17.28 9.5 24 9.5z"/>
    <path fill="#7A8099" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.42c-.54 2.9-2.18 5.36-4.65 7.02l7.18 5.57C43.12 37.16 46.1 31.3 46.1 24.5z"/>
    <path fill="#8A8FA8" d="M9.85 28.16A14.6 14.6 0 0 1 9.5 24c0-1.44.22-2.84.6-4.16l-6.57-5.1A22.45 22.45 0 0 0 1.5 24c0 3.6.86 7 2.4 10.06l5.95-5.9z"/>
    <path fill="#6E7490" d="M24 46.5c5.2 0 9.56-1.72 12.74-4.66l-7.18-5.57c-1.76 1.18-4.02 1.88-5.56 1.88-6.72 0-12.43-4.13-14.15-9.99l-5.95 5.9C6.84 40.9 14.72 46.5 24 46.5z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#7A8099" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.981 1.981 0 0 1-1.982-1.981c0-1.094.888-1.982 1.982-1.982 1.093 0 1.98.888 1.98 1.982a1.98 1.98 0 0 1-1.98 1.981zm1.955 13.019H3.382V9h3.91v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ReCaptchaCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2.5 9.5l4.5 4.5 8.5-8.5" stroke="#34A853" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WhiteCheck = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1.5 5.5l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="7" stroke="#ff7043" strokeWidth="1.5"/>
    <path d="M8 4.5v4M8 10.5v1" stroke="#ff7043" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── reCAPTCHA ────────────────────────────────────────────────────────────────

function ReCaptcha({ checked, onChange }) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (checked || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onChange(true); }, 1200);
  };
  return (
    <div className="recaptcha-widget" onClick={handleClick}>
      {loading
        ? <div className="rc-spinning" />
        : <div className={`rc-checkbox${checked ? " checked" : ""}`}>{checked && <ReCaptchaCheck />}</div>
      }
      <span className="rc-label">{loading ? "Vérification…" : "I'm not a robot"}</span>
      <div className="rc-branding">
        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" style={{ width: 34, height: 34, objectFit: "contain" }} />
        <div className="rc-brand-text">
          reCAPTCHA<br/>
          <a href="#" onClick={e => e.preventDefault()}>Privacy</a> - <a href="#" onClick={e => e.preventDefault()}>Terms</a>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ConnexionPage({ onNavigate }) {
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [showPassword, setShowPassword]     = useState(false);
  const [remember, setRemember]             = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const [loadingLogin, setLoadingLogin]       = useState(false);
  const [loadingGoogle, setLoadingGoogle]     = useState(false);
  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);

  const [error, setError] = useState("");

  const anyLoading = loadingLogin || loadingGoogle || loadingLinkedIn;
  const canSubmit  = email.trim() !== "" && password.trim() !== "" && captchaChecked && !anyLoading;

  // ── Stocke le token et redirige ───────────────────────────────────────────

  const handleAuthSuccess = (data) => {
    // Compatible avec { token }, { access_token }, { jwt }, { user, token }, etc.
    const token = data?.token || data?.access_token || data?.jwt || null;
    if (token) localStorage.setItem("mh_token", token);
    if (data?.user) localStorage.setItem("mh_user", JSON.stringify(data.user));
    onNavigate && onNavigate("dashboard");
  };

  // ── Parse les erreurs HTTP en message lisible ─────────────────────────────

  const parseApiError = async (res) => {
    try {
      const body = await res.json();
      return body?.message || body?.error || `Erreur ${res.status}`;
    } catch {
      return `Erreur ${res.status} — veuillez réessayer.`;
    }
  };

  // ── Se connecter via email + mot de passe → POST /auth/signin ────────────

  const handleLogin = async () => {
    if (!canSubmit) return;
    setError("");
    setLoadingLogin(true);
    try {
      const res = await fetch("/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        // credentials: "include", // décommenter si ton API utilise les cookies de session
      });
      if (!res.ok) {
        setError(await parseApiError(res));
        return;
      }
      handleAuthSuccess(await res.json());
    } catch {
      setError("Impossible de joindre le serveur. Vérifiez votre connexion.");
    } finally {
      setLoadingLogin(false);
    }
  };

  // ── Google OAuth (simulation — remplacer par ton SDK ou redirect) ─────────

  const handleGoogle = () => {
    if (anyLoading) return;
    setError("");
    setLoadingGoogle(true);
    setTimeout(() => {
      setLoadingGoogle(false);
      // TODO: remplacer par → window.location.href = "/auth/google";
      setError("Connexion Google non encore configurée.");
    }, 1500);
  };

  // ── LinkedIn OAuth (simulation — remplacer par ton SDK ou redirect) ───────

  const handleLinkedIn = () => {
    if (anyLoading) return;
    setError("");
    setLoadingLinkedIn(true);
    setTimeout(() => {
      setLoadingLinkedIn(false);
      // TODO: remplacer par → window.location.href = "/auth/linkedin";
      setError("Connexion LinkedIn non encore configurée.");
    }, 1500);
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{globalCSS}</style>
      <div style={{ backgroundColor: "#161822", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
        <div className="conn-card">
          <h1 className="conn-title">Connectez-vous</h1>
          <p className="conn-subtitle">Accédez à votre compte MatchHub</p>

          {/* ── Google ── */}
          <button className="social-btn" onClick={handleGoogle} disabled={anyLoading}>
            <div className="social-icon-wrap"><GoogleG /></div>
            {loadingGoogle ? "Connexion en cours…" : "Continuer avec Google"}
            {loadingGoogle && <div className="social-spinner" />}
          </button>

          {/* ── LinkedIn ── */}
          <button className="social-btn" onClick={handleLinkedIn} disabled={anyLoading}>
            <div className="social-icon-wrap"><LinkedInIcon /></div>
            {loadingLinkedIn ? "Connexion en cours…" : "Continuer avec Linkedin"}
            {loadingLinkedIn && <div className="social-spinner" />}
          </button>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">ou</span>
            <div className="divider-line" />
          </div>

          {/* ── Bandeau erreur ── */}
          {error && (
            <div className="error-banner">
              <ErrorIcon />
              {error}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrap">
              <span className="input-icon"><User size={17} /></span>
              <input
                className={`conn-input${error ? " error" : ""}`}
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Mot de passe</label>
            <div className="input-wrap">
              <span className="input-icon"><Lock size={17} /></span>
              <input
                className={`conn-input${error ? " error" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                style={{ paddingRight: "44px" }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <button className="eye-btn" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="row-extras">
            <div className="checkbox-label" onClick={() => setRemember(v => !v)}>
              <div className={`custom-checkbox${remember ? " checked" : ""}`}>
                {remember && <WhiteCheck />}
              </div>
              <span className="checkbox-text">Se souvenir de moi</span>
            </div>
            <a
              href="#"
              className="forgot-link"
              onClick={e => { e.preventDefault(); onNavigate && onNavigate("forgot-password"); }}
            >
              Mot de passe oublié ?
            </a>
          </div>

          <ReCaptcha checked={captchaChecked} onChange={setCaptchaChecked} />

          {/* ── Se connecter ── */}
          <button
            className={`conn-btn${canSubmit ? " active" : ""}`}
            disabled={!canSubmit}
            onClick={handleLogin}
          >
            {loadingLogin
              ? <><div className="btn-spinner" />Connexion…</>
              : <><Sparkles size={17} strokeWidth={2} />Se connecter</>
            }
          </button>

          <p className="conn-footer">
            Nouveau sur MatchHub ?&nbsp;
            <a href="#" onClick={e => { e.preventDefault(); onNavigate && onNavigate("signup"); }}>
              Créez votre compte
            </a>
          </p>
        </div>
      </div>
    </>
  );
}