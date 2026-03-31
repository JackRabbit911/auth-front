import { Route, Routes } from "react-router"

import Auth from "Auth"
import Restore from "Restore"
import Register from "Register"
import Confirm from "Register/Confirm"
import ErrorCmp from "reused/ErrorCmp"
import Password from "Restore/Password"
import AlertInfo from "Restore/AlertInfo"
import AlertWarning from "Restore/AlertWarning"
import AlertSuccess from "Restore/AlertSuccess"
import RegisterInfo from "Register/alert/RegisterInfo"
import RegisterWarning from "Register/alert/RegisterWarning"
import RegisterSuccess from "Register/alert/RegisterSuccess"

const Router = () => {
  return (
    <Routes>
      <Route index element={<Auth />} />
      <Route path='register'>
        <Route index element={<Register />} />
        <Route path='alert'>
          <Route path='info' element={<RegisterInfo />} />
          <Route path='warning' element={<RegisterWarning />} />
          <Route path='success' element={<RegisterSuccess />} />
        </Route>
        <Route path='confirm/:code' element={<Confirm />} />
      </Route>
      <Route path='recovery'>
        <Route index element={<ErrorCmp status={404} />} />
        <Route path='email' element={<Restore />} />
        <Route path='alert'>
          <Route path='info' element={<AlertInfo />} />
          <Route path='warning' element={<AlertWarning />} />
          <Route path='success' element={<AlertSuccess />} />
        </Route>
        <Route path='password/:id?/:code?' element={<Password />} />
      </Route>
      <Route path='*' element={<ErrorCmp status={404} />} />
    </Routes>
  )
}

export default Router
