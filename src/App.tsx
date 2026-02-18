import { useEffect } from "react"
import { BrowserRouter } from "react-router"

import Layout from "Layout"
import Router from "Layout/Router"
import { getReferer } from "Auth/utils"
import { setReferer } from "store/referer"
import { useAppDispatch } from "store/hooks"

const prefix = () => {
  const lang = document.querySelector('html')?.getAttribute('lang');
  return (lang === 'ru') ? '/auth' : `/${lang}/auth`
}

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setReferer(getReferer()))
  }, [])

  return (
    <BrowserRouter basename={prefix()}>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
