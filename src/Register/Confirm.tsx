import ajax from "common/ajax"
import { confirmUri } from "common/constants"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

const Confirm = () => {
  const { code } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const uri = [confirmUri, code].join('/')
    ajax.get(uri).then((response) => response.data)
      .then((data) => {
        if (data.success) {
          if (data.result) {
            navigate('/register/alert/success')
          } else {
            navigate('/register/alert/warning')
          }
        } else {
          console.log(data)
        }
      })
  }, [])

  return <>Wait, please...</>
}

export default Confirm
