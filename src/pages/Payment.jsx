import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, selectCartTotal } from '../features/cart/cartSlice'
import { createOrder } from '../features/orders/ordersSlice'

const INITIAL_SHIPPING = { fullName: '', phone: '', address: '', city: '' }

export default function Payment() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)
  const total = useSelector(selectCartTotal)

  const [shipping, setShipping] = useState({ ...INITIAL_SHIPPING, fullName: user?.name || '' })
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' })
  const [error, setError] = useState(null)

  const handleShippingChange = (e) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCardChange = (e) => {
    setCardData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!shipping.fullName.trim() || !shipping.phone.trim() || !shipping.address.trim() || !shipping.city.trim()) {
      setError('من فضلك أكمل كل بيانات الشحن.')
      return
    }
    if (paymentMethod === 'card') {
      if (!cardData.number.trim() || !cardData.expiry.trim() || !cardData.cvv.trim()) {
        setError('من فضلك أكمل بيانات الكارت.')
        return
      }
    }

    dispatch(
      createOrder({
        userId: user.id,
        userName: user.name,
        items,
        total,
        shippingInfo: { ...shipping, paymentMethod },
      })
    )
    dispatch(clearCart())
    navigate('/orders')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center text-3xl text-primary-300 mx-auto mb-4">
          <i className="fa-solid fa-cart-shopping" />
        </div>
        <h2 className="font-bold text-night-700 mb-2">عربة التسوق فارغة</h2>
        <p className="text-night-500 mb-6">مفيش منتجات لإتمام عملية الدفع</p>
        <Link to="/products" className="btn-primary !inline-flex">
          إستكشف المنتجات
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
      <h1 className="text-2xl md:text-3xl font-display font-extrabold text-primary-700 mb-8">
        إتمام عملية الدفع
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* بيانات الشحن والدفع */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div className="card p-6 md:p-7">
            <h2 className="font-display font-bold text-primary-700 mb-5 flex items-center gap-2">
              <i className="fa-solid fa-truck" /> بيانات الشحن
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-night-700 mb-2">الاسم بالكامل</label>
                <input
                  type="text"
                  name="fullName"
                  value={shipping.fullName}
                  onChange={handleShippingChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-night-700 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={shipping.phone}
                  onChange={handleShippingChange}
                  placeholder="01234567890"
                  className="input-field"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-night-700 mb-2">المدينة</label>
                <input
                  type="text"
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  placeholder="مثال: كفر الشيخ"
                  className="input-field"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-night-700 mb-2">العنوان بالتفصيل</label>
                <textarea
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  rows={3}
                  placeholder="الشارع، المنطقة، علامة مميزة..."
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>

          <div className="card p-6 md:p-7">
            <h2 className="font-display font-bold text-primary-700 mb-5 flex items-center gap-2">
              <i className="fa-solid fa-credit-card" /> طريقة الدفع
            </h2>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 text-right transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-night-200 hover:border-primary-300'
                }`}
              >
                <i className="fa-solid fa-money-bill-wave text-xl text-primary-600" />
                <span className="font-semibold text-night-700 text-sm">الدفع عند الاستلام</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 text-right transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-night-200 hover:border-primary-300'
                }`}
              >
                <i className="fa-solid fa-credit-card text-xl text-primary-600" />
                <span className="font-semibold text-night-700 text-sm">بطاقة ائتمان</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-night-100">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-night-700 mb-2">رقم البطاقة</label>
                  <input
                    type="text"
                    name="number"
                    value={cardData.number}
                    onChange={handleCardChange}
                    placeholder="0000 0000 0000 0000"
                    className="input-field"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-night-700 mb-2">تاريخ الانتهاء</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    className="input-field"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-night-700 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    className="input-field"
                    dir="ltr"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ملخص الطلب */}
        <div className="card p-6 md:p-7 h-fit sticky top-24">
          <h2 className="font-display font-bold text-primary-700 mb-5">ملخص الطلب</h2>
          <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-night-700 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-night-400">الكمية: {item.quantity}</p>
                </div>
                <p className="text-xs font-semibold text-primary-700 shrink-0">
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-night-500 pt-4 border-t border-night-100">
            <span>عدد المنتجات</span>
            <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-night-500 mt-2">
            <span>الشحن</span>
            <span className="text-green-600 font-semibold">مجاني</span>
          </div>
          <div className="flex items-center justify-between font-bold text-night-700 text-lg mt-3 pt-3 border-t border-night-100">
            <span>الإجمالي</span>
            <span className="text-primary-700">{total.toFixed(2)} جنيه</span>
          </div>

          <button type="submit" className="btn-primary w-full mt-6">
            <i className="fa-solid fa-lock" />
            تأكيد الطلب والدفع
          </button>
        </div>
      </form>
    </div>
  )
}
