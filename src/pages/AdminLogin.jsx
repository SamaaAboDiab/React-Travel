import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin, clearAdminError } from '../features/admin/adminAuthSlice'
import { SITE_CONTENT } from '../data/siteContent'

export default function AdminLogin() {
  const t = SITE_CONTENT.auth.adminLogin
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state) => state.adminAuth)

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(clearAdminError())
    const result = dispatch(loginAdmin(username, password))
    if (result.success) {
      navigate('/admin-dashboard')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-primary-900 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* بادچ الأدمن الثابت */}
      <div className="absolute top-6 right-6 flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 text-white">
        <div className="w-10 h-10 rounded-xl bg-gold-gradient text-primary-900 flex items-center justify-center">
          <i className="fa-solid fa-crown" />
        </div>
        <div className="text-sm leading-tight">
          <p className="font-bold">لوحة التحكم</p>
          <p className="text-primary-200 text-xs">Administrator</p>
        </div>
      </div>

      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-gold-400/10" />

      <div className="relative w-full max-w-md bg-white rounded-xl2 shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-hero-gradient text-white flex items-center justify-center text-2xl mx-auto mb-4">
            <i className="fa-solid fa-user-shield" />
          </div>
          <h1 className="text-xl font-display font-extrabold text-night-800">{t.title}</h1>
          <p className="text-night-500 text-sm mt-2">{t.description}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-night-700 mb-2">{t.usernameLabel}</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="input-field pl-11"
                autoComplete="off"
                dir="ltr"
              />
              <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-night-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-night-700 mb-2">{t.passwordLabel}</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="input-field pl-11"
                dir="ltr"
              />
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-night-400" />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            <i className="fa-solid fa-right-to-bracket" />
            {t.submit}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-night-400 hover:text-primary-600 text-sm inline-flex items-center gap-1.5">
            <i className="fa-solid fa-arrow-right" />
            {t.backLink}
          </Link>
        </div>
      </div>
    </div>
  )
}
