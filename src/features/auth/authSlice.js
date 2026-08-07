import { createSlice } from '@reduxjs/toolkit'
import {
  addStoredUser,
  findUserByEmail,
  saveStoredSession,
  clearStoredSession,
  getStoredSession,
} from '../../utils/localStorage'

// نجيب الجلسة المحفوظة (لو موجودة) عشان لو المستخدم عمل Refresh
// يفضل مسجل دخول من غير ما يضطر يعمل Login تاني
const existingSession = getStoredSession()

const initialState = {
  user: existingSession || null, // { id, name, email }
  isAuthenticated: !!existingSession,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ---------- تسجيل حساب جديد ----------
    registerStart(state) {
      state.status = 'loading'
      state.error = null
    },
    registerSuccess(state, action) {
      state.status = 'succeeded'
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    registerFailure(state, action) {
      state.status = 'failed'
      state.error = action.payload
    },

    // ---------- تسجيل الدخول ----------
    loginStart(state) {
      state.status = 'loading'
      state.error = null
    },
    loginSuccess(state, action) {
      state.status = 'succeeded'
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    loginFailure(state, action) {
      state.status = 'failed'
      state.error = action.payload
    },

    // ---------- تسجيل الخروج ----------
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
      clearStoredSession()
    },

    clearAuthError(state) {
      state.error = null
    },
  },
})

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError,
} = authSlice.actions

export default authSlice.reducer

// ---------------------------------------------
// Thunks بسيطة (Async Actions) بتتعامل مع LocalStorage
// بدل ما تتعامل مع API حقيقي دلوقتي
// ---------------------------------------------

export const registerUser = (formData) => (dispatch) => {
  dispatch(registerStart())

  const { name, email, password } = formData

  // تحقق بسيط: هل البريد مستخدم قبل كده؟
  const existing = findUserByEmail(email)
  if (existing) {
    dispatch(registerFailure('البريد الإلكتروني مستخدم بالفعل، جرّب تسجيل الدخول.'))
    return { success: false }
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // ملاحظة: في مشروع حقيقي لازم الباسورد يتشفّر في الباك إند، ده مؤقت فقط
    createdAt: new Date().toISOString(),
  }

  addStoredUser(newUser)

  // منخزنش الباسورد في الجلسة النشطة
  const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email }
  saveStoredSession(sessionUser)
  dispatch(registerSuccess(sessionUser))
  return { success: true }
}

export const loginUser = (formData) => (dispatch) => {
  dispatch(loginStart())

  const { email, password } = formData
  const user = findUserByEmail(email)

  if (!user || user.password !== password) {
    dispatch(loginFailure('البريد الإلكتروني أو كلمة المرور غير صحيحة.'))
    return { success: false }
  }

  const sessionUser = { id: user.id, name: user.name, email: user.email }
  saveStoredSession(sessionUser)
  dispatch(loginSuccess(sessionUser))
  return { success: true }
}
