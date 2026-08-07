import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  selectCartTotal,
} from '../features/cart/cartSlice'
import { SITE_CONTENT } from '../data/siteContent'

export default function CartDrawer() {
  const t = SITE_CONTENT.cart
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state) => state.cart)
  const total = useSelector(selectCartTotal)

  return (
    <>
      {/* خلفية معتمة عند فتح السلة */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-night-900/40 z-40 transition-opacity"
          onClick={() => dispatch(closeCart())}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-night-100">
          <h2 className="text-lg font-display font-bold text-primary-700">{t.title}</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-night-400 hover:text-primary-600 text-xl"
            aria-label="إغلاق السلة"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center text-3xl text-primary-300">
                <i className="fa-solid fa-cart-shopping" />
              </div>
              <p className="text-night-500">{t.empty}</p>
              <Link
                to="/products"
                onClick={() => dispatch(closeCart())}
                className="btn-primary !px-5 !py-2.5 text-sm"
              >
                {t.explore}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-night-100 pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-night-700 line-clamp-2">{item.name}</p>
                    <p className="text-primary-700 font-bold text-sm mt-1">
                      {item.price.toFixed(2)} جنيه
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="w-6 h-6 rounded-full border border-night-200 flex items-center justify-center text-night-500 hover:bg-night-50"
                        aria-label={`تقليل كمية ${item.name}`}
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="w-6 h-6 rounded-full border border-night-200 flex items-center justify-center text-night-500 hover:bg-night-50"
                        aria-label={`زيادة كمية ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="mr-auto text-red-400 hover:text-red-600 text-sm"
                        aria-label={`إزالة ${item.name} من السلة`}
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-night-100 space-y-3">
            <div className="flex items-center justify-between text-night-700 font-semibold">
              <span>{t.total}</span>
              <span className="text-primary-700 text-lg">{total.toFixed(2)} جنية</span>
            </div>
            <Link
              to="/payment"
              onClick={() => dispatch(closeCart())}
              className="btn-primary w-full block text-center"
            >
              {t.checkout}
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
