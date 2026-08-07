export default function ReviewCard({ review }) {
  return (
    <div className="flex flex-col h-full gap-3 p-6 card">
      <div className="flex items-center gap-1 text-gold-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <i key={star} className={star <= review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-night-900">"{review.text}"</p>
      <div className="pt-3 border-t border-night-100">
        <p className="text-sm font-semibold text-primary-900">{review.name}</p>
        {review.productName && (
          <p className="text-night-400 text-xs mt-0.5">عن منتج: {review.productName}</p>
        )}
      </div>
    </div>
  )
}
