import OrderStatusBadge from './OrderStatusBadge'

export default function AdminOrderCard({ order, actions }) {
  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-night-100">
        <div>
          <p className="text-xs text-night-400">رقم الطلب</p>
          <p className="font-semibold text-night-700 text-sm" dir="ltr">{order.id}</p>
        </div>
        <div>
          <p className="text-xs text-night-400">العميل</p>
          <p className="font-medium text-night-600 text-sm">{order.userName}</p>
        </div>
        <div>
          <p className="text-xs text-night-400">التاريخ</p>
          <p className="font-medium text-night-600 text-sm">
            {new Date(order.createdAt).toLocaleDateString('ar-EG')}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="space-y-2 mb-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-sm">
            <img
              src={item.image}
              alt={item.name}
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <p className="flex-1 min-w-0 line-clamp-1 text-night-700">{item.name}</p>
            <span className="text-night-400 text-xs shrink-0">× {item.quantity}</span>
          </div>
        ))}
      </div>

      {order.shippingInfo && (
        <div className="text-xs text-night-500 bg-primary-50/50 rounded-lg p-3 mb-3 space-y-1">
          <p><i className="fa-solid fa-phone ml-1" /> {order.shippingInfo.phone}</p>
          <p><i className="fa-solid fa-location-dot ml-1" /> {order.shippingInfo.city} - {order.shippingInfo.address}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-night-100">
        <p className="font-bold text-primary-700">{order.total.toFixed(2)} جنيه</p>
        {actions && <div className="flex gap-2 flex-wrap justify-end">{actions}</div>}
      </div>
    </div>
  )
}
