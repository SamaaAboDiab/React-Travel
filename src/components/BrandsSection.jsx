import { SITE_CONTENT } from '../data/siteContent'

export default function BrandsSection() {
  const { brands } = SITE_CONTENT.home

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="mb-6 text-center">
        <h2 className="section-title">شركاؤنا</h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
        {brands.map((brand) => (
          <div
            key={brand.name}
            role="img"
            aria-label={brand.name}
            title={brand.name}
            className="w-28 h-14 md:w-32 md:h-16 rounded-md shadow-sm transition-all flex items-center justify-center bg-white"
            style={{
              display: 'inline-block',
              backgroundColor: '#000',
              WebkitMaskImage: `url(${brand.image})`,
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: '80% 80%',
              WebkitMaskPosition: 'center',
              maskImage: `url(${brand.image})`,
              maskRepeat: 'no-repeat',
              maskSize: '80% 80%',
              maskPosition: 'center',
            }}
          />
        ))}
      </div>
    </section>
  )
}
