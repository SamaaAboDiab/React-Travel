import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearAuthError } from '../features/auth/authSlice'
import { SITE_CONTENT } from '../data/siteContent'

export default function Register() {
  const t = SITE_CONTENT.auth.register
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState(null)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalError(null)
    dispatch(clearAuthError())

    if (formData.password !== formData.confirmPassword) {
      setLocalError('كلمة المرور وتأكيدها غير متطابقين.')
      return
    }
    if (formData.password.length < 6) {
      setLocalError('كلمة المرور لازم تكون 6 حروف على الأقل.')
      return
    }

    const result = dispatch(registerUser(formData))
    if (result.success) {
      navigate('/')
    }
  }

  const displayError = localError || error

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-sand-50 to-ocean-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="inline-flex w-14 h-14 rounded-2xl bg-ocean-600 text-white items-center justify-center text-2xl mb-4">✈</span>
          <h1 className="text-2xl font-display font-bold text-night-900">{t.title}</h1>
          <p className="text-night-500 mt-2">{t.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          {displayError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {displayError}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-night-700 mb-2">{t.nameLabel}</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="مثال: أحمد محمد"
              className="input-field"
            />
          </div>

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
                {showPassword ? 'إخفاء' : 'إظهار'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-night-700 mb-2">{t.confirmPasswordLabel}</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              dir="ltr"
            />
          </div>

          <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
            {status === 'loading' ? t.submitLoading : t.submit}
          </button>

          <p className="text-center text-night-500 text-sm">
            {t.footerText}{' '}
            <Link to="/login" className="text-ocean-700 font-semibold hover:underline">
              {t.footerLink}
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
