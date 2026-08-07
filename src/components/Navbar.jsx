import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { openCart, selectCartCount } from "../features/cart/cartSlice";
import { SITE_CONTENT } from "../data/siteContent";

const NAV_LINKS = [
  { to: "/", label: SITE_CONTENT.nav.home },
  { to: "/products", label: SITE_CONTENT.nav.products },
  { to: "/services", label: SITE_CONTENT.nav.services },
  { to: "/contact", label: SITE_CONTENT.nav.contact },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartCount = useSelector(selectCartCount);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b shadow-sm bg-primary-50/90 backdrop-blur border-primary-100 md:bg-white/95 md:border-night-100">
      <div className="relative flex items-center justify-between h-16 gap-4 px-4 mx-auto max-w-7xl md:px-8">
        {/* زرار الهامبرجر — يظهر بس في الشاشات الصغيرة */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="relative z-20 flex items-center justify-center md:hidden w-9 h-9 text-night-600 hover:text-primary-600"
          aria-label="فتح القائمة"
        >
          <i className="text-lg fa-solid fa-bars" />
        </button>

        <div className="absolute inset-x-0 flex justify-center pointer-events-none md:hidden">
          <Link
            to="/"
            className="text-xl font-extrabold pointer-events-auto font-display text-primary-700"
          >
            {SITE_CONTENT.appName}
          </Link>
        </div>

        <Link
          to="/"
          className="hidden text-xl font-extrabold font-display text-primary-700 shrink-0 sm:inline-flex"
        >
          {SITE_CONTENT.appName}
        </Link>

        {/* قائمة سطح المكتب */}
        <nav className="items-center hidden gap-6 font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-night-600 hover:text-primary-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-night-600 hover:text-primary-700"
                }`
              }
            >
              {SITE_CONTENT.nav.orders}
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* أيقونة الأدمن */}
          <Link
            to="/admin-login"
            title={SITE_CONTENT.nav.adminPanel}
            className="flex items-center justify-center transition-colors rounded-full w-9 h-9 text-night-400 hover:text-primary-600 hover:bg-primary-50"
          >
            <i className="fa-solid fa-user-shield" />
          </Link>

          {/* السلة */}
          <button
            onClick={() => dispatch(openCart())}
            className="relative flex items-center justify-center transition-colors rounded-full w-9 h-9 text-night-500 hover:text-primary-600 hover:bg-primary-50"
            aria-label="فتح عربة التسوق"
          >
            <i className="fa-solid fa-cart-shopping" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-gold-400 text-primary-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="items-center hidden gap-2 sm:flex">
              <span className="hidden text-sm font-medium lg:inline text-night-700">
                أهلاً يا{" "}
                <span className="font-bold text-primary-700">{user?.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="btn-primary !px-4 !py-2 text-sm"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <div className="items-center hidden gap-2 sm:flex">
              <Link
                to="/login"
                className="btn-secondary !px-3 md:!px-4 !py-2 text-sm"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="btn-primary !px-3 md:!px-4 !py-2 text-sm hidden sm:inline-flex"
              >
                حساب جديد
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* خلفية معتمة عند فتح قائمة الموبايل */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-night-900/40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* القائمة الجانبية للموبايل */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[65vw] max-w-[260px] bg-primary-700 z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative flex items-center justify-center px-4 border-b h-14 border-white/10">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-lg font-extrabold text-white font-display"
          >
            {SITE_CONTENT.appName}
          </Link>
          <button
            onClick={closeMobileMenu}
            className="absolute text-xl right-4 text-white/80 hover:text-white"
            aria-label="إغلاق القائمة"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {isAuthenticated && (
          <div className="px-4 py-3 border-b border-white/10 bg-white/5">
            <p className="text-sm text-white/90">
              أهلاً يا{" "}
              <span className="font-bold text-white">{user?.name}</span>
            </p>
          </div>
        )}

        <nav className="flex flex-col flex-1 px-3 py-2 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block w-full rounded-3xl px-4 py-3 text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/orders"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block w-full rounded-3xl px-4 py-4 text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-white/80 border border-transparent hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {SITE_CONTENT.nav.orders}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="px-3 pt-4 pb-5 mt-auto">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-300 rounded-3xl bg-primary-600 hover:bg-primary-700"
            >
              تسجيل الخروج
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block w-full px-4 py-3 text-base font-semibold text-center transition-all duration-300 border rounded-3xl border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="block w-full px-4 py-3 mt-3 text-base font-semibold text-center text-white transition-all duration-300 rounded-3xl bg-primary-600 hover:bg-primary-700"
              >
                حساب جديد
              </Link>
            </>
          )}
        </div>
      </aside>
    </header>
  );
}
