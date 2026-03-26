import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import PasswordForm from "./PasswordForm";
import { getCsrfThunk } from "store/csrf";
import { useAppDispatch } from "store/hooks";
import { passwordCheckUri } from "common/constants";

const Password = () => {
  const navigate = useNavigate()
  const { id, code } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const uri = [passwordCheckUri, id, code].join('/')
    const promise = dispatch(getCsrfThunk(uri)).unwrap()
    promise.then((result) => {
      if (!result) {
        navigate('/recovery/alert/warning')
      }
    })
  }, [])

  return <PasswordForm id={Number(id)} />
}

export default Password
