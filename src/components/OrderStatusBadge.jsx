const STATUS_MAP = {
  pending: { label: 'قيد الانتظار', color: 'bg-amber-50 text-amber-600 border-amber-200', icon: 'fa-clock' },
  delivering: { label: 'قيد التوصيل', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: 'fa-truck' },
  approved: { label: 'مقبول', color: 'bg-green-50 text-green-600 border-green-200', icon: 'fa-circle-check' },
  rejected: { label: 'مرفوض', color: 'bg-red-50 text-red-600 border-red-200', icon: 'fa-circle-xmark' },
  return_requested: { label: 'طلب استرجاع قيد المراجعة', color: 'bg-purple-50 text-purple-600 border-purple-200', icon: 'fa-rotate-left' },
  returned: { label: 'مسترجع', color: 'bg-night-100 text-night-500 border-night-200', icon: 'fa-box-open' },
  return_rejected: { label: 'تم رفض الاسترجاع', color: 'bg-red-50 text-red-600 border-red-200', icon: 'fa-ban' },
}

export default function OrderStatusBadge({ status }) {
  const info = STATUS_MAP[status] || STATUS_MAP.pending
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${info.color}`}>
      <i className={`fa-solid ${info.icon}`} />
      {info.label}
    </span>
  )
}
