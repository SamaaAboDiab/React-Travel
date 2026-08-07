import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addReview, selectApprovedReviews } from '../features/reviews/reviewsSlice'
import { PRODUCTS } from '../data/products'
import { SITE_CONTENT } from '../data/siteContent'
import StarPicker from '../components/StarPicker'
import ReviewCard from '../components/ReviewCard'

export default function Services() {
  const s = SITE_CONTENT.services
  const dispatch = useDispatch()
  const approvedReviews = useSelector(selectApprovedReviews)

  const [formData, setFormData] = useState({ name: '', productId: '', text: '' })
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim() || !formData.text.trim() || rating === 0) {
      setError('من فضلك املأ الاسم والتعليق واختر تقييم بالنجوم.')
      return
    }

    const product = PRODUCTS.find((p) => String(p.id) === formData.productId)

    dispatch(
      addReview({
        name: formData.name,
        productName: product ? product.name : null,
        rating,
        text: formData.text,
      })
    )

    setSubmitted(true)
    setFormData({ name: '', productId: '', text: '' })
    setRating(0)
  }

  return (
    <div>
      {/* هيرو الصفحة */}
      <section className="bg-hero-gradient text-white py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-3">{s.heroTitle}</h1>
        <p className="text-primary-100 max-w-xl mx-auto px-4">{s.heroDescription}</p>
      </section>

      {/* الخدمات */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="section-title">{s.sectionTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {s.items.map((item) => (
            <div key={item.title} className="card p-7 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-2xl">
                <i className={item.icon} />
              </div>
              <h3 className="font-display font-bold text-night-700">{item.title}</h3>
              <p className="text-night-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ليه تختار متجرنا */}
      <section className="bg-primary-50/60 py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="section-title">{s.whyTitle}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {s.whyItems.map((f) => (
              <div key={f.title} className="flex items-start gap-4 bg-white rounded-xl2 p-6 shadow-card">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gold-gradient text-primary-900 flex items-center justify-center">
                  <i className={f.icon} />
                </div>
                <div>
                  <h3 className="font-bold text-night-700 mb-1">{f.title}</h3>
                  <p className="text-night-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="bg-hero-gradient rounded-xl2 py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {s.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-display font-extrabold text-gold-300">{stat.number}</p>
              <p className="text-primary-100 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* آراء العملاء */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="section-title">{s.reviewsTitle}</h2>

        {approvedReviews.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {approvedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* فورم إضافة تعليق */}
        <div className="max-w-2xl mx-auto card p-7 md:p-8">
          <h3 className="font-display font-bold text-primary-700 text-lg mb-5 flex items-center gap-2">
            <i className="fa-regular fa-pen-to-square" /> {s.reviewFormTitle}
          </h3>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                <i className="fa-solid fa-circle-check" />
              </div>
              <h4 className="font-bold text-night-700 mb-1">{s.reviewSuccessTitle}</h4>
              <p className="text-night-500 text-sm">{s.reviewSuccessText}</p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary mt-5 !px-5 !py-2 text-sm"
              >
                إضافة تعليق آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-night-700 mb-2">👤 اسمك</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-night-700 mb-2">📦 اختر المنتج (اختياري)</label>
                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">-- اختر المنتج --</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-night-700 mb-2">⭐ تقييمك</label>
                <StarPicker value={rating} onChange={setRating} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-night-700 mb-2">💬 تعليقك</label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="اكتب رأيك في المنتج أو الخدمة..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <i className="fa-regular fa-paper-plane" />
                إرسال التقييم
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-900 text-white text-center py-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{s.ctaTitle}</h2>
        <p className="text-primary-200 mb-7">{s.ctaDescription}</p>
        <Link to="/contact" className="btn-gold">
          {s.ctaButton}
        </Link>
      </section>
    </div>
  )
}
