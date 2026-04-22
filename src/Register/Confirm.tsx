import Loading from "reused/Loading"
import { useRedirect } from "./redirect"

const Confirm = () => {
  useRedirect()
  
  return <Loading />
}

export default Confirm
