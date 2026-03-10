import { Github, Linkedin, Mail } from 'lucide-react'
import { translations } from '../translations'

const Footer = ({ language, darkMode }) => {
  const t = translations[language]

  return (
    <footer className="bg-nimbus-dark text-white py-12 dark:border-t dark:border-white/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <img
                src="/logo-blanco-oscuro.png"
                alt="Nimbus Logo"
                className="h-10 w-auto mb-4"
              />
              <p className="text-nimbus-light/70 text-sm">
                {t.footerDescription}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">{t.footerContact}</h3>
              <p className="text-nimbus-light/70 text-sm mb-4">
                {t.footerDeveloped}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Partner Logos */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-nimbus-light/70 text-sm mb-2">
                {t.footerBuilt}
              </p>
              <p className="text-nimbus-light/70 text-sm">
                © 2026 Nimbus. {t.footerRights}
              </p>
            </div>
            <img
              src="/logos-empresas-oscuro.png"
              alt="Partner Organizations"
              className="h-14 w-auto opacity-70 hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
