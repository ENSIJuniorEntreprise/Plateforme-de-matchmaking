import React from 'react'
import HeroPage from '../HeroPage'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

const Accueil = ({ onNavigate, user }) => {
  return (
    <>
      <HeroPage onNavigate={onNavigate} user={user} />
      <HowItWorks />
      <Testimonials />
      <CallToAction onNavigate={onNavigate} />
    </>
  )
}

export default Accueil