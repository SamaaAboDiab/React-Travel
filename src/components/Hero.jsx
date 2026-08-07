import { Link } from "react-router-dom";
import { SITE_CONTENT } from "../data/siteContent";

export default function Hero() {
  const { hero } = SITE_CONTENT.home;

  return (
    <section className="relative overflow-hidden bg-primary-600">
      {/* دوائر زخرفية في الخلفية */}
      <div className="absolute rounded-full -top-24 -left-24 w-72 h-72 bg-white/5" />
      <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-gold-400/10 translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <div className="text-center text-white md:text-right">
          <span className="inline-block px-4 py-2 mb-5 text-sm font-semibold rounded-full bg-white/10 backdrop-blur text-gold-200">
            {hero.badge}
          </span>
          <h1 className="mb-5 text-3xl font-extrabold leading-tight md:text-5xl font-display">
            {hero.title}
          </h1>
          <p className="max-w-xl mx-auto mb-8 text-base leading-relaxed text-white md:text-lg md:mx-0">
            {hero.description}
          </p>

          <div className="flex flex-col items-center justify-start gap-3 mb-8 sm:flex-row">
            <Link to="/products" className="text-base shadow-xl btn-gold">
              {hero.cta}
            </Link>
            <Link
              to="/services"
              className="text-base bg-white btn-secondary text-night-800 hover:bg-primary-50"
            >
              اكتشف خدماتنا
            </Link>
          </div>

          <div className="grid max-w-xl grid-cols-1 gap-3 mx-auto text-center sm:grid-cols-3 md:mx-0">
            <div className="p-4 text-center border rounded-3xl bg-white/10 border-white/15">
              <p className="text-sm font-semibold text-white">شحن سريع</p>
              <p className="text-xs text-primary-200">يوصل للباب بأمان وسرعة</p>
            </div>
            <div className="p-4 text-center border rounded-3xl bg-white/10 border-white/15">
              <p className="text-sm font-semibold text-white">منتجات أصلية</p>
              <p className="text-xs text-primary-200">جميعها مختارة بعناية</p>
            </div>
            <div className="p-4 text-center border rounded-3xl bg-white/10 border-white/15">
              <p className="text-sm font-semibold text-white">دعم فني 24/7</p>
              <p className="text-xs text-primary-200">
                مستعدين نساعدك في أي وقت
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-52 md:h-[520px] overflow-hidden">
            <img
              src="/images/Banner.png"
              alt="بانر السفر"
              width="612"
              height="408"
              fetchpriority="high"
              loading="eager"
              decoding="async"
              className="object-cover w-full h-full filter brightness-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
