import { useState } from 'react'
import { Mail } from 'lucide-react'
import { forgotPassword } from '../api/auth'

// Limite connue (Sprint 1) : aucun service d'envoi d'email n'est encore branché côté backend.
// En développement, l'API renvoie resetToken dans la réponse pour rester testable manuellement ;
// ce lien "dev" disparaîtra de lui-même une fois l'envoi d'email réellement câblé (resetToken ne
// sera alors plus jamais présent dans la réponse en production).
export default function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [devResetToken, setDevResetToken] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await forgotPassword(email.trim())
      setSent(true)
      setDevResetToken(data.resetToken || null)
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-inter flex w-full items-center justify-center bg-[#161822] px-4" style={{ minHeight: 'calc(100vh - 90px)' }}>
      <div className="w-full max-w-[460px] rounded-[20px] bg-[#1E2130] px-6 py-8 sm:px-9 sm:py-10">
        <h1 className="mb-2 text-2xl font-extrabold text-white">Mot de passe oublié</h1>
        <p className="mb-6 text-sm font-medium text-[#8A8FA8]">
          Entrez votre email : si un compte existe, un lien de réinitialisation vous sera envoyé.
        </p>

        {sent ? (
          <div className="space-y-4">
            <div className="rounded-[12px] border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.10)] px-4 py-3 text-sm text-[#4ade80]">
              Si ce compte existe, un email de réinitialisation a été envoyé.
            </div>
            {devResetToken && (
              <div className="rounded-[12px] border border-[rgba(255,84,11,0.35)] bg-[rgba(255,84,11,0.08)] px-4 py-3 text-xs text-[#f5a05a]">
                <p className="mb-2 font-semibold">Mode développement — l'envoi d'email n'est pas encore branché.</p>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('reset-password', { resetToken: devResetToken })}
                  className="cursor-pointer rounded-full bg-[#FF540B] px-4 py-1.5 font-semibold text-white hover:bg-[#e84a00]"
                >
                  Continuer vers la réinitialisation →
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-3 rounded-[9px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-3 py-2 text-xs font-medium text-[#ff7043]">
                {error}
              </div>
            )}
            <label className="mb-1.5 block text-sm font-semibold text-[#BBBFD4]">Email</label>
            <div className="relative mb-5 flex items-center">
              <span className="pointer-events-none absolute left-3 flex items-center text-[#5A5F7A]">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[9px] border-[1.5px] border-[#ff540b52] bg-[#252838] px-3 py-2.5 pl-9 text-[14.5px] text-white outline-none focus:border-[#ff4d00] focus:bg-[#2A2D3E]"
                placeholder="vous@exemple.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mb-4 w-full cursor-pointer rounded-[50px] bg-[#FF540B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e84a00] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Envoi…' : 'Envoyer le lien'}
            </button>
          </form>
        )}

        <button
          onClick={() => onNavigate && onNavigate('signin')}
          className="w-full cursor-pointer text-center text-[13px] font-medium text-[#8A8FA8] hover:text-[#FF540B]"
        >
          ← Retour à la connexion
        </button>
      </div>
    </div>
  )
}
