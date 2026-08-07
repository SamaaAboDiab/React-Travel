import { Link } from 'react-router-dom'
import { SITE_CONTENT } from '../data/siteContent'

export default function Footer() {
  const { footer, appName } = SITE_CONTENT

  return (
    <footer className="bg-primary-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-gold-400 font-display font-bold text-lg mb-4">{footer.aboutTitle}</h3>
          <p className="text-primary-200 text-sm leading-relaxed">{footer.aboutText}</p>
          <div className="flex items-center gap-2 mt-4 text-primary-200 font-display font-bold">
            {appName}
          </div>
        </div>

        <div>
          <h3 className="text-gold-400 font-display font-bold text-lg mb-4">{footer.accountTitle}</h3>
          <ul className="space-y-2 text-sm">
            {footer.accountLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-primary-200 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-gold-400 font-display font-bold text-lg mb-4">{footer.linksTitle}</h3>
          <ul className="space-y-2 text-sm">
            {footer.footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-primary-200 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-gold-400 font-display font-bold text-lg mb-4">{footer.contactTitle}</h3>
          <ul className="space-y-3 text-sm text-primary-200">
            {footer.contactItems.map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <i className={item.icon} />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-primary-300 text-sm border-t border-primary-800 py-5">
        {footer.copyright}
      </p>
    </footer>
  )
}
