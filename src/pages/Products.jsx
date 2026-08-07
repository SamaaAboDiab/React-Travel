import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, getProductsByCategory } from "../data/products";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef(null);
  const dropdownListRef = useRef(null);
  const searchRef = useRef(null);

  const scrollDropdown = (direction) => {
    if (dropdownListRef.current) {
      dropdownListRef.current.scrollBy({
        top: direction === "up" ? -80 : 80,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== activeCategory) {
      setActiveCategory(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        !searchQuery
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  const handleSelectCategory = (id) => {
    setActiveCategory(id);
    setSearchParams(id === "all" ? {} : { category: id });
    setIsDropdownOpen(false);
  };

  const dropdownCategories = CATEGORIES.filter((c) => c.id !== "all");

  const filteredProducts = useMemo(() => {
    const byCategory = getProductsByCategory(activeCategory);
    if (!searchQuery.trim()) return byCategory;
    const q = searchQuery.trim().toLowerCase();
    return byCategory.filter((p) => p.name.toLowerCase().includes(q));
  }, [activeCategory, searchQuery]);

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label || "الكل";

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl md:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-extrabold md:text-3xl font-display text-primary-700">
          كل منتجات السفر
        </h1>
        {activeCategory !== "all" && (
          <p className="text-night-500">في قسم "{activeCategoryLabel}"</p>
        )}
      </div>

      {/* شريط الفلتر والبحث */}
      <div className="sticky z-30 w-full border-b top-16 bg-white/95 backdrop-blur-sm border-night-100">
        <div className="flex items-center justify-between gap-2 px-2 py-2 mx-auto max-w-7xl md:px-4">
          {/* أزرار الأقسام — يمين الشاشة */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSelectCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 ${
                activeCategory === "all"
                  ? "bg-hero-gradient text-white border-transparent shadow-soft"
                  : "bg-white text-night-600 border-night-200 hover:border-primary-400 hover:text-primary-700"
              }`}
            >
              الكل
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 ${
                  activeCategory !== "all"
                    ? "bg-hero-gradient text-white border-transparent shadow-soft"
                    : "bg-white text-night-600 border-night-200 hover:border-primary-400 hover:text-primary-700"
                }`}
              >
                {activeCategory !== "all" ? activeCategoryLabel : "الأقسام"}
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-40 w-56 mt-2 overflow-hidden bg-white border shadow-xl rounded-2xl border-night-100"
                >
                  {/* سهم لفوق */}
                  <button
                    type="button"
                    onClick={() => scrollDropdown("up")}
                    aria-label="اسكرول لفوق"
                    className="flex items-center justify-center w-full py-1 transition-colors border-b border-night-100 text-night-400 hover:text-primary-600 hover:bg-night-50"
                  >
                    <i className="text-xs fa-solid fa-chevron-up" />
                  </button>

                  <div
                    ref={dropdownListRef}
                    className="category-scroll max-h-60 overflow-y-auto scroll-smooth p-1.5"
                  >
                    {dropdownCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.id)}
                        className={`block w-full text-right px-3 py-2 rounded-xl text-sm transition-colors ${
                          activeCategory === cat.id
                            ? "bg-primary-50 text-primary-700 font-semibold"
                            : "text-night-600 hover:bg-night-50"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* سهم لتحت */}
                  <button
                    type="button"
                    onClick={() => scrollDropdown("down")}
                    aria-label="اسكرول لتحت"
                    className="flex items-center justify-center w-full py-1 transition-colors border-t border-night-100 text-night-400 hover:text-primary-600 hover:bg-night-50"
                  >
                    <i className="text-xs fa-solid fa-chevron-down" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* البحث — شمال الشاشة */}
          <div className="flex items-center" ref={searchRef}>
            {isSearchOpen ? (
              <div className="flex items-center gap-1.5 rounded-full border border-night-200 bg-white px-3 py-1.5">
                <i className="text-sm fa-solid fa-magnifying-glass text-night-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  className="text-xs bg-transparent outline-none w-28 sm:w-48 placeholder:text-night-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                    aria-label="مسح البحث"
                    className="text-night-400 hover:text-night-600"
                  >
                    <i className="text-xs fa-solid fa-xmark" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="بحث عن المنتجات"
                className="flex items-center justify-center transition-colors bg-white border rounded-full w-9 h-9 border-night-200 text-night-500 hover:border-primary-400 hover:text-primary-700"
              >
                <i className="text-sm fa-solid fa-magnifying-glass" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* شبكة المنتجات */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-3xl rounded-full bg-primary-50 text-primary-300">
            <i className="fa-solid fa-box-open" />
          </div>
          <p className="text-night-500">مفيش منتجات في القسم ده حاليًا</p>
        </div>
      )}
    </div>
  );
}
