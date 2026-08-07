import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  selectApprovedReviews,
} from "../features/reviews/reviewsSlice";
import { PRODUCTS } from "../data/products";
import { SITE_CONTENT } from "../data/siteContent";
import StarPicker from "../components/StarPicker";
import ReviewCard from "../components/ReviewCard";

export default function Services() {
  const s = SITE_CONTENT.services;
  const dispatch = useDispatch();
  const approvedReviews = useSelector(selectApprovedReviews);

  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    text: "",
  });
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.text.trim() || rating === 0) {
      setError("من فضلك املأ الاسم والتعليق واختر تقييم بالنجوم.");
      return;
    }

    const product = PRODUCTS.find((p) => String(p.id) === formData.productId);

    dispatch(
      addReview({
        name: formData.name,
        productName: product ? product.name : null,
        rating,
        text: formData.text,
      }),
    );

    setSubmitted(true);
    setFormData({ name: "", productId: "", text: "" });
    setRating(0);
  };

  return (
    <div>
      {/* هيرو الصفحة */}
      <section className="py-16 text-center text-white bg-primary-600">
        <h1 className="mb-3 text-3xl font-extrabold md:text-4xl font-display">
          {s.heroTitle}
        </h1>
        <p className="max-w-xl px-4 mx-auto text-primary-100">
          {s.heroDescription}
        </p>
      </section>

      {/* الخدمات */}
      <section className="px-4 mx-auto max-w-7xl md:px-8 py-14">
        <h2 className="section-title">{s.sectionTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {s.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 text-center card p-7"
            >
              <div className="flex items-center justify-center text-2xl w-14 h-14 rounded-2xl bg-primary-50 text-primary-900">
                <i className={item.icon} />
              </div>
              <h3 className="font-bold font-display text-night-900">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-night-900">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ليه تختار متجرنا */}
      <section className="bg-primary-50/60 py-14">
        <div className="px-4 mx-auto max-w-7xl md:px-8">
          <h2 className="section-title">{s.whyTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {s.whyItems.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 p-6 bg-white rounded-xl2 shadow-card"
              >
                <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-gold-gradient text-primary-900">
                  <i className={f.icon} />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-night-900">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-night-500">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="px-4 mx-auto max-w-7xl md:px-8 py-14">
        <div className="grid grid-cols-2 gap-8 px-6 py-10 text-center text-white bg-primary-600 rounded-xl2 md:grid-cols-4">
          {s.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold md:text-4xl font-display text-gold-300">
                {stat.number}
              </p>
              <p className="mt-1 text-sm text-primary-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* آراء العملاء */}
      <section className="px-4 mx-auto max-w-7xl md:px-8 py-14">
        <h2 className="section-title">{s.reviewsTitle}</h2>

        {approvedReviews.length > 0 && (
          <div className="grid gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3">
            {approvedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* فورم إضافة تعليق */}
        <div className="max-w-2xl mx-auto card p-7 md:p-8">
          <h3 className="flex items-center gap-2 mb-5 text-lg font-bold font-display text-primary-900">
            <i className="fa-regular fa-pen-to-square" /> {s.reviewFormTitle}
          </h3>

          {submitted ? (
            <div className="py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-green-500 rounded-full bg-green-50">
                <i className="fa-solid fa-circle-check" />
              </div>
              <h4 className="mb-1 font-bold text-night-700">
                {s.reviewSuccessTitle}
              </h4>
              <p className="text-sm text-night-500">{s.reviewSuccessText}</p>
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
                <div className="px-4 py-3 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-night-700">
                    👤 اسمك
                  </label>
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
                  <label className="block mb-2 text-sm font-semibold text-night-700">
                    📦 اختر المنتج (اختياري)
                  </label>
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
                <label className="block mb-2 text-sm font-semibold text-night-700">
                  ⭐ تقييمك
                </label>
                <StarPicker value={rating} onChange={setRating} />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-night-900">
                  💬 تعليقك
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="اكتب رأيك في المنتج أو الخدمة..."
                  rows={4}
                  className="resize-none input-field"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                <i className="fa-regular fa-paper-plane" />
                إرسال التقييم
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center text-white bg-primary-600">
        <h2 className="mb-3 text-2xl font-bold md:text-3xl font-display">
          {s.ctaTitle}
        </h2>
        <p className="text-primary-200 mb-7">{s.ctaDescription}</p>
        <Link to="/contact" className="btn-gold">
          {s.ctaButton}
        </Link>
      </section>
    </div>
  );
}
