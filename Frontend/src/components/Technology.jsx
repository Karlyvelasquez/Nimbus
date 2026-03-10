import { Code2, Layers, Zap, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const Technology = () => {
  const models = [
    {
      name: 'RNN',
      role: 'Baseline',
      description: 'Establece el punto de partida. Demuestra comprensión profunda del problema desde sus fundamentos.',
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'LSTM + Attention',
      role: 'Producción',
      description: 'Memoria larga + mecanismo de atención. Identifica qué momentos del pasado predicen mejor el futuro.',
      color: 'from-blue-500 to-indigo-600',
      highlight: true,
    },
    {
      name: 'Liquid Neural Network',
      role: 'Frontera',
      description: 'Pesos dinámicos que evolucionan como ecuaciones diferenciales. Robusta para datos irregulares y no estacionarios.',
      color: 'from-purple-500 to-pink-600',
    },
  ]

  const advantages = [
    {
      icon: Layers,
      title: 'Multi-Estación',
      description: 'Captura correlaciones espaciales entre las 4 estaciones. Un solo modelo que aprende el transecto altitudinal completo.',
    },
    {
      icon: Zap,
      title: 'Walk-Forward Validation',
      description: 'Validación estricta sobre el último año. Predicciones cada hora con revelación progresiva, replicando condiciones reales.',
    },
    {
      icon: TrendingUp,
      title: 'Robustez ante ENSO',
      description: 'Diseñado para manejar datos faltantes, sensores con fallas, y patrones que cambian con ciclos climáticos.',
    },
  ]

  return (
    <section id="technology" className="py-20 bg-nimbus-cream dark:bg-nimbus-dark">
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
              <Code2 className="w-5 h-5 text-nimbus-blue dark:text-nimbus-cream" />
              <span className="text-sm font-bold text-nimbus-blue dark:text-nimbus-cream">
                Tecnología
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6">
              Tres arquitecturas, una progresión
            </h2>
            <p className="text-xl text-nimbus-dark/70 dark:text-nimbus-light/70 max-w-3xl mx-auto">
              Desde el baseline honesto hasta arquitecturas de frontera. Cada modelo
              resuelve un problema específico de las series temporales meteorológicas.
            </p>
          </motion.div>

          {/* Models */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl hover:shadow-2xl transition-all ${
                  model.highlight ? 'ring-4 ring-nimbus-blue dark:ring-nimbus-cream transform md:scale-105' : ''
                }`}
              >
                {model.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-nimbus-blue dark:bg-nimbus-cream text-white dark:text-nimbus-dark px-4 py-1 rounded-full text-sm font-bold">
                      En Producción
                    </span>
                  </div>
                )}
                <div className={`w-full h-2 bg-gradient-to-r ${model.color} rounded-full mb-4`}></div>
                <h3 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
                  {model.name}
                </h3>
                <p className="text-sm font-bold text-nimbus-blue dark:text-nimbus-cream mb-3">
                  {model.role}
                </p>
                <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
                  {model.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Advantages */}
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-nimbus-blue/10 dark:bg-nimbus-cream/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="w-8 h-8 text-nimbus-blue dark:text-nimbus-cream" />
                </div>
                <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-3">
                  {advantage.title}
                </h3>
                <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-white dark:bg-nimbus-blue/10 p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-center text-nimbus-dark dark:text-nimbus-light mb-8">
              Stack Técnico
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                'Python + PyTorch',
                'Liquid Time-Constant Networks',
                'NASA LDAS Data',
                'React + D3.js',
                'FastAPI Backend',
                'Telegram Bot API',
                'PostgreSQL + TimescaleDB',
                'Docker + AWS',
              ].map((tech, index) => (
                <div
                  key={index}
                  className="py-3 px-4 bg-nimbus-cream dark:bg-nimbus-dark rounded-lg font-semibold text-nimbus-dark dark:text-nimbus-light"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Technology
