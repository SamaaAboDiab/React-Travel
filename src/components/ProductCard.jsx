import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../features/cart/cartSlice";

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="fa-solid fa-star" />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <i
          key={i}
          className="fa-regular fa-star-half-stroke fa-flip-horizontal"
        />,
      );
    } else {
      stars.push(<i key={i} className="fa-regular fa-star" />);
    }
  }
  return (
    <div className="flex items-center gap-1 text-xs sm:text-sm text-gold-400">
      {stars}
    </div>
  );
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(openCart());
  };

  return (
    <div className="group overflow-hidden rounded-[1.75rem] border border-night-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex items-center justify-center overflow-hidden bg-primary-50/70 h-36 sm:h-52 rounded-t-[1.75rem] p-2.5 sm:p-4">
        {product.featured && (
          <span className="absolute z-10 inline-flex items-center gap-1 px-2 py-1 text-[10px] sm:text-[11px] font-bold rounded-full top-2 right-2 sm:top-3 sm:right-3 bg-gold-gradient text-primary-900 shadow-soft">
            ⭐ مميز
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
          className="object-contain max-w-full max-h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-t from-night-900/15 via-transparent to-transparent group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-1.5 sm:gap-2 p-2.5 sm:p-4">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-base font-semibold text-night-800 leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-1.5">
            <StarRating rating={product.rating} />
            <p className="text-sm font-bold sm:text-base text-primary-700 whitespace-nowrap">
              {product.price.toFixed(2)}{" "}
              <span className="text-[10px] sm:text-xs font-normal text-night-400">
                جنيه
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-primary w-full rounded-[1rem] py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition hover:bg-primary-800"
          type="button"
        >
          إضافة إلى العربة
        </button>
      </div>
    </div>
  );
}
