export default function ReviewCard({ review }) {
  return (
    <div className="card p-6 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-1 text-gold-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <i key={star} className={star <= review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
        ))}
      </div>
      <p className="text-night-600 text-sm leading-relaxed flex-1">"{review.text}"</p>
      <div className="pt-3 border-t border-night-100">
        <p className="font-semibold text-primary-700 text-sm">{review.name}</p>
        {review.productName && (
          <p className="text-night-400 text-xs mt-0.5">عن منتج: {review.productName}</p>
        )}
      </div>
    </div>
  )
}
