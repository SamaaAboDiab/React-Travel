import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearAuthError } from '../features/auth/authSlice'
import { SITE_CONTENT } from '../data/siteContent'

export default function Login() {
  const t = SITE_CONTENT.auth.login
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { status, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearAuthError())
    const result = dispatch(loginUser(formData))
    if (result.success) {
      const redirectTo = location.state?.from?.pathname || '/'
      navigate(redirectTo)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-sand-50 to-ocean-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="inline-flex w-14 h-14 rounded-2xl bg-ocean-600 text-white items-center justify-center text-2xl mb-4">✈</span>
          <h1 className="text-2xl font-display font-bold text-night-900">{t.title}</h1>
          <p className="text-night-500 mt-2">{t.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-night-700 mb-2">{t.emailLabel}</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="input-field"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-night-700 mb-2">{t.passwordLabel}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field pl-12"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-night-400 hover:text-ocean-600 text-sm font-medium"
              >
                {showPassword ? t.hidePassword : t.showPassword}
              </button>
            </div>
          </div>

          <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
            {status === 'loading' ? t.submitLoading : t.submit}
          </button>

          <p className="text-center text-night-500 text-sm">
            {t.footerText}{' '}
            <Link to="/register" className="text-ocean-700 font-semibold hover:underline">
              {t.footerLink}
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
