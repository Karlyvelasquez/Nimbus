import { MessageCircle, Send, Bell, Clock, Users, CheckCircle2 } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'

const DashboardCommunityTelegram = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const t = translations[language] || translations['en']

  const features = [
    {
      icon: Bell,
      title: language === 'es' ? 'Alertas Instantáneas' : 'Instant Alerts',
      description: language === 'es' 
        ? 'Recibe notificaciones inmediatas sobre condiciones climáticas adversas.'
        : 'Receive immediate notifications about adverse weather conditions.',
    },
    {
      icon: Clock,
      title: language === 'es' ? 'Predicciones Horarias' : 'Hourly Forecasts',
      description: language === 'es' 
        ? 'Consulta pronósticos para las próximas 1, 3 y 6 horas.'
        : 'Check forecasts for the next 1, 3, and 6 hours.',
    },
    {
      icon: Users,
      title: language === 'es' ? 'Fácil de Usar' : 'Easy to Use',
      description: language === 'es' 
        ? 'Comandos simples para obtener información rápidamente.'
        : 'Simple commands to get information quickly.',
    },
    {
      icon: CheckCircle2,
      title: language === 'es' ? 'Siempre Disponible' : 'Always Available',
      description: language === 'es' 
        ? 'Acceso 24/7 desde cualquier dispositivo con Telegram.'
        : '24/7 access from any device with Telegram.',
    },
  ]

  const commands = [
    {
      command: '/start',
      description: language === 'es' 
        ? 'Inicia el bot y obtén mensaje de bienvenida'
        : 'Start the bot and get welcome message',
    },
    {
      command: '/weather',
      description: language === 'es' 
        ? 'Consulta las condiciones climáticas actuales'
        : 'Check current weather conditions',
    },
    {
      command: '/forecast',
      description: language === 'es' 
        ? 'Obtén predicciones para las próximas horas'
        : 'Get predictions for the coming hours',
    },
    {
      command: '/alerts',
      description: language === 'es' 
        ? 'Ver todas las alertas activas'
        : 'View all active alerts',
    },
    {
      command: '/subscribe',
      description: language === 'es' 
        ? 'Suscríbete para recibir alertas automáticas'
        : 'Subscribe to receive automatic alerts',
    },
    {
      command: '/unsubscribe',
      description: language === 'es' 
        ? 'Cancela la suscripción de alertas'
        : 'Unsubscribe from alerts',
    },
    {
      command: '/help',
      description: language === 'es' 
        ? 'Lista de comandos disponibles'
        : 'List of available commands',
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
            {language === 'es' ? 'Bot de Telegram' : 'Telegram Bot'}
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            {language === 'es' 
              ? 'Recibe alertas climáticas directamente en tu teléfono'
              : 'Receive weather alerts directly on your phone'}
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">NIMBUS Bot</h3>
                <p className="text-white/90">@NIMBUSAGENT_bot</p>
              </div>
            </div>

            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              {language === 'es' 
                ? 'Únete a nuestra comunidad en Telegram y mantente siempre informado sobre el clima en San Cristóbal. Es gratis, rápido y fácil de usar.'
                : 'Join our Telegram community and stay always informed about the weather in San Cristóbal. It\'s free, fast, and easy to use.'}
            </p>

            <a
              href="https://t.me/NIMBUSAGENT_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white hover:bg-gray-100 text-cyan-600 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl transform hover:scale-105"
            >
              <Send className="w-6 h-6" />
              <span>{language === 'es' ? 'Unirse al Bot' : 'Join the Bot'}</span>
            </a>
          </div>
        </div>

        {/* Bot Features */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            {language === 'es' ? 'Características del Bot' : 'Bot Features'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20 flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commands List */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            {language === 'es' ? 'Comandos Disponibles' : 'Available Commands'}
          </h3>
          <div className="bg-white dark:bg-nimbus-blue/10 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20 overflow-hidden">
            <table className="w-full">
              <thead className="bg-nimbus-cream dark:bg-nimbus-dark/30">
                <tr>
                  <th className="text-left py-4 px-6 font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language === 'es' ? 'Comando' : 'Command'}
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language === 'es' ? 'Descripción' : 'Description'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {commands.map((cmd, index) => (
                  <tr
                    key={index}
                    className="border-t border-nimbus-cream dark:border-nimbus-blue/20 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded font-mono text-sm text-cyan-600 dark:text-cyan-400">
                        {cmd.command}
                      </code>
                    </td>
                    <td className="py-4 px-6 text-nimbus-dark/70 dark:text-nimbus-light/70">
                      {cmd.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-8 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6">
            {language === 'es' ? '¿Cómo Empezar?' : 'How to Get Started?'}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">1</span>
              </div>
              <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
                {language === 'es' ? 'Abre Telegram' : 'Open Telegram'}
              </h4>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' 
                  ? 'Busca @NIMBUSAGENT_bot o usa el botón de arriba'
                  : 'Search for @NIMBUSAGENT_bot or use the button above'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">2</span>
              </div>
              <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
                {language === 'es' ? 'Envía /start' : 'Send /start'}
              </h4>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' 
                  ? 'Inicia la conversación con el bot'
                  : 'Start the conversation with the bot'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">3</span>
              </div>
              <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
                {language === 'es' ? 'Suscríbete' : 'Subscribe'}
              </h4>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                {language === 'es' 
                  ? 'Usa /subscribe para recibir alertas automáticas'
                  : 'Use /subscribe to receive automatic alerts'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark p-8 rounded-xl text-white">
          <h3 className="text-xl font-bold mb-6">
            {language === 'es' ? 'Estadísticas del Bot' : 'Bot Statistics'}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">1,234</p>
              <p className="text-white/80">{language === 'es' ? 'Usuarios Activos' : 'Active Users'}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">5,678</p>
              <p className="text-white/80">{language === 'es' ? 'Alertas Enviadas' : 'Alerts Sent'}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-white/80">{language === 'es' ? 'Satisfacción' : 'Satisfaction'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardCommunityTelegram
