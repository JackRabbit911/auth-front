import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

import ajax from "common/ajax";
import PasswordForm from "./PasswordForm";
import { passwordCheckUri } from "common/constants";

const Password = () => {
  const navigate = useNavigate()
  const { id, code } = useParams()

  useEffect(() => {
    const uri = [passwordCheckUri, code].join('/')
    ajax.get(uri)
      .then((response) => response.data)
      .then((data) => {
        if (!data.result) {
          navigate('/recovery/alert/warning')
        }
      })
  }, [])

  return <PasswordForm id={Number(id)} />
}

export default Password
