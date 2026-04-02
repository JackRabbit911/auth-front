import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetCsrfQuery } from "services/api";

const useCsrf = () => {
  const navigate = useNavigate()
  const { id, code } = useParams()
  const uri = [id, code].join('/')
  const { data } = useGetCsrfQuery(uri)
  const csrf = data?.result

  useEffect(() => {
    if (data && !data.result) {
      console.log(data)
      navigate('/recovery/alert/warning')
    }
  }, [])

  return csrf
}

export default useCsrf
