import { useDispatch } from 'react-redux'
import { addToCart, openCart } from '../features/cart/cartSlice'
import { SITE_CONTENT } from '../data/siteContent'

export default function OfferSection() {
  const dispatch = useDispatch()
  const { offer } = SITE_CONTENT.home

  const offerProduct = {
    id: 9999,
    name: 'طقم السفر الأساسي',
    price: 1500.0,
    image: '/images/Banner2.png',
  }

  const discount = 30
  const discountedPrice = offerProduct.price * (1 - discount / 100)

  const handleAddOfferToCart = () => {
    dispatch(addToCart({ ...offerProduct, price: parseFloat(discountedPrice.toFixed(2)) }))
    dispatch(openCart())
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h2 className="section-title">عروض مميزة</h2>
      <div className="grid md:grid-cols-2 gap-8 items-center bg-primary-50 rounded-xl2 p-8 md:p-12 border border-primary-100">
        <div>
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <span>خصم {discount}%</span>
          </span>
          <span className="inline-block bg-gold-gradient text-primary-900 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            {offer.badge}
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary-700 mb-4">
            {offer.title}
          </h2>
          <p className="text-night-500 leading-loose mb-6 max-w-xl">
            {offer.description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={handleAddOfferToCart}
              className="btn-primary px-6 py-3"
              type="button"
            >
              {offer.cta}
            </button>
            <div className="space-y-1 text-right">
              <div className="text-sm text-night-500">السعر بعد الخصم</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-primary-700">{discountedPrice.toFixed(2)} جنيه</span>
                <span className="text-sm line-through text-night-400">{offerProduct.price.toFixed(2)} جنيه</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-night-500 mt-3">توصيل مجاني للطلبات فوق 5000 جنيه</p>
        </div>
        <div className="rounded-xl2 overflow-hidden shadow-soft">
          <img
            src={offerProduct.image}
            alt="عرض طقم السفر"
            width="500"
            height="400"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
