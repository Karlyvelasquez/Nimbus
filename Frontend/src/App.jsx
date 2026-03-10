import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import CallToAction from './components/CallToAction'
import Audiences from './components/Audiences'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import DashboardMLExpert from './pages/DashboardMLExpert'
import DashboardMLExpertAnalytics from './pages/DashboardMLExpertAnalytics'
import DashboardMLExpertData from './pages/DashboardMLExpertData'
import DashboardMLExpertSettings from './pages/DashboardMLExpertSettings'

function LandingPage({ darkMode, toggleDarkMode, language, toggleLanguage }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Hide splash after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen bg-nimbus-light dark:bg-nimbus-dark transition-colors duration-300">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        language={language}
        toggleLanguage={toggleLanguage}
      />
      <main>
        <Hero language={language} darkMode={darkMode} />
        <Features language={language} />
        <CallToAction language={language} />
        <Audiences language={language} />
      </main>
      <Footer language={language} darkMode={darkMode} />
    </div>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    const savedLang = localStorage.getItem('language') || 'en'
    setDarkMode(isDark)
    setLanguage(savedLang)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en'
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <Routes>
      <Route path="/" element={
        <LandingPage
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      } />
      <Route path="/dashboard/ml-expert" element={
        <DashboardMLExpert 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      } />
      <Route path="/dashboard/ml-expert/analytics" element={
        <DashboardMLExpertAnalytics 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      } />
      <Route path="/dashboard/ml-expert/data" element={
        <DashboardMLExpertData 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      } />
      <Route path="/dashboard/ml-expert/settings" element={
        <DashboardMLExpertSettings 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      } />
    </Routes>
  )
}

export default App
