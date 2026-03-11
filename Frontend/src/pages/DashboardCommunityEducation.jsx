import { BookOpen, Video, FileText, Download, ExternalLink, Lightbulb } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'

const DashboardCommunityEducation = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const t = translations[language] || translations['en']

  const educationalResources = [
    {
      id: 1,
      category: language === 'es' ? 'Guías Básicas' : 'Basic Guides',
      title: language === 'es' ? 'Entendiendo las Predicciones del Clima' : 'Understanding Weather Predictions',
      description: language === 'es' 
        ? 'Aprende a interpretar pronósticos, probabilidades y tipos de precipitación.'
        : 'Learn to interpret forecasts, probabilities, and precipitation types.',
      type: 'PDF',
      icon: FileText,
      color: 'bg-nimbus-blue',
    },
    {
      id: 2,
      category: language === 'es' ? 'Videos Educativos' : 'Educational Videos',
      title: language === 'es' ? '¿Cómo Funciona NIMBUS?' : 'How Does NIMBUS Work?',
      description: language === 'es' 
        ? 'Video explicativo sobre el sistema de IA y las estaciones meteorológicas.'
        : 'Explanatory video about the AI system and weather stations.',
      type: 'Video',
      icon: Video,
      color: 'bg-nimbus-dark',
    },
    {
      id: 3,
      category: language === 'es' ? 'Preparación' : 'Preparedness',
      title: language === 'es' ? 'Plan Familiar de Emergencias' : 'Family Emergency Plan',
      description: language === 'es' 
        ? 'Crea tu plan familiar para estar preparado ante eventos climáticos.'
        : 'Create your family plan to be prepared for weather events.',
      type: 'PDF',
      icon: FileText,
      color: 'bg-nimbus-blue',
    },
    {
      id: 4,
      category: language === 'es' ? 'Seguridad' : 'Safety',
      title: language === 'es' ? 'Qué Hacer Durante Lluvias Intensas' : 'What to Do During Heavy Rain',
      description: language === 'es' 
        ? 'Medidas de seguridad y protocolos de actuación durante precipitaciones.'
        : 'Safety measures and action protocols during precipitation.',
      type: 'PDF',
      icon: FileText,
      color: 'bg-nimbus-dark',
    },
    {
      id: 5,
      category: language === 'es' ? 'Tecnología' : 'Technology',
      title: language === 'es' ? 'Inteligencia Artificial en Meteorología' : 'AI in Meteorology',
      description: language === 'es' 
        ? 'Descubre cómo la IA mejora las predicciones climáticas.'
        : 'Discover how AI improves weather predictions.',
      type: 'Video',
      icon: Video,
      color: 'bg-nimbus-blue',
    },
    {
      id: 6,
      category: language === 'es' ? 'Guías Básicas' : 'Basic Guides',
      title: language === 'es' ? 'Tipos de Alertas y Niveles de Severidad' : 'Alert Types and Severity Levels',
      description: language === 'es' 
        ? 'Comprende los diferentes tipos de alertas y cómo responder.'
        : 'Understand different alert types and how to respond.',
      type: 'PDF',
      icon: FileText,
      color: 'bg-nimbus-dark',
    },
  ]

  const faq = [
    {
      question: language === 'es' ? '¿Qué tan precisas son las predicciones?' : 'How accurate are the predictions?',
      answer: language === 'es' 
        ? 'NIMBUS utiliza 11 años de datos históricos y algoritmos de IA avanzados, logrando una precisión del 92% en predicciones de +1 hora y 85% en +6 horas.'
        : 'NIMBUS uses 11 years of historical data and advanced AI algorithms, achieving 92% accuracy in +1 hour predictions and 85% in +6 hours.',
    },
    {
      question: language === 'es' ? '¿Cómo recibo las alertas?' : 'How do I receive alerts?',
      answer: language === 'es' 
        ? 'Puedes recibir alertas a través de nuestro bot de Telegram, el dashboard web, o mediante notificaciones push en la app móvil.'
        : 'You can receive alerts through our Telegram bot, web dashboard, or push notifications on the mobile app.',
    },
    {
      question: language === 'es' ? '¿Las estaciones cubren toda la isla?' : 'Do the stations cover the entire island?',
      answer: language === 'es' 
        ? 'Contamos con 4 estaciones estratégicamente ubicadas en diferentes elevaciones (costa, nivel medio, nivel alto y cumbre) para monitorear toda San Cristóbal.'
        : 'We have 4 stations strategically located at different elevations (coast, mid-level, high-level, and summit) to monitor all of San Cristóbal.',
    },
    {
      question: language === 'es' ? '¿El servicio tiene algún costo?' : 'Is there any cost for the service?',
      answer: language === 'es' 
        ? 'No, NIMBUS es un servicio completamente gratuito para la comunidad de San Cristóbal, desarrollado en colaboración con el Galápagos Science Center.'
        : 'No, NIMBUS is a completely free service for the San Cristóbal community, developed in collaboration with the Galápagos Science Center.',
    },
  ]

  return (
    <DashboardLayout 
      userRole="Community"
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      language={language}
      toggleLanguage={toggleLanguage}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-1">
            {language === 'es' ? 'Centro Educativo' : 'Education Center'}
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            {language === 'es' 
              ? 'Aprende sobre meteorología y cómo usar NIMBUS'
              : 'Learn about meteorology and how to use NIMBUS'}
          </p>
        </div>

        {/* Educational Resources Grid */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            {language === 'es' ? 'Recursos Educativos' : 'Educational Resources'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className={`w-12 h-12 ${resource.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-nimbus-dark/60 dark:text-nimbus-light/60 uppercase">
                  {resource.category}
                </span>
                <h4 className="text-lg font-bold text-nimbus-dark dark:text-nimbus-light mt-2 mb-2">
                  {resource.title}
                </h4>
                <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                  <span className="text-xs font-semibold text-nimbus-dark/60 dark:text-nimbus-light/60">
                    {resource.type}
                  </span>
                  <button className="flex items-center space-x-1 text-nimbus-blue hover:text-nimbus-dark dark:hover:text-nimbus-light transition-colors">
                    <span className="text-sm font-semibold">
                      {language === 'es' ? 'Ver' : 'View'}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h3>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20"
              >
                <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-2 flex items-start space-x-2">
                  <span className="text-nimbus-blue flex-shrink-0">Q:</span>
                  <span>{item.question}</span>
                </h4>
                <p className="text-nimbus-dark/70 dark:text-nimbus-light/70 pl-6">
                  <span className="text-nimbus-blue font-semibold">A:</span> {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark p-8 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Lightbulb className="w-6 h-6" />
            <span>{language === 'es' ? 'Consejos Rápidos' : 'Quick Tips'}</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-bold mb-2">
                {language === 'es' ? '1. Revisa las alertas diariamente' : '1. Check alerts daily'}
              </h4>
              <p className="text-sm text-white/90">
                {language === 'es' 
                  ? 'Especialmente antes de planificar actividades al aire libre.'
                  : 'Especially before planning outdoor activities.'}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-bold mb-2">
                {language === 'es' ? '2. Activa las notificaciones' : '2. Enable notifications'}
              </h4>
              <p className="text-sm text-white/90">
                {language === 'es' 
                  ? 'Únete al bot de Telegram para recibir alertas instantáneas.'
                  : 'Join the Telegram bot to receive instant alerts.'}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-bold mb-2">
                {language === 'es' ? '3. Comparte la información' : '3. Share the information'}
              </h4>
              <p className="text-sm text-white/90">
                {language === 'es' 
                  ? 'Ayuda a tus vecinos compartiendo alertas importantes.'
                  : 'Help your neighbors by sharing important alerts.'}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-bold mb-2">
                {language === 'es' ? '4. Ten un plan de emergencia' : '4. Have an emergency plan'}
              </h4>
              <p className="text-sm text-white/90">
                {language === 'es' 
                  ? 'Prepara tu kit de emergencia y plan familiar.'
                  : 'Prepare your emergency kit and family plan.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardCommunityEducation
