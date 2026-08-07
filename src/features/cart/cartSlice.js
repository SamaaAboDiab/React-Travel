import { createSlice } from '@reduxjs/toolkit'

const CART_KEY = 'traveler_cart'

const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('خطأ في قراءة السلة من LocalStorage', err)
    return []
  }
}

const saveCart = (items) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch (err) {
    console.error('خطأ في حفظ السلة في LocalStorage', err)
  }
}

const initialState = {
  items: loadCart(), // [{ id, name, price, image, quantity }]
  isOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      saveCart(state.items)
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveCart(state.items)
    },
    increaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) item.quantity += 1
      saveCart(state.items)
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
      saveCart(state.items)
    },
    clearCart(state) {
      state.items = []
      saveCart(state.items)
    },
    openCart(state) {
      state.isOpen = true
    },
    closeCart(state) {
      state.isOpen = false
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  openCart,
  closeCart,
} = cartSlice.actions

export default cartSlice.reducer

// Selectors بسيطة
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
