import { motion } from 'framer-motion'
import { translations } from '../translations'

const CallToAction = ({ language }) => {
  const t = translations[language]

  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Galapagos.jpg"
          alt="Galápagos Islands"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nimbus-dark/80 via-nimbus-dark/70 to-nimbus-dark/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-semibold">
            {t.ctaSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-nimbus-cream to-transparent opacity-50"></div>
    </section>
  )
}

export default CallToAction
