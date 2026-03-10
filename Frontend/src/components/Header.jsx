import { useState, useEffect } from 'react'
import { Sun, Moon, Globe, LogIn } from 'lucide-react'
import { translations } from '../translations'

const Header = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [scrolled, setScrolled] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-nimbus-dark/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3">
            <img
              src={darkMode ? '/logo-blanco-oscuro.png' : '/logo-azul-claro.png'}
              alt="Nimbus Logo"
              className="h-10 w-auto"
            />
          </a>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5 text-nimbus-dark dark:text-nimbus-light" />
              <span className="text-sm font-bold text-nimbus-dark dark:text-nimbus-light">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-nimbus-light" />
              ) : (
                <Moon className="w-5 h-5 text-nimbus-dark" />
              )}
            </button>

            {/* Sign In Button */}
            <button className="flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-4 py-2 rounded-lg font-bold transition-all duration-300">
              <LogIn className="w-4 h-4" />
              <span>{t.login}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
