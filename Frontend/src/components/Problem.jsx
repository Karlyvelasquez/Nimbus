import { AlertTriangle, Mountain, Sprout, MapPin, Fish } from 'lucide-react'
import { motion } from 'framer-motion'

const Problem = () => {
  const impacts = [
    {
      icon: MapPin,
      title: 'Rutas Turísticas Cerradas',
      description: 'Eventos extremos afectan el acceso a sitios protegidos',
    },
    {
      icon: Sprout,
      title: 'Cultivos Destruidos',
      description: 'Agricultores del altiplano pierden cosechas por falta de aviso',
    },
    {
      icon: Mountain,
      title: 'Derrumbes en Vías Críticas',
      description: 'Precipitaciones intensas generan riesgo de deslizamientos',
    },
    {
      icon: Fish,
      title: 'Fauna Endémica en Riesgo',
      description: 'Zonas de especies únicas se ven afectadas sin anticipación',
    },
  ]

  return (
    <section id="problem" className="py-20 bg-white dark:bg-nimbus-dark/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-sm font-bold text-red-600 dark:text-red-400">
                El Desafío
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6">
              Un ecosistema frágil sin capa de inteligencia
            </h2>
            <p className="text-xl text-nimbus-dark/70 dark:text-nimbus-light/70 max-w-3xl mx-auto">
              San Cristóbal alberga uno de los ecosistemas más protegidos del planeta.
              La red de sensores ya existe y transmite datos cada 15 minutos — pero{' '}
              <span className="font-bold text-nimbus-blue dark:text-nimbus-cream">
                no hay ninguna capa de inteligencia
              </span>{' '}
              que convierta esos datos en advertencias anticipadas.
            </p>
          </motion.div>

          {/* Impact Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-nimbus-cream dark:bg-nimbus-blue/10 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-nimbus-blue/10 dark:bg-nimbus-cream/10 rounded-lg flex items-center justify-center">
                  <impact.icon className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
                    {impact.title}
                  </h3>
                  <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
                    {impact.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark p-8 rounded-2xl text-center"
          >
            <p className="text-2xl font-bold text-white mb-4">
              Los datos existen. La infraestructura está operando.
            </p>
            <p className="text-xl text-white/90">
              Lo único que falta es la inteligencia que los transforme en acción.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Problem
