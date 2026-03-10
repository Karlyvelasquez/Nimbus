import { Database, Brain, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { translations } from '../translations'

const Features = ({ language }) => {
  const t = translations[language]

  const features = [
    {
      icon: Database,
      title: t.featureData,
      description: t.featureDataDesc,
    },
    {
      icon: Brain,
      title: t.featureAI,
      description: t.featureAIDesc,
    },
    {
      icon: Bell,
      title: t.featureAlerts,
      description: t.featureAlertsDesc,
    },
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-nimbus-dark/50">
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
            <h2 className="text-4xl md:text-5xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-lg text-nimbus-dark/70 dark:text-nimbus-light/70 max-w-2xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-nimbus-cream dark:bg-nimbus-blue/10 p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-nimbus-blue/10 dark:bg-nimbus-cream/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-nimbus-blue dark:text-nimbus-cream" />
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
        </div>
      </div>
    </section>
  )
}

export default Features
