import { Route, Routes } from "react-router"
import Auth from "Auth"
import Restore from "Restore"
import Register from "Register"
import AlertInfo from "Restore/AlertInfo"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Auth />} />
      <Route path='register' element={<Register />} />
      <Route path='recovery'>
        <Route path='email' element={<Restore />} />
        <Route path='alert' element={<AlertInfo />} />
      </Route>
    </Routes>
  )
}

export default Router
