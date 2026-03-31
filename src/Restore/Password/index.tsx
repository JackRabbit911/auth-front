import useCsrf from "./useCsrf";
import PasswordForm from "../PasswordForm";

const Password = () => {
  const { id } = useCsrf()
  
  return <PasswordForm id={id} />
}

export default Password
