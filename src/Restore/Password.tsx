import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import PasswordForm from "./PasswordForm";
import { getCsrfThunk } from "store/csrf";
import { passwordCheckUri } from "common/constants";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Password = () => {
  const navigate = useNavigate()
  const { id, code } = useParams()
  const dispatch = useAppDispatch()
  const csrf = useAppSelector((state) => state.csrf.data)

  useEffect(() => {
    debugger
    if (!csrf) {
      const uri = [passwordCheckUri, id, code].join('/')
      dispatch(getCsrfThunk(uri)).unwrap()
        .then((data) => {
          if (!data.result) {
            console.log(data)
            navigate('/recovery/alert/warning')
          }
        })
    }
  }, [])

  return (
    <>
      {!csrf ? null : <PasswordForm id={Number(id)} />}
    </>
  )
}

export default Password
