import { Link } from "react-router";
import Alert from "reused/Alert";
import Warning from "reused/icons/Warning";

const AlertWarning = () => {
  return (
    <Alert
      className="alert alert-warning"
      icon={<Warning />}
    >
      <h3 className="text-lg font-medium">
        Whoops...
      </h3>
      <p>
        Код подтверждения недействителен или устарел. Пожалуйста, повторите
      </p>
      <Link to="/recovery/email">
        <span className="link font-bold">
          Процедуру восстановления пароля
        </span>
      </Link>
    </Alert>

  )
}

export default AlertWarning
