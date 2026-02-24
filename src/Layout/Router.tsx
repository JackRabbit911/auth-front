import { Route, Routes } from "react-router"
import Auth from "Auth"
import Restore from "Restore"
import Register from "Register"
import AlertInfo from "Restore/AlertInfo"
import Password from "Restore/Password"
import AlertWarning from "Restore/AlertWarning"
import AlertSuccess from "Restore/AlertSuccess"
import RegisterInfo from "Register/alert/RegisterInfo"
import Confirm from "Register/Confirm"
import RegisterWarning from "Register/alert/RegisterWarning"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Auth />} />
      <Route path='register'>
        <Route path='' element={<Register />} />
        <Route path='alert'>
          <Route path='info' element={<RegisterInfo />} />
          <Route path='warning' element={<RegisterWarning />} />
        </Route>
        <Route path='confirm/:code' element={<Confirm />} />
      </Route>
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
