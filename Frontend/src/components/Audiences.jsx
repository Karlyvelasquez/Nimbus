import { Microscope, CloudRain, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { translations } from '../translations'

const Audiences = ({ language }) => {
  const t = translations[language]

  const audiences = [
    {
      icon: Microscope,
      title: t.audienceML,
      description: t.audienceMLDesc,
      color: 'bg-nimbus-dark',
      link: '/dashboard/ml-expert',
    },
    {
      icon: CloudRain,
      title: t.audienceMet,
      description: t.audienceMetDesc,
      color: 'bg-nimbus-blue',
      link: '/dashboard/meteorologist',
    },
    {
      icon: Users,
      title: t.audienceUser,
      description: t.audienceUserDesc,
      color: 'bg-[#4d6e91]',
      link: '/dashboard/community',
    },
  ]

  return (
    <section id="audiences" className="py-20 bg-nimbus-cream dark:bg-nimbus-dark">
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
              {t.audiencesTitle}
            </h2>
            <p className="text-lg text-nimbus-dark/70 dark:text-nimbus-light/70 max-w-2xl mx-auto">
              {t.audiencesSubtitle}
            </p>
          </motion.div>

          {/* Audiences Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={audience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-nimbus-blue/10 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className={`w-16 h-16 ${audience.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <audience.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-3 flex items-center justify-between">
                    {audience.title}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
                    {audience.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Audiences
