import { useEffect } from "react"
import { useRegisterConfirmQuery } from "common/api"
import { useNavigate, useParams } from "react-router"

export const useRedirect = () => {
  const { code } = useParams()
  const navigate = useNavigate()

  const arg = code ? code : ''
  const { data } = useRegisterConfirmQuery(arg)

  useEffect(() => {
    if (data && data.success) {
      if (data.result) {
        navigate('/register/alert/success')
      } else {
        navigate('/register/alert/warning')
      }
    } 
  }, [data])
}
