import { motion } from 'framer-motion'

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-nimbus-blue flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.img
          src="/logo-blanco-oscuro.png"
          alt="Nimbus"
          className="h-48 md:h-64 w-auto mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-xl md:text-2xl text-white/90 font-semibold mt-8">More than an alert, a companion</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SplashScreen
