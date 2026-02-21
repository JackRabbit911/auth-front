import { Link } from "react-router";
import Alert from "reused/Alert";
import Success from "reused/icons/Success";

const AlertSuccess = () => {
  return (
    <Alert
      className="alert alert-success"
      icon={<Success />}
    >
      <h3 className="text-lg font-medium">
        Congratulations!
      </h3>
      <p>
        Ваш пароль успешно изменён.
      </p>
      <Link to="/">
        <button className="btn w-full mt-4">
          Войти
        </button>
      </Link>
    </Alert>

  )
}

export default AlertSuccess
