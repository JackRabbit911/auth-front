import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from "store"
import { BrowserRouter } from 'react-router'

const prefix = () => {
  const lang = document.querySelector('html')?.getAttribute('lang');
  return (lang === 'ru') ? '/auth' : `/${lang}/auth`
}

createRoot(document.getElementById('root')!).render(
    <Provider store={store} >
        <BrowserRouter basename={prefix()}>
            <App />
        </BrowserRouter>
    </Provider>
)
