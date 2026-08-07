const LABELS = {
  0: 'اختر عدد النجوم',
  1: 'سيئ',
  2: 'مقبول',
  3: 'جيد',
  4: 'جيد جدًا',
  5: 'ممتاز',
}

export default function StarPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 text-2xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`${star} ${star === 1 ? 'نجمة' : 'نجوم'}`}
            aria-pressed={star <= value}
            className={star <= value ? 'text-gold-400' : 'text-night-200 hover:text-gold-200'}
          >
            <i className={star <= value ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
          </button>
        ))}
      </div>
      <span className="text-sm text-night-500">{LABELS[value]}</span>
    </div>
  )
}
