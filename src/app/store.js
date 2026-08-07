import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import reviewsReducer from '../features/reviews/reviewsSlice'
import messagesReducer from '../features/messages/messagesSlice'
import ordersReducer from '../features/orders/ordersSlice'
import adminAuthReducer from '../features/admin/adminAuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
    messages: messagesReducer,
    orders: ordersReducer,
    adminAuth: adminAuthReducer,
  },
})
