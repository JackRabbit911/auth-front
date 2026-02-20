import { Route, Routes } from "react-router"
import Auth from "Auth"
import Restore from "Restore"
import Register from "Register"
import AlertInfo from "Restore/AlertInfo"
import Password from "Restore/Password"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Auth />} />
      <Route path='register' element={<Register />} />
      <Route path='recovery'>
        <Route path='email' element={<Restore />} />
        <Route path='alert' element={<AlertInfo />} />
        <Route path='password/:code' element={<Password />} />
      </Route>
    </Routes>
  )
}

export default Router
