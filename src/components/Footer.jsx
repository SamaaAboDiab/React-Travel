import { Link } from 'react-router-dom'
import { SITE_CONTENT } from '../data/siteContent'

export default function Footer() {
  const { footer, appName } = SITE_CONTENT

  return (
    <footer className="mt-20 text-white bg-primary-800">
      <div className="grid grid-cols-1 gap-10 px-4 mx-auto max-w-7xl md:px-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400 font-display">{footer.aboutTitle}</h3>
          <p className="text-sm leading-relaxed text-primary-200">{footer.aboutText}</p>
          <div className="flex items-center gap-2 mt-4 font-bold text-primary-200 font-display">
            {appName}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400 font-display">{footer.accountTitle}</h3>
          <ul className="space-y-2 text-sm">
            {footer.accountLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors text-primary-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400 font-display">{footer.linksTitle}</h3>
          <ul className="space-y-2 text-sm">
            {footer.footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors text-primary-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400 font-display">{footer.contactTitle}</h3>
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

      <p className="py-5 text-sm text-center border-t text-primary-300 border-primary-800">
        {footer.copyright}
      </p>
    </footer>
  )
}
