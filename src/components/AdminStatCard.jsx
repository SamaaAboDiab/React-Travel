export default function AdminStatCard({ icon, number, label }) {
  return (
    <div className="bg-white rounded-xl2 p-5 shadow-card border border-night-100 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl shrink-0">
        <i className={`fa-solid ${icon}`} />
      </div>
      <div>
        <p className="text-2xl font-display font-extrabold text-night-800">{number}</p>
        <p className="text-night-500 text-xs">{label}</p>
      </div>
    </div>
  )
}
