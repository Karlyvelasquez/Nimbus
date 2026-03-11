import { useState } from 'react'
import { 
  LayoutDashboard, 
  BarChart3, 
  Database, 
  Settings, 
  LogOut, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Radio,
  MapPin,
  FileText,
  Bell,
  BookOpen,
  MessageCircle
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { translations } from '../translations'

const DashboardLayout = ({ children, userRole = "ML Expert", darkMode, toggleDarkMode, language = 'en', toggleLanguage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const location = useLocation()
  const t = translations[language] || translations['en']

  // Menu items based on user role
  const getMenuItems = () => {
    switch(userRole) {
      case "Meteorologist":
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/meteorologist' },
          { icon: Radio, label: 'Live Data', path: '/dashboard/meteorologist/live-data' },
          { icon: MapPin, label: 'Stations', path: '/dashboard/meteorologist/stations' },
          { icon: FileText, label: 'Reports', path: '/dashboard/meteorologist/reports' },
        ]
      case "Community":
        return [
          { icon: LayoutDashboard, label: language === 'es' ? 'Inicio' : 'Home', path: '/dashboard/community' },
          { icon: Bell, label: language === 'es' ? 'Alertas' : 'Alerts', path: '/dashboard/community/alerts' },
          { icon: BookOpen, label: language === 'es' ? 'Educación' : 'Education', path: '/dashboard/community/education' },
          { icon: MessageCircle, label: 'Telegram', path: '/dashboard/community/telegram' },
        ]
      case "ML Expert":
      default:
        return [
          { icon: LayoutDashboard, label: t.overview, path: '/dashboard/ml-expert' },
          { icon: BarChart3, label: t.analytics, path: '/dashboard/ml-expert/analytics' },
          { icon: Database, label: t.dataManagement, path: '/dashboard/ml-expert/data' },
          { icon: Settings, label: t.settings, path: '/dashboard/ml-expert/settings' },
        ]
    }
  }

  const menuItems = getMenuItems()

  return (
    <div className="h-screen bg-nimbus-light dark:bg-nimbus-dark flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } h-screen bg-white dark:bg-nimbus-blue/10 border-r border-nimbus-cream dark:border-nimbus-blue/20 transition-all duration-300 flex flex-col flex-shrink-0`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-nimbus-cream dark:border-nimbus-blue/20 flex items-center justify-between flex-shrink-0">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <img
                src="/logo-azul-claro.png"
                alt="Nimbus"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src="/logo-blanco-oscuro.png"
                alt="Nimbus"
                className="h-8 w-auto hidden dark:block"
              />
              <span className="font-bold text-nimbus-dark dark:text-nimbus-light text-lg">
                Nimbus
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-nimbus-dark dark:text-nimbus-light" />
            ) : (
              <Menu className="w-5 h-5 text-nimbus-dark dark:text-nimbus-light" />
            )}
          </button>
        </div>

        {/* Role Badge */}
        {sidebarOpen && (
          <div className="px-6 py-4 flex-shrink-0">
            <div className="bg-nimbus-dark dark:bg-nimbus-blue text-white px-3 py-2 rounded-lg text-sm font-semibold text-center">
              {userRole}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-nimbus-blue text-white'
                    : 'text-nimbus-dark dark:text-nimbus-light hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button and Footer */}
        <div className="p-3 border-t border-nimbus-cream dark:border-nimbus-blue/20 space-y-2 flex-shrink-0">
          <button
            onClick={() => {
              window.close()
              window.location.href = '/'
            }}
            className="flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full"
            title={!sidebarOpen ? t.logOut : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="font-medium">{t.logOut}</span>
            )}
          </button>
          {sidebarOpen && (
            <p className="text-xs text-nimbus-dark/50 dark:text-nimbus-light/50 text-center pt-2">
              © 2026 Nimbus
            </p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-nimbus-blue/10 border-b border-nimbus-cream dark:border-nimbus-blue/20 px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light">
                {t.dashboardTitle}
              </h1>
              <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
                {t.dashboardWelcome}
              </p>
            </div>

            {/* Controls and Profile Section */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              {toggleLanguage && (
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors"
                  aria-label="Toggle language"
                >
                  <Globe className="w-5 h-5 text-nimbus-dark dark:text-nimbus-light" />
                  <span className="text-sm font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language ? language.toUpperCase() : 'EN'}
                  </span>
                </button>
              )}

              {/* Dark Mode Toggle */}
              {toggleDarkMode && (
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
              )}

              {/* Profile Section */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors"
                >
                <div className="w-10 h-10 bg-nimbus-dark dark:bg-nimbus-blue rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-nimbus-dark dark:text-nimbus-light text-sm">
                    Demo User
                  </p>
                  <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                    {userRole}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-nimbus-dark dark:text-nimbus-light" />
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-nimbus-blue/10 border border-nimbus-cream dark:border-nimbus-blue/20 rounded-lg shadow-xl py-2 z-50">
                  <Link
                    to="/dashboard/ml-expert/profile"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors"
                  >
                    <User className="w-4 h-4 text-nimbus-dark dark:text-nimbus-light" />
                    <span className="text-sm text-nimbus-dark dark:text-nimbus-light">
                      {t.myProfile}
                    </span>
                  </Link>
                  <Link
                    to="/dashboard/ml-expert/settings"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-nimbus-dark dark:text-nimbus-light" />
                    <span className="text-sm text-nimbus-dark dark:text-nimbus-light">
                      {t.settings}
                    </span>
                  </Link>
                  <hr className="my-2 border-nimbus-cream dark:border-nimbus-blue/20" />
                  <button
                    onClick={() => {
                      window.close()
                      window.location.href = '/'
                    }}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm text-red-600 dark:text-red-400">
                      {t.logOut}
                    </span>
                  </button>
                </div>
              )}              </div>            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
