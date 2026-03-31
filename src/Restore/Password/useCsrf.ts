import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { getCsrfThunk } from "store/csrf";
import { useAppDispatch } from "store/hooks";

const useCsrf = () => {
  const navigate = useNavigate()
  const { id, code } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCsrfThunk({id: id, code: code})).unwrap()
      .then((data) => {
        if (!data.result) {
          console.log(data)
          navigate('/recovery/alert/warning')
        }
      })
  }, [])

  return { id: Number(id) }
}

export default useCsrf
