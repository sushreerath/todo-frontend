import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'           // ✅ 1. Import Provider
import store from './redux/store'                // ✅ 2. Import your store (adjust path if needed)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>                    {/* ✅ 3. Wrap App with Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
