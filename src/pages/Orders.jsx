import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { deleteOrder, requestReturn, selectOrdersByUser } from '../features/orders/ordersSlice'
import OrderStatusBadge from '../components/OrderStatusBadge'

export default function Orders() {
  const { user } = useSelector((state) => state.auth)
  const orders = useSelector(selectOrdersByUser(user?.id))
  const dispatch = useDispatch()
  const [toast, setToast] = useState(null)

  const showToast = (text) => {
    setToast(text)
    setTimeout(() => setToast(null), 2500)
  }

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId))
    showToast('تم حذف الطلب بنجاح')
  }

  const handleReturn = (orderId) => {
    dispatch(requestReturn(orderId))
    showToast('تم إرسال طلب الاسترجاع، هيتم مراجعته من الإدارة')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-14">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-primary-700 mb-2">📦 طلباتي</h1>
        <p className="text-night-500">أهلاً {user?.name}، هنا هتلاقي كل طلباتك وحالتها</p>
      </div>

      {orders.length === 0 ? (
        <div className="card text-center py-16 px-6">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center text-3xl text-primary-300 mx-auto mb-4">
            <i className="fa-solid fa-box-open" />
          </div>
          <h2 className="font-bold text-night-700 mb-1">لسه معملتش أي طلب</h2>
          <p className="text-night-500 text-sm mb-6">تصفح منتجاتنا وابدأ رحلتك معانا دلوقتي</p>
          <Link to="/products" className="btn-primary !inline-flex">
            إستكشف المنتجات
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-night-100">
                <div>
                  <p className="text-xs text-night-400">رقم الطلب</p>
                  <p className="font-semibold text-night-700 text-sm" dir="ltr">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-night-400">تاريخ الطلب</p>
                  <p className="font-medium text-night-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
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
                      <p className="text-sm text-night-700 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-night-400">الكمية: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary-700">
                      {(item.price * item.quantity).toFixed(2)} جنيه
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-night-100">
                <p className="font-bold text-night-700">
                  الإجمالي: <span className="text-primary-700">{order.total.toFixed(2)} جنيه</span>
                </p>

                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-700 flex items-center gap-1.5 px-3 py-2"
                    >
                      <i className="fa-solid fa-trash" /> حذف الطلب
                    </button>
                  )}

                  {order.status === 'approved' && (
                    <button
                      onClick={() => handleReturn(order.id)}
                      className="btn-secondary !px-4 !py-2 text-sm"
                    >
                      <i className="fa-solid fa-rotate-left" /> طلب استرجاع
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary-900 text-white px-5 py-3 rounded-xl shadow-soft z-50 text-sm">
          {toast}
        </div>
      )}
    </div>
  )
}
