import { Lightbulb, Database, Brain, Bell, Network } from 'lucide-react'
import { motion } from 'framer-motion'

const Solution = () => {
  const features = [
    {
      icon: Database,
      title: '11 Años de Datos',
      description: '4 estaciones en transecto altitudinal desde la costa hasta la cumbre, 376K registros por estación con 46 variables meteorológicas.',
    },
    {
      icon: Brain,
      title: 'Tres Arquitecturas de IA',
      description: 'RNN baseline, LSTM+Attention en producción, y Liquid Neural Networks para datos irregulares y no estacionarios.',
    },
    {
      icon: Network,
      title: 'Modelo Multi-Estación',
      description: 'Captura correlaciones espaciales entre estaciones. Lo que ocurre en la costa anticipa lo que ocurrirá en la cumbre.',
    },
    {
      icon: Bell,
      title: 'Predicciones Accionables',
      description: 'Horizonte +1h, +3h y +6h con clasificación: Sin lluvia, Lluvia leve, Lluvia intensa. Alertas que permiten tomar acción.',
    },
  ]

  return (
    <section id="solution" className="py-20 bg-nimbus-cream dark:bg-nimbus-dark">
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
            <div className="inline-flex items-center space-x-2 bg-nimbus-blue/10 dark:bg-nimbus-cream/10 px-4 py-2 rounded-full mb-4">
              <Lightbulb className="w-5 h-5 text-nimbus-blue dark:text-nimbus-cream" />
              <span className="text-sm font-bold text-nimbus-blue dark:text-nimbus-cream">
                La Solución
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6">
              Nimbus: Inteligencia para datos existentes
            </h2>
            <p className="text-xl text-nimbus-dark/70 dark:text-nimbus-light/70 max-w-3xl mx-auto">
              No reinventamos la infraestructura. Transformamos los datos que el{' '}
              <span className="font-bold text-nimbus-blue dark:text-nimbus-cream">
                Galapagos Science Center
              </span>{' '}
              ya recolecta en predicciones que salvan ecosistemas y comunidades.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-nimbus-blue/10 p-8 rounded-xl hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-nimbus-blue/10 dark:bg-nimbus-cream/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-nimbus-blue dark:text-nimbus-cream" />
                </div>
                <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-3">
                  {feature.title}
                </h3>
                <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Workflow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-nimbus-blue via-nimbus-dark to-nimbus-blue p-1 rounded-2xl"
          >
            <div className="bg-white dark:bg-nimbus-dark p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-center text-nimbus-dark dark:text-nimbus-light mb-8">
                Del Sensor a la Acción
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-4">
                {[
                  { step: '1', title: 'Recolección', desc: '15 min' },
                  { step: '2', title: 'Procesamiento', desc: 'IA Multi-Estación' },
                  { step: '3', title: 'Predicción', desc: '+1h, +3h, +6h' },
                  { step: '4', title: 'Alerta', desc: '3 Audiencias' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-nimbus-blue dark:bg-nimbus-cream rounded-full flex items-center justify-center text-2xl font-bold text-white dark:text-nimbus-dark mb-3">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                      {item.desc}
                    </p>
                    {index < 3 && (
                      <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-0.5 bg-nimbus-blue dark:bg-nimbus-cream"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Solution
