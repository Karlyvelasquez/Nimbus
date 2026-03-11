import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'

const DashboardCommunityAlerts = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const t = translations[language] || translations['en']

  const activeAlerts = [
    {
      id: 1,
      type: language === 'es' ? 'Lluvia Moderada' : 'Moderate Rain',
      severity: 'medium',
      location: language === 'es' ? 'Zona Alta' : 'Highland Area',
      time: '3h',
      description: language === 'es' 
        ? 'Se espera lluvia moderada en las próximas 3 horas en zonas altas. Tome precauciones si planea actividades al aire libre.'
        : 'Moderate rain expected in the next 3 hours in highland areas. Take precautions if planning outdoor activities.',
      recommendations: [
        language === 'es' ? 'Lleve paraguas o impermeable' : 'Carry umbrella or raincoat',
        language === 'es' ? 'Evite zonas propensas a inundaciones' : 'Avoid flood-prone areas',
        language === 'es' ? 'Conduzca con precaución' : 'Drive carefully',
      ],
      issuedAt: '10:30 AM',
    },
  ]

  const recentAlerts = [
    {
      id: 2,
      type: language === 'es' ? 'Viento Fuerte' : 'Strong Wind',
      severity: 'low',
      location: language === 'es' ? 'Costa' : 'Coastal Area',
      time: language === 'es' ? 'Hace 4h' : '4h ago',
      status: 'resolved',
    },
    {
      id: 3,
      type: language === 'es' ? 'Lluvia Intensa' : 'Heavy Rain',
      severity: 'high',
      location: language === 'es' ? 'Cumbre' : 'Summit',
      time: language === 'es' ? 'Hace 8h' : '8h ago',
      status: 'resolved',
    },
    {
      id: 4,
      type: language === 'es' ? 'Baja Visibilidad' : 'Low Visibility',
      severity: 'medium',
      location: language === 'es' ? 'Zona Media' : 'Mid Zone',
      time: language === 'es' ? 'Hace 12h' : '12h ago',
      status: 'resolved',
    },
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
      case 'low':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      case 'medium':
        return <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      case 'low':
        return <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      default:
        return <Bell className="w-6 h-6" />
    }
  }

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
            {language === 'es' ? 'Alertas Activas' : 'Active Alerts'}
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            {language === 'es' 
              ? 'Mantente informado sobre las condiciones climáticas actuales'
              : 'Stay informed about current weather conditions'}
          </p>
        </div>

        {/* Alert Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-nimbus-blue/10 p-4 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light">0</p>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Alta' : 'High'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-nimbus-blue/10 p-4 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light">1</p>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Media' : 'Medium'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-nimbus-blue/10 p-4 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light">0</p>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Baja' : 'Low'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-nimbus-blue/10 p-4 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light">3</p>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                  {language === 'es' ? 'Resueltas Hoy' : 'Resolved Today'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
              {language === 'es' ? 'Alertas Activas Ahora' : 'Active Alerts Now'}
            </h3>
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 p-6 rounded-lg ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <h4 className="text-xl font-bold mb-1">{alert.type}</h4>
                      <p className="text-sm opacity-80">
                        {alert.location} • {language === 'es' ? 'Próximas' : 'Next'} {alert.time} • {language === 'es' ? 'Emitida a las' : 'Issued at'} {alert.issuedAt}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white/50 dark:bg-black/20 rounded-full text-xs font-bold uppercase">
                    {language === 'es' ? 'Activa' : 'Active'}
                  </span>
                </div>
                
                <p className="mb-4 leading-relaxed">
                  {alert.description}
                </p>

                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
                  <h5 className="font-bold mb-2 flex items-center space-x-2">
                    <span>💡</span>
                    <span>{language === 'es' ? 'Recomendaciones:' : 'Recommendations:'}</span>
                  </h5>
                  <ul className="space-y-1">
                    {alert.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm flex items-start space-x-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-8 rounded-xl text-center">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
              {language === 'es' ? '¡Todo despejado!' : 'All Clear!'}
            </h3>
            <p className="text-green-700 dark:text-green-400">
              {language === 'es' 
                ? 'No hay alertas activas en este momento. Disfruta del buen clima.'
                : 'No active alerts at this time. Enjoy the good weather!'}
            </p>
          </div>
        )}

        {/* Recent Alerts */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            {language === 'es' ? 'Alertas Recientes' : 'Recent Alerts'}
          </h3>
          <div className="bg-white dark:bg-nimbus-blue/10 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20 overflow-hidden">
            <table className="w-full">
              <thead className="bg-nimbus-cream dark:bg-nimbus-dark/30">
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language === 'es' ? 'Tipo' : 'Type'}
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language === 'es' ? 'Ubicación' : 'Location'}
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language === 'es' ? 'Severidad' : 'Severity'}
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language === 'es' ? 'Tiempo' : 'Time'}
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">
                    {language === 'es' ? 'Estado' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentAlerts.map((alert) => (
                  <tr key={alert.id} className="border-t border-nimbus-cream dark:border-nimbus-blue/20 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/5 transition-colors">
                    <td className="py-3 px-4 font-semibold text-nimbus-dark dark:text-nimbus-light">
                      {alert.type}
                    </td>
                    <td className="py-3 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">
                      {alert.location}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">
                      {alert.time}
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {language === 'es' ? 'Resuelta' : 'Resolved'}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardCommunityAlerts
