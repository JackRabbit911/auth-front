import { BrowserRouter } from "react-router"
import Layout from "Layout"
import Router from "Layout/Router";

function App() {
  const prefix = () => {
    const lang = document.querySelector('html')?.getAttribute('lang');

    return (lang === 'ru') ? '/auth' : `/${lang}/auth`
  }

  return (
    <BrowserRouter basename={prefix()}>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
