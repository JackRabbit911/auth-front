import { Route, Routes } from "react-router"
import Auth from "Auth"
import Restore from "Restore"
import Register from "Register"
import AlertInfo from "Restore/AlertInfo"
import Password from "Restore/Password"
import AlertWarning from "Restore/AlertWarning"
import AlertSuccess from "Restore/AlertSuccess"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Auth />} />
      <Route path='register' element={<Register />} />
      <Route path='recovery'>
        <Route path='email' element={<Restore />} />
        <Route path='alert'>
          <Route path='info' element={<AlertInfo />} />
          <Route path='warning' element={<AlertWarning />} />
          <Route path='success' element={<AlertSuccess />} />
        </Route>
        <Route path='password/:id?/:code?' element={<Password />} />
      </Route>
    </Routes>
  )
}

export default Router
