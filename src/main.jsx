import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import App from './App.jsx'
import './index.css'

// يفعّل ستايل Font Awesome بعد تحميل الصفحة (كان محمّل بـ media="print" عشان منيمنعش الـ render)
const faStylesheet = document.getElementById('fa-stylesheet')
if (faStylesheet) {
  faStylesheet.media = 'all'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
