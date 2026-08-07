import { createSlice } from '@reduxjs/toolkit'

const ADMIN_SESSION_KEY = 'traveler_admin_session'

// بيانات دخول مؤقتة (Placeholder) — لازم تتغير وتتحط في سيرفر حقيقي لما نضيف باك إند
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
}

const loadAdminSession = () => {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true'
  } catch (err) {
    console.error('خطأ في قراءة جلسة الأدمن من LocalStorage', err)
    return false
  }
}

const initialState = {
  isAdminAuthenticated: loadAdminSession(),
  error: null,
}

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLoginSuccess(state) {
      state.isAdminAuthenticated = true
      state.error = null
      localStorage.setItem(ADMIN_SESSION_KEY, 'true')
    },
    adminLoginFailure(state, action) {
      state.isAdminAuthenticated = false
      state.error = action.payload
    },
    adminLogout(state) {
      state.isAdminAuthenticated = false
      state.error = null
      localStorage.removeItem(ADMIN_SESSION_KEY)
    },
    clearAdminError(state) {
      state.error = null
    },
  },
})

export const { adminLoginSuccess, adminLoginFailure, adminLogout, clearAdminError } =
  adminAuthSlice.actions
export default adminAuthSlice.reducer

export const loginAdmin = (username, password) => (dispatch) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    dispatch(adminLoginSuccess())
    return { success: true }
  }
  dispatch(adminLoginFailure('خطأ في اسم المستخدم أو كلمة المرور'))
  return { success: false }
}
