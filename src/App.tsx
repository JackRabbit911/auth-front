import { useEffect } from "react"
import { useLocation } from "react-router"

import Layout from "Layout"
import Router from "Layout/Router"
import { getReferer } from "Auth/utils"
import { setReferer } from "store/referer"
import { useAppDispatch } from "store/hooks"
import TranslateProvider from "common/i18n/TranslateProvider"

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(setReferer(getReferer()))
  }, [])

  return (
      <TranslateProvider deps={[location]}>
        <Layout>
          <Router />
        </Layout>
      </TranslateProvider>
  )
}

export default App
