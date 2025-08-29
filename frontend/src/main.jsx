import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import ContextApi from './context/ContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <ContextApi>
    <StrictMode>
      <App />
    </StrictMode>
  </ContextApi>,
)
