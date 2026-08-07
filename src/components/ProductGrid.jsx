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
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="section-title">{title}</h2>
        {actionLabel && actionHref && (
          <Link to={actionHref} className="text-sm btn-secondary">
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
