import { Phone, MapPin, Mail, Clock, AlertTriangle, Shield, Flame, Heart, Activity, Building2, Leaf, Microscope, Waves, CloudRain, Wind, Zap, Backpack, CheckCircle } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'

const DashboardCommunityEmergency = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const t = translations[language] || translations['en']

  const emergencyContacts = [
    {
      category: language === 'es' ? 'Emergencias General' : 'General Emergency',
      contacts: [
        {
          name: language === 'es' ? 'Policía Nacional' : 'National Police',
          phone: '911',
          available: '24/7',
          icon: Shield,
        },
        {
          name: language === 'es' ? 'Bomberos' : 'Fire Department',
          phone: '102',
          available: '24/7',
          icon: Flame,
        },
        {
          name: language === 'es' ? 'Cruz Roja' : 'Red Cross',
          phone: '131',
          available: '24/7',
          icon: Heart,
        },
      ],
    },
    {
      category: language === 'es' ? 'Salud' : 'Health',
      contacts: [
        {
          name: language === 'es' ? 'Hospital San Cristóbal' : 'San Cristóbal Hospital',
          phone: '(05) 252-0118',
          address: 'Av. Northia, San Cristóbal',
          available: '24/7',
          icon: Heart,
        },
        {
          name: language === 'es' ? 'Centro de Salud' : 'Health Center',
          phone: '(05) 252-0143',
          address: 'Calle Hernández, San Cristóbal',
          available: language === 'es' ? 'Lu-Vi 8:00-17:00' : 'Mon-Fri 8:00-17:00',
          icon: Activity,
        },
      ],
    },
    {
      category: language === 'es' ? 'Autoridades Locales' : 'Local Authorities',
      contacts: [
        {
          name: language === 'es' ? 'Municipio de San Cristóbal' : 'San Cristóbal Municipality',
          phone: '(05) 252-0137',
          email: 'municipio@sancristobal.gob.ec',
          available: language === 'es' ? 'Lu-Vi 8:00-17:00' : 'Mon-Fri 8:00-17:00',
          icon: Building2,
        },
        {
          name: language === 'es' ? 'Parque Nacional Galápagos' : 'Galápagos National Park',
          phone: '(05) 252-0189',
          email: 'png@galapagos.gob.ec',
          available: language === 'es' ? 'Lu-Vi 7:30-16:30' : 'Mon-Fri 7:30-16:30',
          icon: Leaf,
        },
      ],
    },
    {
      category: language === 'es' ? 'Meteorología y Clima' : 'Weather and Climate',
      contacts: [
        {
          name: 'Galápagos Science Center',
          phone: '(05) 301-1900',
          email: 'info@ikiam.edu.ec',
          available: language === 'es' ? 'Lu-Vi 8:00-17:00' : 'Mon-Fri 8:00-17:00',
          icon: Microscope,
        },
        {
          name: 'INOCAR',
          phone: '(04) 248-1300',
          email: 'oceanografia@inocar.mil.ec',
          available: language === 'es' ? 'Lu-Vi 8:00-16:00' : 'Mon-Fri 8:00-16:00',
          icon: Waves,
        },
      ],
    },
  ]

  const safetyTips = [
    {
      icon: CloudRain,
      title: language === 'es' ? 'Durante Lluvias Intensas' : 'During Heavy Rain',
      tips: [
        language === 'es' ? 'Busca refugio en un lugar seguro' : 'Seek shelter in a safe place',
        language === 'es' ? 'Evita cruzar corrientes de agua' : 'Avoid crossing water currents',
        language === 'es' ? 'Mantente alejado de árboles grandes' : 'Stay away from large trees',
        language === 'es' ? 'No uses equipos eléctricos' : 'Do not use electrical equipment',
      ],
    },
    {
      icon: Wind,
      title: language === 'es' ? 'Durante Vientos Fuertes' : 'During Strong Winds',
      tips: [
        language === 'es' ? 'Mantente en interiores si es posible' : 'Stay indoors if possible',
        language === 'es' ? 'Asegura objetos que puedan volar' : 'Secure objects that may fly',
        language === 'es' ? 'Cierra puertas y ventanas' : 'Close doors and windows',
        language === 'es' ? 'Evita áreas con árboles' : 'Avoid areas with trees',
      ],
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Durante Tormentas Eléctricas' : 'During Thunderstorms',
      tips: [
        language === 'es' ? 'Busca refugio cerrado inmediatamente' : 'Seek closed shelter immediately',
        language === 'es' ? 'Evita contacto con objetos metálicos' : 'Avoid contact with metal objects',
        language === 'es' ? 'Desconecta aparatos eléctricos' : 'Unplug electrical devices',
        language === 'es' ? 'No te refugies bajo árboles' : 'Do not shelter under trees',
      ],
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
            {language === 'es' ? 'Contactos de Emergencia' : 'Emergency Contacts'}
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            {language === 'es' 
              ? 'Números importantes y consejos de seguridad'
              : 'Important numbers and safety tips'}
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-500 p-6 rounded-xl text-white flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {language === 'es' ? 'Emergencia: 911' : 'Emergency: 911'}
            </h3>
            <p className="text-white/90">
              {language === 'es' 
                ? 'Disponible 24/7 para cualquier emergencia'
                : 'Available 24/7 for any emergency'}
            </p>
          </div>
        </div>

        {/* Emergency Contacts by Category */}
        {emergencyContacts.map((category, catIndex) => (
          <div key={catIndex}>
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
              {category.category}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {category.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-nimbus-blue/20 dark:bg-nimbus-blue/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-nimbus-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-3">
                        {contact.name}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-nimbus-blue" />
                          <a
                            href={`tel:${contact.phone}`}
                            className="text-nimbus-blue hover:underline font-semibold"
                          >
                            {contact.phone}
                          </a>
                        </div>
                        {contact.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-nimbus-blue" />
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-nimbus-blue hover:underline text-sm"
                            >
                              {contact.email}
                            </a>
                          </div>
                        )}
                        {contact.address && (
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-nimbus-blue flex-shrink-0 mt-1" />
                            <span className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                              {contact.address}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 pt-2">
                          <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                            {contact.available}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Safety Tips */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <span>{language === 'es' ? 'Consejos de Seguridad' : 'Safety Tips'}</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20"
              >
                <div className="w-12 h-12 bg-nimbus-blue/20 dark:bg-nimbus-blue/30 rounded-full flex items-center justify-center mb-4">
                  <tip.icon className="w-6 h-6 text-nimbus-blue" />
                </div>
                <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-3">
                  {tip.title}
                </h4>
                <ul className="space-y-2">
                  {tip.tips.map((item, idx) => (
                    <li key={idx} className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Kit */}
        <div className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark p-8 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Backpack className="w-6 h-6" />
            <span>{language === 'es' ? 'Kit de Emergencia Familiar' : 'Family Emergency Kit'}</span>
          </h3>
          <p className="mb-4">
            {language === 'es' 
              ? 'Asegúrate de tener siempre a mano:'
              : 'Make sure you always have on hand:'}
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Agua potable (3 días)' : 'Drinking water (3 days)'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Alimentos no perecederos' : 'Non-perishable food'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Linterna y baterías' : 'Flashlight and batteries'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Radio portátil' : 'Portable radio'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Botiquín de primeros auxilios' : 'First aid kit'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Medicamentos esenciales' : 'Essential medications'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Documentos importantes' : 'Important documents'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'es' ? 'Dinero en efectivo' : 'Cash money'}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardCommunityEmergency
