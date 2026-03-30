import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import Loading from "reused/Loading";
import PasswordForm from "./PasswordForm";
import { getCsrfThunk } from "store/csrf";
import { passwordCheckUri } from "common/constants";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Password = () => {
  const navigate = useNavigate()
  const { id, code } = useParams()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.common)

  useEffect(() => {
    const uri = [passwordCheckUri, id, code].join('/')
    dispatch(getCsrfThunk(uri)).unwrap()
      .then((data) => {
        if (!data.result) {
          navigate('/recovery/alert/warning')
        }
      })
  }, [])

  return (
    <>
      {!loading ? <PasswordForm id={Number(id)} /> : <Loading />}
    </>
  )
}

export default Password
