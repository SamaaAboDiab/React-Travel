import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SLIDER_ITEMS = [
  { label: "محفظة جواز سفر", image: "/images/H-product/product--9.png" },
  { label: "غلاف حماية للشنطة", image: "/images/category2.png" },
  { label: "موقد تخييم صغير", image: "/images/Category3.png" },
  { label: "موقد غاز محمول", image: "/images/H-product/product--92.png" },
  { label: "عدة تنظيف الأحذية", image: "/images/H-product/product--50.png" },
];

export default function CategoriesSlider() {
  return (
    <section className="px-4 py-10 mx-auto max-w-7xl md:px-8">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="section-title">استكشف فئات السفر</h2>
          <p className="max-w-2xl mt-2 text-night-500">
            تصفح فئات السفر المختلفة واختر المنتج المناسب لكل رحلة بسهولة.
          </p>
        </div>
        <Link to="/products" className="text-sm btn-secondary">
          عرض الكل
        </Link>
      </div>

      {/* الفريم ثابت المكان — بس دلوقتي أكبر وبادينج أقل عشان الصورة تاخد مساحتها */}
      <Link
        to="/products"
        className="block w-full sm:w-[34rem] md:w-[40rem] lg:w-[36rem] mx-auto rounded-[1rem] overflow-hidden shadow-card border border-night-50 bg-white"
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1200, disableOnInteraction: false }}
          loop
          speed={500}
          slidesPerView={1}
          className="h-96 md:h-[28rem]"
        >
          {SLIDER_ITEMS.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex items-center justify-center w-full h-full p-2 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                  className="object-contain w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Link>
    </section>
  );
}
