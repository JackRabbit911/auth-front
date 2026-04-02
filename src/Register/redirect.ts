import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useRegisterConfirmQuery } from "common/api"

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
        } else {
          console.log(data)
        }
      }, [])
}
