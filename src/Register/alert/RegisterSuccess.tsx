import { useTranslate } from "common/i18n/hooks";
import { Link } from "react-router";
import Alert from "reused/Alert";
import Success from "reused/icons/Success";

const RegisterSuccess = () => {
  const __ = useTranslate()
  
  return (
    <Alert
      className="alert alert-success"
      icon={<Success />}
    >
      <h3 className="text-lg font-medium">
        {__('Congratulations!')}
      </h3>
      <p>
        Вы зарегистрированы на сайте buri.me
      </p>
      <Link to="/">
        <button className="btn w-full mt-4">
          {__('Welcome to Sign In!')}
        </button>
      </Link>
    </Alert>

  )
}

export default RegisterSuccess
