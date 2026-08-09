import HeroPage from './HeroPage'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState } from 'react';
import Matchmaking from './pages/Matchmaking.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Accueil from './pages/Accueil.jsx'

function App() {
  const [route, setRoute] = useState('accueil')
  // Id du profil consulté quand on navigue vers 'profile' (null = profil de l'utilisateur connecté)
  const [viewedUserId, setViewedUserId] = useState(null)
  // Score de compatibilité connu au moment de la navigation (ex: depuis Matchmaking), sinon null
  const [viewedMatchScore, setViewedMatchScore] = useState(null)
  // Global auth state shared across all components
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }) // null = logged out, { ...profil } = connecté

  const handleLogin = ({ user: userData, token }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setRoute('dashboard')
  }

  // params.userId optionnel : permet à Matchmaking/Dashboard d'ouvrir le profil d'un match précis
  const handleNavigate = (page, params) => {
    setRoute(page)
    setViewedUserId(page === 'profile' ? params?.userId || null : null)
    setViewedMatchScore(page === 'profile' && typeof params?.compatibilityScore === 'number' ? params.compatibilityScore : null)
  }

  const renderPage = () => {
    switch (route) {
      case 'matchmaking':
        return <Matchmaking onNavigate={handleNavigate} />
      case 'signin':
        return <SignIn onNavigate={handleNavigate} onLogin={handleLogin} />
      case 'signup':
        return <SignUp onNavigate={handleNavigate} onLogin={handleLogin} user={user} />
      case 'profile':
        return <Profile onNavigate={handleNavigate} userId={viewedUserId} currentUser={user} matchScore={viewedMatchScore} />
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} user={user} />
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
        hideNav={!['accueil', 'matchmaking', 'dashboard'].includes(route)}
        user={user}
      />
      <main className="w-full flex-1 p-0">
        {renderPage()}
      </main>
      {['accueil', 'matchmaking', 'dashboard'].includes(route) && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  )
}

export default App