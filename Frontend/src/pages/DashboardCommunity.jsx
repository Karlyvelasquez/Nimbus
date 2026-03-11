import { useState } from 'react'
import { Home, Bell, BookOpen, MessageCircle, Phone, Cloud, CheckCircle, CloudRain, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'

const DashboardCommunity = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const t = translations[language] || translations['en']

  return (
    <DashboardLayout 
      userRole="Community"
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      language={language}
      toggleLanguage={toggleLanguage}
    >
      <div className="space-y-8">
        {/* Welcome Section with Background Image */}
        <div className="relative h-96 rounded-xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/Comunidad.jpg"
              alt="Galápagos Community"
              className="w-full h-full object-cover object-center"
              style={{ imageRendering: 'crisp-edges' }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-nimbus-dark/85 via-nimbus-dark/65 to-nimbus-dark/30 dark:from-nimbus-dark/95 dark:via-nimbus-dark/75 dark:to-nimbus-dark/40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-12">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-4">
                {language === 'es' ? '¡Bienvenido a NIMBUS!' : 'Welcome to NIMBUS!'}
              </h1>
              <p className="text-2xl text-white/90 mb-6 font-medium">
                {language === 'es' 
                  ? 'Sistema de Alertas Tempranas para San Cristóbal'
                  : 'Early Warning System for San Cristóbal'}
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                {language === 'es'
                  ? 'Mantente informado sobre las condiciones climáticas en tiempo real. Recibe alertas oportunas para proteger a tu familia y comunidad.'
                  : 'Stay informed about real-time weather conditions. Receive timely alerts to protect your family and community.'}
              </p>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">
                    {language === 'es' ? 'Sistema Activo' : 'System Active'}
                  </span>
                </div>
                <div className="text-white/80">
                  {language === 'es' ? 'Última actualización: Hace 2 min' : 'Last update: 2 min ago'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Weather Status */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
                {language === 'es' ? 'Condiciones Actuales' : 'Current Conditions'}
              </h3>
              <div className="w-12 h-12 bg-nimbus-blue/20 dark:bg-nimbus-blue/30 rounded-full flex items-center justify-center">
                <Cloud className="w-6 h-6 text-nimbus-blue" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-nimbus-dark dark:text-nimbus-light">24°C</p>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' ? 'Parcialmente nublado' : 'Partly Cloudy'}
              </p>
              <div className="pt-2 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Humedad: 78%' : 'Humidity: 78%'}
                </p>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Viento: 12 km/h' : 'Wind: 12 km/h'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
                {language === 'es' ? 'Próxima Hora' : 'Next Hour'}
              </h3>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {language === 'es' ? 'Sin Riesgo' : 'No Risk'}
              </p>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' ? 'No se esperan lluvias' : 'No rain expected'}
              </p>
              <div className="pt-2 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Probabilidad: 15%' : 'Probability: 15%'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
                {language === 'es' ? 'Próximas 6 Horas' : 'Next 6 Hours'}
              </h3>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <CloudRain className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {language === 'es' ? 'Lluvia Leve' : 'Light Rain'}
              </p>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' ? 'Posible precipitación' : 'Possible precipitation'}
              </p>
              <div className="pt-2 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Probabilidad: 65%' : 'Probability: 65%'}
                </p>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Cantidad: 2-5mm' : 'Amount: 2-5mm'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            {language === 'es' ? 'Acceso Rápido' : 'Quick Access'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/dashboard/community/alerts"
              className="group bg-nimbus-dark hover:bg-nimbus-dark/90 p-6 rounded-xl text-white hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <Bell className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">
                {language === 'es' ? 'Alertas' : 'Alerts'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'es' ? 'Ver alertas activas' : 'View active alerts'}
              </p>
            </Link>

            <Link
              to="/dashboard/community/education"
              className="group bg-nimbus-blue hover:bg-nimbus-blue/90 p-6 rounded-xl text-white hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <BookOpen className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">
                {language === 'es' ? 'Educación' : 'Education'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'es' ? 'Aprende sobre clima' : 'Learn about weather'}
              </p>
            </Link>

            <Link
              to="/dashboard/community/telegram"
              className="group bg-nimbus-dark hover:bg-nimbus-dark/90 p-6 rounded-xl text-white hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <MessageCircle className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">
                {language === 'es' ? 'Telegram' : 'Telegram'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'es' ? 'Únete al bot' : 'Join the bot'}
              </p>
            </Link>

            <Link
              to="/dashboard/community/emergency"
              className="group bg-nimbus-blue hover:bg-nimbus-blue/90 p-6 rounded-xl text-white hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <Phone className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">
                {language === 'es' ? 'Emergencias' : 'Emergency'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'es' ? 'Contactos importantes' : 'Important contacts'}
              </p>
            </Link>
          </div>
        </div>

        {/* Information Banner */}
        <div className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark p-8 rounded-xl text-white">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'es' ? '¿Sabías que...?' : 'Did you know...?'}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {language === 'es'
                  ? 'NIMBUS utiliza 11 años de datos meteorológicos del Galápagos Science Center y tecnología de Inteligencia Artificial para predecir precipitaciones con hasta 6 horas de anticipación. Esto te permite prepararte mejor ante condiciones climáticas adversas.'
                  : 'NIMBUS uses 11 years of meteorological data from the Galápagos Science Center and Artificial Intelligence technology to predict precipitation up to 6 hours in advance. This allows you to better prepare for adverse weather conditions.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardCommunity
