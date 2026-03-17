import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Matchmaking from './pages/Matchmaking'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

function App() {
  const [route, setRoute] = useState('matchmaking')

  const renderPage = () => {
    switch (route) {
      case 'matchmaking':
        return <Matchmaking />
      case 'signin':
        return <SignIn />
      case 'signup':
        return <SignUp />
      case 'profile':
        return <Profile />
      case 'dashboard':
        return <Dashboard />
      case 'accueil':
      default:
        return <Accueil />
    }
  }

  return (
    <div className="app-root">
      <Navbar onNavigate={setRoute} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App
