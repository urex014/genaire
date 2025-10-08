import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Toaster} from 'react-hot-toast';
import { ThemeProvider } from './utils/ThemeContext.tsx'
import { CartProvider } from './utils/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
    <App />
    <Toaster position='top-left' reverseOrder={false} />
    </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)
