import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

import Loading from "reused/Loading"
import ErrorCmp from "reused/ErrorCmp"
import { confirmCodeThunk } from "store/register"
import { useAppDispatch, useAppSelector } from "store/hooks"

const Confirm = () => {
  const { code } = useParams()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.common)
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

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorCmp status={error} />
  }

  return <>Wait, please..</>
}

export default Confirm
