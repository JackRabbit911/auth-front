import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

import { useGetQuery } from "common/api"
import { confirmUri } from "common/constants"

export const useRedirect = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const arg = {
    url: confirmUri + '/' + code
  }

  const { data } = useGetQuery(arg)

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
