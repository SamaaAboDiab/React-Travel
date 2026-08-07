import { createSlice } from '@reduxjs/toolkit'

const ORDERS_KEY = 'traveler_orders'

const loadOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('خطأ في قراءة الطلبات من LocalStorage', err)
    return []
  }
}

const saveOrders = (orders) => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch (err) {
    console.error('خطأ في حفظ الطلبات في LocalStorage', err)
  }
}

const initialState = {
  items: loadOrders(),
}

// حالات الطلب الممكنة:
// pending (قيد الانتظار) -> delivering (قيد التوصيل) -> approved (مقبول) | rejected (مرفوض)
// approved -> return_requested (طلب استرجاع) -> returned (مسترجع) | return_rejected (رفض الاسترجاع)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: {
      reducer(state, action) {
        state.items.unshift(action.payload)
        saveOrders(state.items)
      },
      prepare({ userId, userName, items, total, shippingInfo }) {
        return {
          payload: {
            id: `order-${Date.now()}`,
            userId,
            userName,
            items,
            total,
            shippingInfo,
            status: 'pending',
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    deleteOrder(state, action) {
      state.items = state.items.filter((o) => o.id !== action.payload)
      saveOrders(state.items)
    },
    requestReturn(state, action) {
      const order = state.items.find((o) => o.id === action.payload)
      if (order) order.status = 'return_requested'
      saveOrders(state.items)
    },
    updateOrderStatus(state, action) {
      const { orderId, status } = action.payload
      const order = state.items.find((o) => o.id === orderId)
      if (order) order.status = status
      saveOrders(state.items)
    },
  },
})

export const { createOrder, deleteOrder, requestReturn, updateOrderStatus } =
  ordersSlice.actions
export default ordersSlice.reducer

export const selectOrdersByUser = (userId) => (state) =>
  state.orders.items.filter((o) => o.userId === userId)
