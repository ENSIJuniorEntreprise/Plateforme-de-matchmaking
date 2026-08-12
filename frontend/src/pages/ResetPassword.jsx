import { useState, useEffect } from 'react'
import { Lock } from 'lucide-react'
import { resetPassword } from '../api/auth'

export default function ResetPassword({ onNavigate, onLogin, resetToken }) {
  const [token, setToken] = useState(resetToken || '')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Permet aussi d'arriver ici via un lien "?token=..." (ex: un futur email de réinitialisation),
  // sans dépendre uniquement du token passé par ForgotPassword en mode développement.
  useEffect(() => {
    if (resetToken) return
    const fromQuery = new URLSearchParams(window.location.search).get('token')
    if (fromQuery) setToken(fromQuery)
  }, [resetToken])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token.trim()) {
      setError("Token de réinitialisation manquant. Repartez de « Mot de passe oublié ».")
      return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const data = await resetPassword(token.trim(), password)
      onLogin && onLogin({ user: data.user, token: data.token })
    } catch (err) {
      setError(err.message || 'Token invalide ou expiré.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-inter flex w-full items-center justify-center bg-[#161822] px-4" style={{ minHeight: 'calc(100vh - 90px)' }}>
      <div className="w-full max-w-[460px] rounded-[20px] bg-[#1E2130] px-6 py-8 sm:px-9 sm:py-10">
        <h1 className="mb-2 text-2xl font-extrabold text-white">Réinitialiser le mot de passe</h1>
        <p className="mb-6 text-sm font-medium text-[#8A8FA8]">Choisissez un nouveau mot de passe.</p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-3 rounded-[9px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-3 py-2 text-xs font-medium text-[#ff7043]">
              {error}
            </div>
          )}

          {!resetToken && (
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-semibold text-[#BBBFD4]">Token de réinitialisation</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full rounded-[9px] border-[1.5px] border-[#ff540b52] bg-[#252838] px-3 py-2.5 text-[14.5px] text-white outline-none focus:border-[#ff4d00] focus:bg-[#2A2D3E]"
                placeholder="Reçu par email"
              />
            </div>
          )}

          <label className="mb-1.5 block text-sm font-semibold text-[#BBBFD4]">Nouveau mot de passe</label>
          <div className="relative mb-4 flex items-center">
            <span className="pointer-events-none absolute left-3 flex items-center text-[#5A5F7A]">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[9px] border-[1.5px] border-[#ff540b52] bg-[#252838] px-3 py-2.5 pl-9 text-[14.5px] text-white outline-none focus:border-[#ff4d00] focus:bg-[#2A2D3E]"
              placeholder="••••••••"
            />
          </div>

          <label className="mb-1.5 block text-sm font-semibold text-[#BBBFD4]">Confirmer le mot de passe</label>
          <div className="relative mb-5 flex items-center">
            <span className="pointer-events-none absolute left-3 flex items-center text-[#5A5F7A]">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-[9px] border-[1.5px] border-[#ff540b52] bg-[#252838] px-3 py-2.5 pl-9 text-[14.5px] text-white outline-none focus:border-[#ff4d00] focus:bg-[#2A2D3E]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mb-4 w-full cursor-pointer rounded-[50px] bg-[#FF540B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e84a00] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Réinitialisation…' : 'Réinitialiser le mot de passe'}
          </button>
        </form>

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
