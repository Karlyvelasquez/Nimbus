import { Target, Rocket, BookOpen, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const Impact = () => {
  const timeline = [
    {
      icon: Target,
      phase: 'Corto Plazo',
      title: 'Protección Inmediata',
      description: 'Alertas tempranas para la comunidad de Puerto Baquerizo Moreno y agricultores del altiplano de San Cristóbal.',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Rocket,
      phase: 'Mediano Plazo',
      title: 'Integración Operativa',
      description: 'Backend predictivo integrado al dashboard del GSC en weathergsc.usfq.edu.ec — la capa de inteligencia que faltaba.',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Globe,
      phase: 'Largo Plazo',
      title: 'Escalabilidad Regional',
      description: 'Framework replicable a las demás islas del archipiélago — Santa Cruz, Isabela, Fernandina — y otros ecosistemas insulares del Pacífico.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: BookOpen,
      phase: 'Impacto Científico',
      title: 'Publicación Académica',
      description: 'Metodología candidata a publicación en colaboración con investigadores de UNC y USFQ. Framework para ecosistemas frágiles.',
      color: 'from-orange-500 to-red-600',
    },
  ]

  return (
    <section id="impact" className="py-20 bg-white dark:bg-nimbus-dark/50">
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
              <Rocket className="w-5 h-5 text-nimbus-blue dark:text-nimbus-cream" />
              <span className="text-sm font-bold text-nimbus-blue dark:text-nimbus-cream">
                Impacto y Escalabilidad
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6">
              De prototipo a producción
            </h2>
            <p className="text-xl text-nimbus-dark/70 dark:text-nimbus-light/70 max-w-3xl mx-auto">
              Nimbus no es un experimento de hackathon. Es la extensión natural
              de lo que el GSC y USFQ construyeron durante once años.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-8 mb-16">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-6"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-nimbus-cream dark:bg-nimbus-blue/10 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-sm font-bold text-nimbus-blue dark:text-nimbus-cream px-3 py-1 bg-white dark:bg-nimbus-dark rounded-full">
                      {item.phase}
                    </span>
                    <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-nimbus-blue via-nimbus-dark to-nimbus-blue p-1 rounded-2xl mb-16"
          >
            <div className="bg-white dark:bg-nimbus-dark p-8 rounded-2xl">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-nimbus-blue dark:text-nimbus-cream mb-2">
                    1
                  </div>
                  <p className="text-nimbus-dark dark:text-nimbus-light font-semibold">
                    Producto Completo vs Notebooks Experimentales
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-nimbus-blue dark:text-nimbus-cream mb-2">
                    3
                  </div>
                  <p className="text-nimbus-dark dark:text-nimbus-light font-semibold">
                    Interfaces Diferenciadas por Rol de Usuario
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-nimbus-blue dark:text-nimbus-cream mb-2">
                    ∞
                  </div>
                  <p className="text-nimbus-dark dark:text-nimbus-light font-semibold">
                    Escalabilidad a Ecosistemas Insulares Globales
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-nimbus-cream dark:bg-nimbus-blue/10 p-12 rounded-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
              La infraestructura está. Los datos están.
            </h3>
            <p className="text-2xl text-nimbus-blue dark:text-nimbus-cream font-bold mb-8">
              Nosotros añadimos la inteligencia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://weathergsc.usfq.edu.ec"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Ver Dashboard GSC
              </a>
              <a
                href="#audiences"
                className="border-2 border-nimbus-blue dark:border-nimbus-cream text-nimbus-blue dark:text-nimbus-cream px-8 py-4 rounded-lg font-bold hover:bg-nimbus-blue/10 dark:hover:bg-nimbus-cream/10 transition-all duration-300"
              >
                Explorar Plataformas
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Impact
