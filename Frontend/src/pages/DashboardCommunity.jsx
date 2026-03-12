import { useState } from 'react'
import { Home, Bell, BookOpen, MessageCircle, Phone, Cloud, CheckCircle, CloudRain, Lightbulb, Sprout, Droplets, Wind, AlertTriangle, ThumbsUp, MapPin, Mountain, Anchor, Trees, Flag, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'

const DashboardCommunity = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const t = translations[language] || translations['en']
  const [selectedStation, setSelectedStation] = useState('junco')

  // Datos reales del modelo TNN para El Junco y simulados para otras estaciones
  const stationData = {
    junco: {
      name: 'El Junco',
      elevation: '650m',
      temp: 18.2,
      humidity: 85,
      wind: 14,
      // Predicciones TNN reales (Accuracy: 74.4% 1h, 61.7% 3h, 63.8% 6h)
      prediction_1h: { class: 0, confidence: 0.744, description: language === 'es' ? 'Sin lluvia' : 'No rain' },
      prediction_3h: { class: 1, confidence: 0.617, description: language === 'es' ? 'Lluvia leve' : 'Light rain' },
      prediction_6h: { class: 1, confidence: 0.638, description: language === 'es' ? 'Lluvia leve' : 'Light rain' },
      agriculture: {
        irrigation: language === 'es' ? 'Regar ahora es seguro' : 'Safe to irrigate now',
        action: language === 'es' ? 'Momento ideal para riego' : 'Ideal time for irrigation',
        warning: language === 'es' ? 'Prepara drenajes - lluvia leve en 3-6h' : 'Prepare drainage - light rain in 3-6h',
        recommendation: language === 'es' 
          ? 'Aprovecha la mañana para actividades de riego. Lluvia leve esperada después del mediodía.'
          : 'Take advantage of the morning for irrigation activities. Light rain expected after noon.'
      }
    },
    cerroAlto: {
      name: 'Cerro Alto',
      elevation: '10m',
      temp: 24.5,
      humidity: 78,
      wind: 12,
      prediction_1h: { class: 0, confidence: 0.772, description: language === 'es' ? 'Sin lluvia' : 'No rain' },
      prediction_3h: { class: 0, confidence: 0.648, description: language === 'es' ? 'Sin lluvia' : 'No rain' },
      prediction_6h: { class: 1, confidence: 0.661, description: language === 'es' ? 'Lluvia leve' : 'Light rain' },
      agriculture: {
        irrigation: language === 'es' ? 'Excelente para regar' : 'Excellent for irrigation',
        action: language === 'es' ? 'Condiciones óptimas' : 'Optimal conditions',
        warning: language === 'es' ? 'Lluvia leve posible en 6h' : 'Light rain possible in 6h',
        recommendation: language === 'es'
          ? 'Zona costera estable. Ideal para todas las actividades agrícolas durante las próximas horas.'
          : 'Stable coastal area. Ideal for all agricultural activities during the next hours.'
      }
    },
    merceditas: {
      name: 'Merceditas',
      elevation: '250m',
      temp: 21.3,
      humidity: 82,
      wind: 15,
      prediction_1h: { class: 0, confidence: 0.731, description: language === 'es' ? 'Sin lluvia' : 'No rain' },
      prediction_3h: { class: 1, confidence: 0.605, description: language === 'es' ? 'Lluvia leve' : 'Light rain' },
      prediction_6h: { class: 2, confidence: 0.625, description: language === 'es' ? 'Lluvia fuerte' : 'Heavy rain' },
      agriculture: {
        irrigation: language === 'es' ? 'Regar solo en la mañana' : 'Irrigate in morning only',
        action: language === 'es' ? 'Ventana corta de riego' : 'Short irrigation window',
        warning: language === 'es' ? '¡Lluvia fuerte esperada en 6h!' : 'Heavy rain expected in 6h!',
        recommendation: language === 'es'
          ? 'PRECAUCIÓN: Lluvia intensa en la tarde. Completa el riego antes del mediodía y asegura cultivos sensibles.'
          : 'CAUTION: Intense rain in the afternoon. Complete irrigation before noon and secure sensitive crops.'
      }
    },
    mirador: {
      name: 'El Mirador',
      elevation: '850m',
      temp: 14.2,
      humidity: 95,
      wind: 24,
      prediction_1h: { class: 1, confidence: 0.718, description: language === 'es' ? 'Lluvia leve' : 'Light rain' },
      prediction_3h: { class: 2, confidence: 0.592, description: language === 'es' ? 'Lluvia fuerte' : 'Heavy rain' },
      prediction_6h: { class: 2, confidence: 0.612, description: language === 'es' ? 'Lluvia fuerte' : 'Heavy rain' },
      agriculture: {
        irrigation: language === 'es' ? 'NO regar hoy' : 'DO NOT irrigate today',
        action: language === 'es' ? 'Suspender actividades' : 'Suspend activities',
        warning: language === 'es' ? '¡ALERTA: Lluvia intensa prolongada!' : 'ALERT: Prolonged heavy rain!',
        recommendation: language === 'es'
          ? 'ALERTA CUMBRE: Lluvia intensa durante todo el período. Suspende riego y protege cultivos de exceso de agua.'
          : 'SUMMIT ALERT: Heavy rain throughout the period. Suspend irrigation and protect crops from excess water.'
      }
    }
  }

  const currentStation = stationData[selectedStation]

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

        {/* Station Selector */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-nimbus-blue dark:text-nimbus-cream" />
            <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
              {language === 'es' ? 'Selecciona tu zona' : 'Select your area'}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'junco', name: 'El Junco', elevation: '650m', Icon: Mountain },
              { id: 'cerroAlto', name: 'Cerro Alto', elevation: '10m', Icon: Anchor },
              { id: 'merceditas', name: 'Merceditas', elevation: '250m', Icon: Trees },
              { id: 'mirador', name: 'El Mirador', elevation: '850m', Icon: Flag }
            ].map((station) => (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStation === station.id
                    ? 'border-nimbus-blue bg-nimbus-blue/10 dark:border-nimbus-cream dark:bg-nimbus-cream/10'
                    : 'border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
                }`}
              >
                <station.Icon className="w-8 h-8 mx-auto mb-2 text-nimbus-blue dark:text-nimbus-cream" />
                <div className="font-bold text-nimbus-dark dark:text-nimbus-light text-sm">{station.name}</div>
                <div className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">{station.elevation}</div>
              </button>
            ))}
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
              <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60 mb-1">{currentStation.name}</p>
              <p className="text-3xl font-bold text-nimbus-dark dark:text-nimbus-light">{currentStation.temp}°C</p>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' ? 'Parcialmente nublado' : 'Partly Cloudy'}
              </p>
              <div className="pt-2 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Humedad' : 'Humidity'}: {currentStation.humidity}%
                </p>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Viento' : 'Wind'}: {currentStation.wind} km/h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
                {language === 'es' ? 'Próxima Hora' : 'Next Hour'}
              </h3>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStation.prediction_1h.class === 0 ? 'bg-green-100 dark:bg-green-900/30' :
                currentStation.prediction_1h.class === 1 ? 'bg-nimbus-blue/20 dark:bg-nimbus-blue/30' :
                'bg-nimbus-dark/20 dark:bg-nimbus-dark/30'
              }`}>
                {currentStation.prediction_1h.class === 0 ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <CloudRain className={`w-6 h-6 ${
                    currentStation.prediction_1h.class === 1 ? 'text-nimbus-blue' : 'text-nimbus-dark dark:text-nimbus-cream'
                  }`} />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className={`text-2xl font-bold ${
                currentStation.prediction_1h.class === 0 ? 'text-green-600 dark:text-green-400' :
                currentStation.prediction_1h.class === 1 ? 'text-nimbus-blue dark:text-nimbus-cream' :
                'text-nimbus-dark dark:text-nimbus-cream'
              }`}>
                {currentStation.prediction_1h.description}
              </p>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' ? 'Predicción TNN' : 'TNN Prediction'}
              </p>
              <div className="pt-2 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Confianza' : 'Confidence'}: {(currentStation.prediction_1h.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
                {language === 'es' ? 'Próximas 6 Horas' : 'Next 6 Hours'}
              </h3>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStation.prediction_6h.class === 0 ? 'bg-green-100 dark:bg-green-900/30' :
                currentStation.prediction_6h.class === 1 ? 'bg-nimbus-blue/20 dark:bg-nimbus-blue/30' :
                'bg-nimbus-dark/20 dark:bg-nimbus-dark/30'
              }`}>
                <CloudRain className={`w-6 h-6 ${
                  currentStation.prediction_6h.class === 0 ? 'text-green-600 dark:text-green-400' :
                  currentStation.prediction_6h.class === 1 ? 'text-nimbus-blue' :
                  'text-nimbus-dark dark:text-nimbus-cream'
                }`} />
              </div>
            </div>
            <div className="space-y-2">
              <p className={`text-2xl font-bold ${
                currentStation.prediction_6h.class === 0 ? 'text-green-600 dark:text-green-400' :
                currentStation.prediction_6h.class === 1 ? 'text-nimbus-blue dark:text-nimbus-cream' :
                'text-nimbus-dark dark:text-nimbus-cream'
              }`}>
                {currentStation.prediction_6h.description}
              </p>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' ? 'Predicción TNN' : 'TNN Prediction'}
              </p>
              <div className="pt-2 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Confianza' : 'Confidence'}: {(currentStation.prediction_6h.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Section - Soy Agricultor */}
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 p-8 rounded-xl border-2 border-green-200 dark:border-green-800/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-green-600 dark:bg-green-700 rounded-full flex items-center justify-center">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
                {language === 'es' ? 'Soy Agricultor' : 'I\'m a Farmer'}
              </h2>
              <p className="text-green-700 dark:text-green-400 text-sm">
                {language === 'es' ? 'Recomendaciones basadas en IA para tu zona' : 'AI-based recommendations for your area'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Irrigation Decision Card */}
            <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center space-x-3 mb-4">
                <Droplets className={`w-8 h-8 ${
                  currentStation.agriculture.irrigation.includes('NO') || currentStation.agriculture.irrigation.includes('NOT')
                    ? 'text-nimbus-dark dark:text-nimbus-cream'
                    : currentStation.agriculture.irrigation.includes('solo') || currentStation.agriculture.irrigation.includes('only')
                    ? 'text-nimbus-blue'
                    : 'text-green-600 dark:text-green-400'
                }`} />
                <h3 className="font-bold text-lg text-nimbus-dark dark:text-nimbus-light">
                  {language === 'es' ? 'Decisión de Riego' : 'Irrigation Decision'}
                </h3>
              </div>
              <div className={`text-3xl font-bold mb-3 ${
                currentStation.agriculture.irrigation.includes('NO') || currentStation.agriculture.irrigation.includes('NOT')
                  ? 'text-nimbus-dark dark:text-nimbus-cream'
                  : currentStation.agriculture.irrigation.includes('solo') || currentStation.agriculture.irrigation.includes('only')
                  ? 'text-nimbus-blue dark:text-nimbus-cream'
                  : 'text-green-600 dark:text-green-400'
              }`}>
                {currentStation.agriculture.irrigation}
              </div>
              <p className="text-nimbus-dark/80 dark:text-nimbus-light/80 text-sm mb-3">
                {currentStation.agriculture.action}
              </p>
              <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentStation.prediction_6h.class === 2
                  ? 'bg-nimbus-dark/10 dark:bg-nimbus-dark/30 text-nimbus-dark dark:text-nimbus-cream'
                  : currentStation.prediction_6h.class === 1
                  ? 'bg-nimbus-blue/10 dark:bg-nimbus-blue/30 text-nimbus-blue dark:text-nimbus-cream'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              }`}>
                {currentStation.agriculture.warning}
              </div>
            </div>

            {/* Detailed Recommendation Card */}
            <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="font-bold text-lg text-nimbus-dark dark:text-nimbus-light">
                  {language === 'es' ? 'Recomendación Detallada' : 'Detailed Recommendation'}
                </h3>
              </div>
              <p className="text-nimbus-dark dark:text-nimbus-light leading-relaxed mb-4">
                {currentStation.agriculture.recommendation}
              </p>
              <div className="flex items-center space-x-2 text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
                <Wind className="w-4 h-4" />
                <span>
                  {language === 'es' ? 'Basado en modelo TNN' : 'Based on TNN model'} • {currentStation.name}
                </span>
              </div>
            </div>
          </div>

          {/* Agricultural Tips Banner */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 p-6 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                {currentStation.prediction_6h.class === 0 ? (
                  <ThumbsUp className="w-6 h-6 text-white" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="text-white">
                <h4 className="font-bold text-lg mb-2">
                  {language === 'es' ? 'Consejo del Día' : 'Tip of the Day'}
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  {currentStation.prediction_6h.class === 2 ? (
                    language === 'es'
                      ? 'Lluvia intensa puede causar erosión del suelo. Asegura que tus canales de drenaje estén despejados y considera cubrir cultivos sensibles con plástico agrícola.'
                      : 'Heavy rain can cause soil erosion. Ensure your drainage channels are clear and consider covering sensitive crops with agricultural plastic.'
                  ) : currentStation.prediction_6h.class === 1 ? (
                    language === 'es'
                      ? 'La lluvia leve es beneficiosa para la mayoría de cultivos, pero ajusta tu programación de riego para evitar exceso de humedad en el suelo.'
                      : 'Light rain is beneficial for most crops, but adjust your irrigation schedule to avoid excess soil moisture.'
                  ) : (
                    language === 'es'
                      ? 'Condiciones secas: momento ideal para aplicar fertilizantes foliares, podar y realizar mantenimiento de sistemas de riego.'
                      : 'Dry conditions: ideal time to apply foliar fertilizers, prune, and perform irrigation system maintenance.'
                  )}
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
