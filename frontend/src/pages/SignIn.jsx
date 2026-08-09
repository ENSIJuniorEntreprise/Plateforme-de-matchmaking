import React, { useState } from "react";
import { Sparkles, User, Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { login as apiLogin } from "../api/auth";

// ─── SVG icons ────────────────────────────────────────────────────────────────

const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" className="text-[#8A8FA8]" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M24 9.5c3.15 0 5.64 1.08 7.56 2.84l5.63-5.63C33.7 3.54 29.2 1.5 24 1.5 14.72 1.5 6.84 7.1 3.28 15.06l6.57 5.1C11.57 13.63 17.28 9.5 24 9.5z"/>
    <path fill="currentColor" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.42c-.54 2.9-2.18 5.36-4.65 7.02l7.18 5.57C43.12 37.16 46.1 31.3 46.1 24.5z"/>
    <path fill="currentColor" d="M9.85 28.16A14.6 14.6 0 0 1 9.5 24c0-1.44.22-2.84.6-4.16l-6.57-5.1A22.45 22.45 0 0 0 1.5 24c0 3.6.86 7 2.4 10.06l5.95-5.9z"/>
    <path fill="currentColor" d="M24 46.5c5.2 0 9.56-1.72 12.74-4.66l-7.18-5.57c-1.76 1.18-4.02 1.88-5.56 1.88-6.72 0-12.43-4.13-14.15-9.99l-5.95 5.9C6.84 40.9 14.72 46.5 24 46.5z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#7A8099]" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.981 1.981 0 0 1-1.982-1.981c0-1.094.888-1.982 1.982-1.982 1.093 0 1.98.888 1.98 1.982a1.98 1.98 0 0 1-1.98 1.981zm1.955 13.019H3.382V9h3.91v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ReCaptchaCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2.5 9.5l4.5 4.5 8.5-8.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#34A853]"/>
  </svg>
);

const WhiteCheck = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1.5 5.5l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#ff7043]">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4.5v4M8 10.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Password strength indicator ──────────────────────────────────────────────

function PasswordHint({ password }) {
  return null;
}

// ─── reCAPTCHA ────────────────────────────────────────────────────────────────

function ReCaptcha({ checked, onChange }) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (checked || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onChange(true); }, 1200);
  };
  return (
    <div
      className="relative mb-[12px] flex h-[60px] w-full max-w-[260px] cursor-pointer select-none items-center overflow-hidden rounded-[3px] border border-[#d3d3d3] bg-[#f9f9f9] px-[12px] shadow-[0_2px_4px_rgba(0,0,0,.08)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[linear-gradient(90deg,#4285f4_0%,#34a853_33%,#fbbc05_66%,#ea4335_100%)] hover:bg-[#f2f2f2]"
      onClick={handleClick}
    >
      {loading
        ? <div className="mr-[12px] h-[24px] w-[24px] shrink-0 animate-spin rounded-full border-[2px] border-[#e0e0e0] border-t-[#4285f4]" />
        : (
          <div className="mr-[12px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[2px] border-[2px] border-[#c1c1c1] bg-white">
            {checked && <ReCaptchaCheck />}
          </div>
        )
      }
      <span className="font-roboto text-[13px] font-normal text-[#333]">{loading ? "Vérification…" : "I'm not a robot"}</span>
      <div className="ml-auto flex shrink-0 flex-col items-center gap-[3px]">
        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="h-[32px] w-[32px] object-contain" />
        <div className="font-roboto text-center text-[9px] font-normal leading-[1.3] text-[#9aa0ab]">
          reCAPTCHA<br/>
          <a href="#" className="text-[#9aa0ab] no-underline hover:underline" onClick={e => e.preventDefault()}>Privacy</a> - <a href="#" className="text-[#9aa0ab] no-underline hover:underline" onClick={e => e.preventDefault()}>Terms</a>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ConnexionPage({ onNavigate, onLogin }) {
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [showPassword, setShowPassword]     = useState(false);
  const [remember, setRemember]             = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const [loadingLogin,    setLoadingLogin]    = useState(false);
  const [loadingGoogle,   setLoadingGoogle]   = useState(false);
  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);

  const [error, setError] = useState("");

  // ── Validation ─────────────────────────────────────────────────────────────
  const emailValid    = email.trim().includes("@") && email.trim().length > 3;
  const passwordValid = password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  const anyLoading    = loadingLogin || loadingGoogle || loadingLinkedIn;
  const canSubmit     = emailValid && captchaChecked && !anyLoading;

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleLogin = async () => {
    if (!canSubmit) return;
    setError("");
    setLoadingLogin(true);
    try {
      const data = await apiLogin({ email: email.trim(), password });
      if (onLogin) onLogin({ user: data.user, token: data.token });
    } catch (err) {
      setError(err.message || "Email ou mot de passe incorrect");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleGoogle = () => {
    if (anyLoading) return;
    setError("Connexion Google non encore configurée.");
  };

  const handleLinkedIn = () => {
    if (anyLoading) return;
    setError("Connexion LinkedIn non encore configurée.");
  };

  return (
    <div className="font-inter flex w-full items-center justify-center overflow-hidden bg-[#161822] px-[16px] sm:px-[24px]" style={{ minHeight: 'calc(100vh - 90px)' }}>
      <div className="w-full max-w-[521px] rounded-[20px] bg-[#1E2130] px-[20px] py-[16px] sm:px-[37px] sm:py-[20px]">

        <h1 className="mb-[2px] text-[23px] font-extrabold tracking-[-0.5px] text-white sm:text-[26px]">Connectez-vous</h1>
        <p className="mb-[14px] text-[13.79px] font-medium text-[#8A8FA8] sm:text-[14.78px]">Accédez à votre compte MatchHub</p>

        {/* ── Google ── */}
        <button
          className="relative mb-[8px] flex w-full cursor-pointer items-center gap-[13px] rounded-[10px] border-none bg-[#2A2D3E] px-[16px] py-[9px] text-[14.78px] font-semibold text-[#BBBFD4] transition-[background,color] duration-200 hover:bg-[#32364A] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleGoogle} disabled={anyLoading}
        >
          <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#3A3D52]"><GoogleG /></div>
          {loadingGoogle ? "Connexion…" : "Continuer avec Google"}
          {loadingGoogle && <div className="ml-auto h-[15px] w-[15px] animate-spin rounded-full border-[2px] border-[#4a4f6a] border-t-[#FF540B]" />}
        </button>

        {/* ── LinkedIn ── */}
        <button
          className="relative mb-[10px] flex w-full cursor-pointer items-center gap-[13px] rounded-[10px] border-none bg-[#2A2D3E] px-[16px] py-[9px] text-[14.78px] font-semibold text-[#BBBFD4] transition-[background,color] duration-200 hover:bg-[#32364A] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleLinkedIn} disabled={anyLoading}
        >
          <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#3A3D52]"><LinkedInIcon /></div>
          {loadingLinkedIn ? "Connexion…" : "Continuer avec LinkedIn"}
          {loadingLinkedIn && <div className="ml-auto h-[15px] w-[15px] animate-spin rounded-full border-[2px] border-[#4a4f6a] border-t-[#FF540B]" />}
        </button>

        <div className="my-[8px] flex items-center gap-[14px]">
          <div className="h-[1px] flex-1 bg-[#2E3147]" />
          <span className="text-[12.81px] font-medium text-[#5A5F7A]">ou</span>
          <div className="h-[1px] flex-1 bg-[#2E3147]" />
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div className="mb-[11px] flex items-center gap-[9px] rounded-[9px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-[11px] py-[8px] text-[11px] font-medium text-[#ff7043]">
            <ErrorIcon />
            {error}
          </div>
        )}

        {/* ── Email ── */}
        <div className="mb-[8px]">
          <label className="mb-[5px] block text-[13.79px] font-semibold text-[#BBBFD4]">Email</label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-[12px] flex items-center text-[#5A5F7A]"><User className="h-4 w-4" /></span>
            <input
              className={`w-full rounded-[9px] border-[1.5px] bg-[#252838] px-[11px] py-[9px] pl-[34px] text-[14.78px] text-white outline-none transition-[border-color,background] duration-200 placeholder:text-[#4A4F6A] focus:border-[#ff4d00] focus:bg-[#2A2D3E] ${
                email.length > 0
                  ? emailValid ? "border-[#4ade80]" : "border-[#e84a00]"
                  : error ? "border-[#e84a00]" : "border-[#ff540b52]"
              }`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
            />
          </div>
          {email.length > 0 && !emailValid && (
            <div className="mt-[4px] flex items-center gap-[5px]">
              <XCircle className="h-[11px] w-[11px] shrink-0 text-[#f87171]" strokeWidth={2.5} />
              <span className="text-[11.82px] font-medium text-[#f87171]">L'adresse e-mail doit contenir @</span>
            </div>
          )}
        </div>

        {/* ── Password ── */}
        <div className="mb-[11px]">
          <label className="mb-[5px] block text-[13.79px] font-semibold text-[#BBBFD4]">Mot de passe</label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-[12px] flex items-center text-[#5A5F7A]"><Lock className="h-4 w-4" /></span>
            <input
              className={`w-full rounded-[9px] border-[1.5px] bg-[#252838] px-[11px] py-[9px] pl-[34px] pr-[40px] text-[14.78px] text-white outline-none transition-[border-color,background] duration-200 placeholder:text-[#4A4F6A] focus:border-[#ff4d00] focus:bg-[#2A2D3E] ${error ? "border-[#e84a00]" : "border-[#ff540b52]"}`}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
            <button
              className="absolute right-[12px] flex cursor-pointer items-center border-none bg-transparent p-0 text-[#5A5F7A] transition-colors duration-200 hover:text-[#BBBFD4]"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {/* Password hint shown when user starts typing */}
          <PasswordHint password={password} />
        </div>

        {/* ── Remember + Forgot ── */}
        <div className="mb-[11px] flex items-center justify-between">
          <div className="flex cursor-pointer select-none items-center gap-[7px]" onClick={() => setRemember(v => !v)}>
            <div className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] border-[1.5px] transition-[border-color,background] duration-200 ${remember ? "border-[#FF540B] bg-[#FF540B]" : "border-[#3A3D52] bg-[#252838]"}`}>
              {remember && <WhiteCheck />}
            </div>
            <span className="text-[12.81px] font-medium text-[#8A8FA8]">Se souvenir</span>
          </div>
          <a
            href="#"
            className="cursor-pointer text-[12.41px] font-medium text-[#8A8FA8] no-underline transition-colors duration-200 hover:text-[#FF540B]"
            onClick={e => { e.preventDefault(); onNavigate && onNavigate("forgot-password"); }}
          >
            Mot de passe oublié ?
          </a>
        </div>

        <div className="mb-[10px] w-full overflow-x-auto">
          <div className="scale-[90.2%] origin-top-left">
          <ReCaptcha checked={captchaChecked} onChange={setCaptchaChecked} />
          </div>
        </div>

        {/* ── Submit button ── */}
        <button
          className={`mx-auto mb-[11px] flex w-full max-w-[214px] items-center justify-center gap-[8px] rounded-[50px] border-none px-[20px] py-[12px] text-[14px] font-bold tracking-[0.1px] transition-[background,color,transform,box-shadow] duration-300 ${
            canSubmit
              ? "cursor-pointer bg-[#FF540B] text-white shadow-[0_4px_20px_rgba(255,84,11,0.35)] hover:bg-[#e84a00] hover:-translate-y-[1px] active:translate-y-0"
              : "cursor-not-allowed bg-[#ff540b41] text-[#6a6f8aba]"
          }`}
          disabled={!canSubmit}
          onClick={handleLogin}
        >
          {loadingLogin
            ? <><div className="h-[15px] w-[15px] animate-spin rounded-full border-[2px] border-[rgba(255,255,255,0.3)] border-t-white" />Connexion…</>
            : <><Sparkles strokeWidth={2} className="h-4 w-4" />Se connecter</>
          }
        </button>

        <p className="text-center text-[12.81px] font-medium text-[#5A5F7A]">
          Nouveau sur MatchHub ?&nbsp;
          <a
            href="#"
            className="cursor-pointer font-semibold text-[#ff540bdb] underline transition-colors duration-200 hover:text-[#e84900]"
            onClick={e => { e.preventDefault(); onNavigate && onNavigate("signup"); }}
          >
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
}
