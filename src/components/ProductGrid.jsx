import ProductCard from "./ProductCard";

import { Link } from "react-router-dom";

export default function ProductGrid({
  id,
  title,
  products,
  actionLabel,
  actionHref,
}) {
  return (
    <section id={id} className="px-4 py-10 mx-auto max-w-7xl md:px-8">
      <div className="flex items-center justify-between gap-1.5 mb-6 sm:gap-4">
        <h2 className="min-w-0 text-lg section-title sm:text-2xl md:text-3xl">
          {title}
        </h2>
        {actionLabel && actionHref && (
          <Link
            to={actionHref}
            className="btn-secondary shrink-0 grow-0 basis-auto !whitespace-nowrap !gap-1 !px-2.5 !py-1 text-[10px] leading-none sm:!px-6 sm:!py-3 sm:text-sm sm:!gap-2"
          >
            {actionLabel}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
