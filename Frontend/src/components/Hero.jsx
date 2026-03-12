import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { translations } from '../translations'

const Hero = ({ language, darkMode }) => {
  const t = translations[language]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-nimbus-light/30 dark:bg-nimbus-dark/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12">
            {/* Animated Logo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 relative"
            >
              {/* Animated Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-nimbus-blue/20 via-nimbus-cream/10 to-nimbus-dark/20 dark:from-nimbus-cream/20 dark:via-nimbus-blue/10 dark:to-nimbus-light/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 border-4 border-nimbus-blue/30 dark:border-nimbus-cream/30 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              
              <motion.img
                src={darkMode ? '/logo-blanco-oscuro.png' : '/logo-azul-claro.png'}
                alt="Nimbus Logo"
                className="h-64 md:h-80 lg:h-96 w-auto relative z-10"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <span className="text-nimbus-dark dark:text-nimbus-light">{t.heroTitle}</span>{' '}
                <span className="block mt-2 bg-gradient-to-r from-nimbus-blue via-nimbus-dark to-nimbus-blue bg-clip-text text-transparent dark:from-nimbus-cream dark:via-nimbus-light dark:to-nimbus-cream">
                  {t.heroTitleHighlight}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-nimbus-dark dark:text-nimbus-cream mb-6 font-semibold"
              >
                {t.heroSubtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base text-nimbus-dark dark:text-nimbus-light/80 mb-8 font-medium"
              >
                {t.heroDescription}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
              >
                <a
                  href="https://unaulaedu-my.sharepoint.com/:b:/g/personal/karly_velasquez0845_unaula_edu_co/IQD9z0jzmL_kSoJP6T0PxMQlAX7Ziga6BSrFA6COgIEXAxA?e=0fTzqS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>{t.ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#audiences"
                  className="flex items-center space-x-2 border-2 border-nimbus-blue dark:border-nimbus-cream text-nimbus-blue dark:text-nimbus-cream px-6 py-3 rounded-lg font-bold hover:bg-nimbus-blue/10 dark:hover:bg-nimbus-cream/10 transition-all duration-300"
                >
                  <span>{t.ctaSecondary}</span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '4', label: t.statStations },
              { value: '11', label: t.statYears },
              { value: '376K', label: t.statRecords },
              { value: '3', label: t.statHorizons },
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/80 dark:bg-nimbus-dark/80 p-4 rounded-xl backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold text-nimbus-blue dark:text-nimbus-cream mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 font-semibold leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white dark:fill-nimbus-dark/50"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
