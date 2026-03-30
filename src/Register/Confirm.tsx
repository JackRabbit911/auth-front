import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

import { confirmCodeThunk } from "store/register"
import { useAppDispatch } from "store/hooks"

const Confirm = () => {
  const { code } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (code) {
      dispatch(confirmCodeThunk(code)).unwrap()
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
    }
  }, [])

  return <>Wait, please..</>
}

export default Confirm
