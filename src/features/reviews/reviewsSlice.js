import { createSlice } from '@reduxjs/toolkit'

const REVIEWS_KEY = 'traveler_reviews'

// تقييمات معتمدة افتراضية (Seed) عشان صفحة الخدمات متبقاش فاضية أول مرة
const SEED_REVIEWS = [
  {
    id: 'seed-1',
    name: 'محمد عبد الله',
    productName: 'حقيبة ظهر للسفر مقاومة للماء 40 لتر',
    rating: 5,
    text: 'الحقيبة جودتها عالية جدًا وخفيفة، استخدمتها في رحلة لمدة أسبوع ومكنتش محتاج حاجة تانية.',
    status: 'approved',
    createdAt: new Date('2026-05-10').toISOString(),
  },
  {
    id: 'seed-2',
    name: 'سارة أحمد',
    productName: 'وسادة سفر قابلة للنفخ',
    rating: 4,
    text: 'خدمة توصيل سريعة والمنتج مطابق للوصف تمامًا، هطلب تاني أكيد.',
    status: 'approved',
    createdAt: new Date('2026-06-02').toISOString(),
  },
  {
    id: 'seed-3',
    name: 'يوسف كريم',
    productName: 'باور بانك 20000mAh شحن سريع',
    rating: 5,
    text: 'أفضل متجر تعاملت معاه لمستلزمات السفر، فريق الدعم بيرد بسرعة.',
    status: 'approved',
    createdAt: new Date('2026-06-20').toISOString(),
  },
]

const loadReviews = () => {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY)
    return raw ? JSON.parse(raw) : SEED_REVIEWS
  } catch (err) {
    console.error('خطأ في قراءة التقييمات من LocalStorage', err)
    return SEED_REVIEWS
  }
}

const saveReviews = (reviews) => {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  } catch (err) {
    console.error('خطأ في حفظ التقييمات في LocalStorage', err)
  }
}

const initialState = {
  items: loadReviews(),
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: {
      reducer(state, action) {
        state.items.unshift(action.payload)
        saveReviews(state.items)
      },
      prepare({ name, productName, rating, text }) {
        return {
          payload: {
            id: `review-${Date.now()}`,
            name,
            productName,
            rating,
            text,
            status: 'pending', // لازم موافقة الأدمن قبل النشر
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    approveReview(state, action) {
      const review = state.items.find((r) => r.id === action.payload)
      if (review) review.status = 'approved'
      saveReviews(state.items)
    },
    rejectReview(state, action) {
      state.items = state.items.filter((r) => r.id !== action.payload)
      saveReviews(state.items)
    },
  },
})

export const { addReview, approveReview, rejectReview } = reviewsSlice.actions
export default reviewsSlice.reducer

export const selectApprovedReviews = (state) =>
  state.reviews.items.filter((r) => r.status === 'approved')

export const selectPendingReviews = (state) =>
  state.reviews.items.filter((r) => r.status === 'pending')
