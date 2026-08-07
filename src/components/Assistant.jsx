import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, getProductsByCategory } from '../data/products'

// نفس فئات المساعد في المشروع الأصلي + قسم الحج والعمرة الجديد
const ASSISTANT_CATEGORIES = CATEGORIES.filter(
  (c) => c.id !== 'all' && c.id !== 'featured'
)

const PRICE_RANGES = [
  { id: 'low', label: 'أقل من 400', min: 0, max: 400 },
  { id: 'mid', label: '400 - 800', min: 400, max: 800 },
  { id: 'high', label: 'أكثر من 800', min: 800, max: Infinity },
]

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      from: 'bot',
      text: 'مرحباً! 👋 اختر القسم اللي تحب أساعدك فيه، وبعدين اختار حدود السعر المناسبة.',
    },
  ])
  const [stage, setStage] = useState('category') // category | price | done
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showOptions, setShowOptions] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleAssistant = () => setIsOpen((prev) => !prev)

  const handleSelectCategory = (categoryId) => {
    const category = ASSISTANT_CATEGORIES.find((c) => c.id === categoryId)

    setSelectedCategory(categoryId)
    setStage('price')

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, from: 'user', text: `${category.icon} ${category.label}` },
      {
        id: `bot-${Date.now()}`,
        from: 'bot',
        text: 'حلو! في حدود كام تحب السعر يكون؟',
      },
    ])
  }

  const handleSelectPrice = (priceId) => {
    const selectedRange = PRICE_RANGES.find((range) => range.id === priceId)
    const products = getProductsByCategory(selectedCategory).filter(
      (product) => product.price >= selectedRange.min && product.price < selectedRange.max
    )

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, from: 'user', text: selectedRange.label },
      {
        id: `bot-${Date.now()}`,
        from: 'bot',
        text:
          products.length > 0
            ? `تمام! دي أفضل المنتجات في حدود ${selectedRange.label} 👇`
            : `للأسف مفيش منتجات في القسم ده بالسعر ده، جرب نطاق تاني.`,
        products: products.slice(0, 3),
        categoryId: selectedCategory,
      },
    ])
    setStage('done')
    setShowOptions(false)
  }

  const handleRestart = () => {
    setMessages([
      {
        id: 'welcome',
        from: 'bot',
        text: 'مرحباً! 👋 اختر القسم اللي تحب أساعدك فيه، وبعدين اختار حدود السعر المناسبة.',
      },
    ])
    setStage('category')
    setSelectedCategory(null)
    setShowOptions(true)
  }

  return (
    <>
      {/* الزر العائم */}
      <button
        onClick={toggleAssistant}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 text-white shadow-soft transition-all hover:bg-primary-600 active:scale-95"
        type="button"
        aria-label="فتح المساعد"
      >
        <span className="text-lg">🤖</span>
      </button>

      {/* نافذة المحادثة */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-40 w-[min(90vw,20rem)] max-w-xs h-[32rem] bg-white rounded-[1.75rem] shadow-2xl border border-night-100 flex flex-col overflow-hidden animate-in">
          {/* الهيدر */}
          <div className="flex items-start justify-between gap-3 px-4 py-3 text-white bg-hero-gradient">
            <div className="flex items-start gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="text-sm font-bold leading-tight">مساعدك الذكي</h3>
                <p className="text-xs leading-5 text-white">اختار القسم اللي تحب أساعدك فيه، وهجيب لك أفضل المنتجات بسرعة.</p>
              </div>
            </div>
            <button
              onClick={toggleAssistant}
              className="text-xl leading-none text-white/80 hover:text-white"
              type="button"
              aria-label="Close assistant"
            >
              ×
            </button>
          </div>

          {/* الرسائل */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-primary-50/60">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-[1.25rem] px-3.5 py-3 text-sm leading-relaxed break-words ${
                    msg.from === 'user'
                      ? 'bg-primary-600 text-white rounded-br-[0.75rem] rounded-bl-[1.25rem] rounded-tl-[1.25rem] rounded-tr-[1.25rem]'
                      : 'bg-white border border-night-200 text-night-700 rounded-bl-[0.75rem] rounded-br-[1.25rem] rounded-tl-[1.25rem] rounded-tr-[1.25rem]'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products?category=${msg.categoryId}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-3 transition-colors bg-white border rounded-2xl border-night-100 hover:border-gold-200 hover:bg-primary-50"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            width="48"
                            height="48"
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-12 h-12 rounded-xl shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold line-clamp-1">{product.name}</p>
                            <p className="mt-1 text-xs text-night-500">{product.price} جنيه</p>
                          </div>
                        </Link>
                      ))}
                      <Link
                        to={`/products?category=${msg.categoryId}`}
                        onClick={() => setIsOpen(false)}
                        className="block mt-1 text-xs font-semibold text-center text-gold-200 hover:text-gold-100"
                      >
                        عرض كل منتجات القسم ←
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* أزرار الاختيار */}
          <div className="p-3 bg-white border-t border-night-100">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {stage === 'category'
                ? ASSISTANT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className="w-full text-xs font-semibold bg-primary-50 hover:bg-primary-100 text-primary-700 px-2 py-1.5 rounded-2xl border border-primary-100 text-center transition-colors"
                      type="button"
                    >
                      {cat.label}
                    </button>
                  ))
                : PRICE_RANGES.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => handleSelectPrice(range.id)}
                      className="w-full text-xs font-semibold bg-primary-50 hover:bg-primary-100 text-primary-700 px-2 py-1.5 rounded-2xl border border-primary-100 text-center transition-colors"
                      type="button"
                    >
                      {range.label}
                    </button>
                  ))}
            </div>
            {stage === 'done' && (
              <button
                onClick={handleRestart}
                className="w-full py-3 mt-2 text-sm font-semibold transition-colors rounded-2xl bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
                type="button"
              >
                ↻ اسأل عن قسم تاني
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
