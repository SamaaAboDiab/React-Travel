import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../features/admin/adminAuthSlice'
import { updateOrderStatus } from '../features/orders/ordersSlice'
import {
  acceptMessage,
  rejectMessage,
  deleteMessage,
} from '../features/messages/messagesSlice'
import { approveReview, rejectReview } from '../features/reviews/reviewsSlice'
import AdminStatCard from '../components/AdminStatCard'
import AdminOrderCard from '../components/AdminOrderCard'

const TABS = [
  { id: 'pending', label: 'المعلقة', icon: 'fa-clock' },
  { id: 'delivering', label: 'قيد التوصيل', icon: 'fa-truck' },
  { id: 'approved', label: 'المقبولة', icon: 'fa-circle-check' },
  { id: 'rejected', label: 'المرفوضة', icon: 'fa-circle-xmark' },
  { id: 'returns', label: 'طلبات الاسترجاع', icon: 'fa-rotate-left' },
  { id: 'contact', label: 'الرسائل والتعليقات', icon: 'fa-envelope' },
  { id: 'history', label: 'السجل الكامل', icon: 'fa-clock-rotate-left' },
]

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orders = useSelector((state) => state.orders.items)
  const messages = useSelector((state) => state.messages.items)
  const reviews = useSelector((state) => state.reviews.items)

  const [activeTab, setActiveTab] = useState('pending')
  const [toast, setToast] = useState(null)

  const showToast = (text) => {
    setToast(text)
    setTimeout(() => setToast(null), 2200)
  }

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === 'pending').length
    const delivering = orders.filter((o) => o.status === 'delivering').length
    const approved = orders.filter((o) => o.status === 'approved').length
    const rejected = orders.filter((o) => o.status === 'rejected').length
    const returned = orders.filter((o) => o.status === 'returned').length
    const revenue = orders
      .filter((o) => o.status === 'approved' || o.status === 'returned')
      .reduce((sum, o) => sum + o.total, 0)
    return { pending, delivering, approved, rejected, returned, revenue }
  }, [orders])

  const handleLogout = () => {
    dispatch(adminLogout())
    navigate('/admin-login')
  }

  const handleStatusChange = (orderId, status, message) => {
    dispatch(updateOrderStatus({ orderId, status }))
    showToast(message)
  }

  const handleExportOrders = () => {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orders-export.json'
    a.click()
    URL.revokeObjectURL(url)
    showToast('تم تصدير بيانات الطلبات')
  }

  const handleExportMessages = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'messages-export.json'
    a.click()
    URL.revokeObjectURL(url)
    showToast('تم تصدير الرسائل')
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending')
  const deliveringOrders = orders.filter((o) => o.status === 'delivering')
  const approvedOrders = orders.filter((o) => o.status === 'approved')
  const rejectedOrders = orders.filter((o) => o.status === 'rejected')
  const returnRequests = orders.filter((o) => o.status === 'return_requested')
  const pendingMessages = messages.filter((m) => m.status === 'pending')
  const pendingReviews = reviews.filter((r) => r.status === 'pending')

  return (
    <div className="bg-primary-50/40 min-h-[calc(100vh-4rem)]">
      {/* بادچ الأدمن */}
      <div className="bg-primary-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold-gradient text-primary-900 flex items-center justify-center">
              <i className="fa-solid fa-crown" />
            </div>
            <div>
              <p className="font-display font-bold">لوحة التحكم</p>
              <p className="text-primary-200 text-xs">Admin</p>
            </div>
          </div>
          <h1 className="text-lg font-display font-bold flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping" /> لوحة تحكم الأدمن
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* الإحصائيات */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <AdminStatCard icon="fa-clock" number={stats.pending} label="طلبات معلقة" />
          <AdminStatCard icon="fa-truck" number={stats.delivering} label="قيد التوصيل" />
          <AdminStatCard icon="fa-circle-check" number={stats.approved} label="طلبات مقبولة" />
          <AdminStatCard icon="fa-circle-xmark" number={stats.rejected} label="طلبات مرفوضة" />
          <AdminStatCard icon="fa-rotate-left" number={stats.returned} label="طلبات مسترجعة" />
          <AdminStatCard icon="fa-dollar-sign" number={`${stats.revenue.toFixed(0)}`} label="إجمالي الإيرادات" />
        </div>

        {/* شريط الأدوات */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl2 p-4 shadow-card mb-6">
          <p className="font-display font-bold text-primary-700 flex items-center gap-2">
            <i className="fa-solid fa-gauge-high" /> إدارة الطلبات والرسائل
          </p>
          <div className="flex gap-2">
            <button onClick={handleExportOrders} className="btn-secondary !px-4 !py-2 text-sm">
              <i className="fa-solid fa-file-arrow-down" /> تصدير الطلبات
            </button>
            <button onClick={handleExportMessages} className="btn-secondary !px-4 !py-2 text-sm">
              <i className="fa-solid fa-envelope-open-text" /> تصدير الرسائل
            </button>
          </div>
        </div>

        {/* التابات */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab) => {
            const badgeCount =
              tab.id === 'pending' ? pendingOrders.length
              : tab.id === 'delivering' ? deliveringOrders.length
              : tab.id === 'approved' ? approvedOrders.length
              : tab.id === 'rejected' ? rejectedOrders.length
              : tab.id === 'returns' ? returnRequests.length
              : tab.id === 'contact' ? pendingMessages.length + pendingReviews.length
              : null

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-hero-gradient text-white border-transparent shadow-soft'
                    : 'bg-white text-night-600 border-night-200 hover:border-primary-400'
                }`}
              >
                <i className={`fa-solid ${tab.icon}`} />
                {tab.label}
                {!!badgeCount && (
                  <span className="bg-gold-400 text-primary-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {badgeCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* محتوى التابات */}
        <div className="space-y-4">
          {activeTab === 'pending' && (
            <TabOrders
              orders={pendingOrders}
              emptyText="مفيش طلبات معلقة حاليًا"
              renderActions={(order) => (
                <>
                  <button
                    onClick={() => handleStatusChange(order.id, 'delivering', 'تم تحويل الطلب لقيد التوصيل')}
                    className="btn-secondary !px-3 !py-1.5 text-xs"
                  >
                    <i className="fa-solid fa-truck" /> قيد التوصيل
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, 'approved', 'تم قبول الطلب')}
                    className="btn-primary !px-3 !py-1.5 text-xs"
                  >
                    <i className="fa-solid fa-check" /> قبول
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, 'rejected', 'تم رفض الطلب')}
                    className="!px-3 !py-1.5 text-xs rounded-xl border-2 border-red-400 text-red-500 font-semibold hover:bg-red-50"
                  >
                    <i className="fa-solid fa-xmark" /> رفض
                  </button>
                </>
              )}
            />
          )}

          {activeTab === 'delivering' && (
            <TabOrders
              orders={deliveringOrders}
              emptyText="مفيش طلبات قيد التوصيل حاليًا"
              renderActions={(order) => (
                <>
                  <button
                    onClick={() => handleStatusChange(order.id, 'approved', 'تم قبول الطلب وتسليمه')}
                    className="btn-primary !px-3 !py-1.5 text-xs"
                  >
                    <i className="fa-solid fa-check" /> تم التسليم / قبول
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, 'rejected', 'تم رفض الطلب')}
                    className="!px-3 !py-1.5 text-xs rounded-xl border-2 border-red-400 text-red-500 font-semibold hover:bg-red-50"
                  >
                    <i className="fa-solid fa-xmark" /> رفض
                  </button>
                </>
              )}
            />
          )}

          {activeTab === 'approved' && (
            <TabOrders orders={approvedOrders} emptyText="مفيش طلبات مقبولة حاليًا" />
          )}

          {activeTab === 'rejected' && (
            <TabOrders orders={rejectedOrders} emptyText="مفيش طلبات مرفوضة حاليًا" />
          )}

          {activeTab === 'returns' && (
            <TabOrders
              orders={returnRequests}
              emptyText="مفيش طلبات استرجاع حاليًا"
              renderActions={(order) => (
                <>
                  <button
                    onClick={() => handleStatusChange(order.id, 'returned', 'تم قبول طلب الاسترجاع')}
                    className="btn-primary !px-3 !py-1.5 text-xs"
                  >
                    <i className="fa-solid fa-check" /> قبول الاسترجاع
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, 'return_rejected', 'تم رفض طلب الاسترجاع')}
                    className="!px-3 !py-1.5 text-xs rounded-xl border-2 border-red-400 text-red-500 font-semibold hover:bg-red-50"
                  >
                    <i className="fa-solid fa-xmark" /> رفض الاسترجاع
                  </button>
                </>
              )}
            />
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8">
              {/* الرسائل */}
              <div>
                <h3 className="font-display font-bold text-primary-700 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-envelope" /> الرسائل الواردة ({messages.length})
                </h3>
                {messages.length === 0 ? (
                  <EmptyState text="مفيش رسائل واردة حاليًا" />
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="card p-5">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-night-700 text-sm">
                            {msg.firstName} {msg.lastName}
                          </p>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              msg.status === 'accepted'
                                ? 'bg-green-50 text-green-600'
                                : msg.status === 'rejected'
                                ? 'bg-red-50 text-red-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {msg.status === 'accepted' ? 'مقبولة' : msg.status === 'rejected' ? 'مرفوضة' : 'قيد المراجعة'}
                          </span>
                        </div>
                        <p className="text-xs text-night-400 mb-2" dir="ltr">{msg.email} · {msg.phone}</p>
                        <p className="text-night-600 text-sm leading-relaxed mb-3">{msg.text}</p>
                        <div className="flex gap-2 flex-wrap">
                          {msg.status !== 'accepted' && (
                            <button
                              onClick={() => { dispatch(acceptMessage(msg.id)); showToast('تم قبول الرسالة') }}
                              className="btn-primary !px-3 !py-1.5 text-xs"
                            >
                              قبول
                            </button>
                          )}
                          {msg.status !== 'rejected' && (
                            <button
                              onClick={() => { dispatch(rejectMessage(msg.id)); showToast('تم رفض الرسالة') }}
                              className="!px-3 !py-1.5 text-xs rounded-xl border-2 border-red-400 text-red-500 font-semibold hover:bg-red-50"
                            >
                              رفض
                            </button>
                          )}
                          <button
                            onClick={() => { dispatch(deleteMessage(msg.id)); showToast('تم حذف الرسالة') }}
                            className="!px-3 !py-1.5 text-xs rounded-xl border-2 border-night-200 text-night-500 font-semibold hover:bg-night-50"
                          >
                            <i className="fa-solid fa-trash" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* التعليقات المعلقة */}
              <div>
                <h3 className="font-display font-bold text-primary-700 mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-comment-dots" /> تعليقات بانتظار الموافقة ({pendingReviews.length})
                </h3>
                {pendingReviews.length === 0 ? (
                  <EmptyState text="مفيش تعليقات معلقة حاليًا" />
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {pendingReviews.map((review) => (
                      <div key={review.id} className="card p-5">
                        <div className="flex items-center gap-1 text-gold-400 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <i key={s} className={s <= review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
                          ))}
                        </div>
                        <p className="text-night-600 text-sm leading-relaxed mb-2">"{review.text}"</p>
                        <p className="font-semibold text-primary-700 text-sm">{review.name}</p>
                        {review.productName && (
                          <p className="text-night-400 text-xs mb-3">عن منتج: {review.productName}</p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => { dispatch(approveReview(review.id)); showToast('تم نشر التعليق') }}
                            className="btn-primary !px-3 !py-1.5 text-xs"
                          >
                            قبول ونشر
                          </button>
                          <button
                            onClick={() => { dispatch(rejectReview(review.id)); showToast('تم حذف التعليق') }}
                            className="!px-3 !py-1.5 text-xs rounded-xl border-2 border-red-400 text-red-500 font-semibold hover:bg-red-50"
                          >
                            رفض وحذف
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <TabOrders orders={orders} emptyText="مفيش أي طلبات في السجل" />
          )}
        </div>
      </div>

      {/* شريط العودة السفلي */}
      <div className="bg-white border-t border-night-100 py-4 sticky bottom-0 flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8">
        <Link to="/" className="text-night-500 hover:text-primary-600 text-sm flex items-center gap-1.5">
          <i className="fa-solid fa-arrow-right" /> العودة للمتجر
        </Link>
        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1.5 font-semibold">
          <i className="fa-solid fa-right-from-bracket" /> تسجيل الخروج
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-20 right-6 bg-primary-900 text-white px-5 py-3 rounded-xl shadow-soft z-50 text-sm">
          {toast}
        </div>
      )}
    </div>
  )
}

function TabOrders({ orders, emptyText, renderActions }) {
  if (orders.length === 0) return <EmptyState text={emptyText} />
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {orders.map((order) => (
        <AdminOrderCard key={order.id} order={order} actions={renderActions ? renderActions(order) : null} />
      ))}
    </div>
  )
}

function EmptyState({ text }) {
  return (
    <div className="text-center py-14 bg-white rounded-xl2 border border-night-100">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-2xl text-primary-300 mx-auto mb-3">
        <i className="fa-solid fa-inbox" />
      </div>
      <p className="text-night-500 text-sm">{text}</p>
    </div>
  )
}
