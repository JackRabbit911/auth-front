import { Route, Routes } from "react-router"
import Auth from "Auth"
import Restore from "Restore"
import Register from "Register"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Auth />} />
      <Route path='register' element={<Register />} />
      <Route path='restore' element={<Restore />} />
    </Routes>
  )
}

export default Router
