// أدوات مساعدة للتعامل مع LocalStorage
// هنستخدمها كتخزين مؤقت لحد ما نوصل المشروع بباك إند حقيقي

const USERS_KEY = 'traveler_users' // كل المستخدمين المسجلين (مؤقتًا)
const SESSION_KEY = 'traveler_session' // المستخدم الحالي اللي مسجل دخول

// ---------- المستخدمين ----------

export function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('خطأ في قراءة المستخدمين من LocalStorage', err)
    return []
  }
}

export function saveStoredUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch (err) {
    console.error('خطأ في حفظ المستخدمين في LocalStorage', err)
  }
}

export function addStoredUser(user) {
  const users = getStoredUsers()
  users.push(user)
  saveStoredUsers(users)
  return user
}

export function findUserByEmail(email) {
  const users = getStoredUsers()
  return users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  )
}

// ---------- الجلسة (Session) ----------

export function getStoredSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.error('خطأ في قراءة الجلسة من LocalStorage', err)
    return null
  }
}

export function saveStoredSession(user) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } catch (err) {
    console.error('خطأ في حفظ الجلسة في LocalStorage', err)
  }
}

export function clearStoredSession() {
  localStorage.removeItem(SESSION_KEY)
}
