import HeroPage from './HeroPage'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
import { apiGet } from './api/client'
import Matchmaking from './pages/Matchmaking.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Accueil from './pages/Accueil.jsx'
import Messages from './pages/Messages.jsx'
import Favorites from './pages/Favorites.jsx'

function App() {
  const [route, setRoute] = useState('accueil')
  // Id du profil consulté quand on navigue vers 'profile' (null = profil de l'utilisateur connecté)
  const [viewedUserId, setViewedUserId] = useState(null)
  // Score de compatibilité connu au moment de la navigation (ex: depuis Matchmaking), sinon null
  const [viewedMatchScore, setViewedMatchScore] = useState(null)
  // Contact à ouvrir directement en arrivant sur la messagerie (ex: depuis le bouton "Contacter" d'un profil)
  const [messagesContactId, setMessagesContactId] = useState(null)
  // Global auth state shared across all components
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }) // null = logged out, { ...profil } = connecté
  // Message à afficher sur la page de connexion suite à un retour OAuth (succès ou erreur)
  const [oauthNotice, setOauthNotice] = useState("")

  const OAUTH_ERROR_MESSAGES = {
    google_not_configured: "Connexion Google non encore configurée.",
    linkedin_not_configured: "Connexion LinkedIn non encore configurée.",
    oauth_failed: "La connexion a échoué. Veuillez réessayer.",
  }

  // Détecte le retour du flux OAuth (redirection backend vers /?oauth_token=... ou ?oauth_error=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('oauth_token')
    const oauthError = params.get('oauth_error')
    if (!token && !oauthError) return

    window.history.replaceState({}, '', window.location.pathname)

    if (token) {
      localStorage.setItem('token', token)
      apiGet('/auth/me')
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data.user))
          setUser(data.user)
          setRoute('dashboard')
        })
        .catch(() => {
          localStorage.removeItem('token')
          setOauthNotice("La connexion a échoué. Veuillez réessayer.")
          setRoute('signin')
        })
    } else if (oauthError) {
      setOauthNotice(OAUTH_ERROR_MESSAGES[oauthError] || "La connexion a échoué.")
      setRoute('signin')
    }
  }, [])

  const handleLogin = ({ user: userData, token }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setRoute('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setRoute('signin')
  }

  // params.userId optionnel : permet à Matchmaking/Dashboard d'ouvrir le profil d'un match précis
  const handleNavigate = (page, params) => {
    setRoute(page)
    setViewedUserId(page === 'profile' ? params?.userId || null : null)
    setViewedMatchScore(page === 'profile' && typeof params?.compatibilityScore === 'number' ? params.compatibilityScore : null)
    setMessagesContactId(page === 'messages' ? params?.contactId || null : null)
  }

  const renderPage = () => {
    switch (route) {
      case 'matchmaking':
        return <Matchmaking onNavigate={handleNavigate} />
      case 'signin':
        return <SignIn onNavigate={handleNavigate} onLogin={handleLogin} notice={oauthNotice} />
      case 'signup':
        return <SignUp onNavigate={handleNavigate} onLogin={handleLogin} user={user} />
      case 'profile':
        return <Profile onNavigate={handleNavigate} userId={viewedUserId} currentUser={user} matchScore={viewedMatchScore} />
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} user={user} />
      case 'messages':
        return <Messages onNavigate={handleNavigate} user={user} initialContactId={messagesContactId} />
      case 'favorites':
        return <Favorites onNavigate={handleNavigate} user={user} />
      case 'accueil':
      default:
        return <Accueil onNavigate={handleNavigate} user={user} />
    }
  }

  return (
    <div className="font-inter flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar
        currentPage={route}
        onNavigate={handleNavigate}
        hideNav={!['accueil', 'matchmaking', 'dashboard', 'messages'].includes(route)}
        user={user}
        onLogout={handleLogout}
      />
      <main className="w-full flex-1 p-0">
        {renderPage()}
      </main>
      {['accueil', 'matchmaking', 'dashboard', 'messages'].includes(route) && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  )
}

export default App