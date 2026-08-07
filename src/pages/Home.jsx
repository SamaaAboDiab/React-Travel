import Hero from '../components/Hero'
import CategoriesSlider from '../components/CategoriesSlider'
import ProductGrid from '../components/ProductGrid'
import OfferSection from '../components/OfferSection'
import BrandsSection from '../components/BrandsSection'
import { getHomeFeaturedProducts, getHomeLatestProducts } from '../data/products'

export default function Home() {
  // نفس المنتجات بالظبط اللي كانت ظاهرة في index.html الأصلي (1-4 مميزة، 5-12 أحدث)
  const featuredProducts = getHomeFeaturedProducts()
  const latestProducts = getHomeLatestProducts()

  return (
    <div>
      <Hero />
      <CategoriesSlider />
      <ProductGrid id="features" title="أساسيات السفر المميزة" products={featuredProducts} actionLabel="عرض الكل" actionHref="/products" />
      <ProductGrid id="latest" title="أحدث مستلزمات الرحلات" products={latestProducts} actionLabel="عرض الكل" actionHref="/products" />
      <OfferSection />
      <BrandsSection />
    </div>
  )
}
