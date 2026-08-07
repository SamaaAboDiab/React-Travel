import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMessage } from '../features/messages/messagesSlice'
import { SITE_CONTENT } from '../data/siteContent'

const INITIAL_FORM = { firstName: '', lastName: '', email: '', phone: '', text: '' }

export default function Contact() {
  const c = SITE_CONTENT.contact
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.text.trim()) {
      setError('من فضلك املأ الاسم والبريد الإلكتروني والرسالة على الأقل.')
      return
    }

    dispatch(addMessage(formData))
    setSubmitted(true)
    setFormData(INITIAL_FORM)
  }

  return (
    <div className="px-4 mx-auto max-w-7xl md:px-8 py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* فورم الرسالة */}
        <div className="card p-7 md:p-9">
          <h1 className="mb-2 text-2xl font-extrabold font-display text-primary-700">{c.title}</h1>
          <p className="mb-6 text-sm text-night-500">
            {c.description}
          </p>

          {submitted ? (
            <div className="py-10 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-green-500 rounded-full bg-green-50">
                <i className="fa-solid fa-circle-check" />
              </div>
              <h2 className="mb-1 font-bold text-night-700">{c.successTitle}</h2>
              <p className="text-sm text-night-500">{c.successText}</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary mt-5 !px-5 !py-2 text-sm">
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-4 py-3 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-night-700">
                    <i className="ml-1 fa-regular fa-user" /> الاسم الأول
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="أدخل الاسم الأول"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-night-700">
                    <i className="ml-1 fa-regular fa-user" /> الاسم الأخير
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="أدخل الاسم الأخير"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-night-700">
                    <i className="ml-1 fa-regular fa-envelope" /> الإيميل
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    className="input-field"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-night-700">
                    <i className="ml-1 fa-solid fa-phone" /> الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01234567890"
                    className="input-field"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-night-700">
                  <i className="ml-1 fa-regular fa-comment" /> الرسالة
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                  className="resize-none input-field"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                <i className="fa-regular fa-paper-plane" />
                إرسال الرسالة
              </button>
            </form>
          )}
        </div>

        {/* بيانات التواصل + الخريطة */}
        <div className="space-y-6">
          <div className="card p-7 md:p-9">
            <h2 className="mb-1 text-xl font-bold font-display text-primary-700">{c.contactTitle}</h2>
            <p className="mb-6 text-sm text-night-500">{c.contactDescription}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600">
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <p className="text-xs text-night-400">الهاتف</p>
                  <p className="font-medium text-night-700" dir="ltr">+1235654399</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600">
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <p className="text-xs text-night-400">هاتف آخر</p>
                  <p className="font-medium text-night-700" dir="ltr">+1028753974</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600">
                  <i className="fa-regular fa-envelope" />
                </div>
                <div>
                  <p className="text-xs text-night-400">البريد الإلكتروني</p>
                  <p className="font-medium text-night-700" dir="ltr">travelerStore2025@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600">
                  <i className="fa-solid fa-location-dot" />
                </div>
                <div>
                  <p className="text-xs text-night-400">العنوان</p>
                  <p className="font-medium text-night-700">كفر الشيخ - مصر</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-night-100">
              {c.socialLinks.map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex items-center justify-center transition-colors rounded-full w-9 h-9 bg-primary-50 text-primary-600 hover:bg-hero-gradient hover:text-white"
                >
                  <i className={`fa-brands fa-${icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden card">
            <div className="flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-primary-50 text-primary-700">
              <i className="fa-solid fa-location-dot" /> {c.mapTitle}
            </div>
            <iframe
              title="موقع المتجر على الخريطة"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11490.120587582767!2d30.935115809734324!3d31.108806800182098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7ab78f233021f%3A0xc2cdebb004a208f8!2sKafr%20El-Shaikh%2C%20Qism%20Kafr%20El-Shaikh%2C%20Kafr%20el-Sheikh%2C%20Gharbia%20Governorate!5e0!3m2!1sen!2seg!4v1741346340208!5m2!1sen!2seg"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
