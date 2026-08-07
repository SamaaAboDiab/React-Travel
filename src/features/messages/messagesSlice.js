import { createSlice } from '@reduxjs/toolkit'

const MESSAGES_KEY = 'traveler_messages'

const loadMessages = () => {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('خطأ في قراءة الرسائل من LocalStorage', err)
    return []
  }
}

const saveMessages = (messages) => {
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  } catch (err) {
    console.error('خطأ في حفظ الرسائل في LocalStorage', err)
  }
}

const initialState = {
  items: loadMessages(),
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: {
      reducer(state, action) {
        state.items.unshift(action.payload)
        saveMessages(state.items)
      },
      prepare({ firstName, lastName, email, phone, text }) {
        return {
          payload: {
            id: `msg-${Date.now()}`,
            firstName,
            lastName,
            email,
            phone,
            text,
            status: 'pending', // pending | accepted | rejected
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    acceptMessage(state, action) {
      const msg = state.items.find((m) => m.id === action.payload)
      if (msg) msg.status = 'accepted'
      saveMessages(state.items)
    },
    rejectMessage(state, action) {
      const msg = state.items.find((m) => m.id === action.payload)
      if (msg) msg.status = 'rejected'
      saveMessages(state.items)
    },
    deleteMessage(state, action) {
      state.items = state.items.filter((m) => m.id !== action.payload)
      saveMessages(state.items)
    },
  },
})

export const { addMessage, acceptMessage, rejectMessage, deleteMessage } =
  messagesSlice.actions
export default messagesSlice.reducer
