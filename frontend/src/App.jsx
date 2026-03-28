import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Matchmaking from './pages/Matchmaking'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

function App() {
  const [route, setRoute] = useState('accueil')

  const renderPage = () => {
    switch (route) {
      case 'matchmaking':
        return <Matchmaking onNavigate={setRoute} />
      case 'signin':
        return <SignIn onNavigate={setRoute} /> 
      case 'signup':
        return <SignUp onNavigate={setRoute} />
      case 'profile':
        return <Profile onNavigate={setRoute} />
      case 'dashboard':
        return <Dashboard onNavigate={setRoute} />
      case 'accueil':
      default:
        return <Accueil onNavigate={setRoute} />
    }
  }

  return (
    <div className="font-inter flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar
        currentPage={route}
        onNavigate={setRoute}
        hideNav={!['accueil', 'matchmaking', 'dashboard'].includes(route)}
      />
      <main className="w-full flex-1 p-0">
        {renderPage()}
      </main>
      {['accueil', 'matchmaking', 'dashboard'].includes(route) && (
        <Footer onNavigate={setRoute} />
      )}
    </div>
  )
}

export default App