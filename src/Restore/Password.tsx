import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import PasswordForm from "./PasswordForm";
import { getCsrfThunk } from "store/csrf";
import { passwordCheckUri } from "common/constants";
import { useAppDispatch } from "store/hooks";

const Password = () => {
  const navigate = useNavigate()
  const { id, code } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const uri = [passwordCheckUri, id, code].join('/')
    dispatch(getCsrfThunk(uri)).unwrap()
      .then((data) => {
        if (!data.result) {
          navigate('/recovery/alert/warning')
        }
      })
  }, [])

  return <PasswordForm id={Number(id)} />
}

export default Password
