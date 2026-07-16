import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'

import i18n from './i18n'
import App from './App'
import { store } from './stores'
import AppTheme from '@/components/Layout/AppTheme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <AppTheme>
            <App />
          </AppTheme>
        </ReduxProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
)
