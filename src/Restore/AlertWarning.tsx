import { Link } from "react-router";

import Alert from "reused/Alert";
import Warning from "reused/icons/Warning";
import { useTranslate } from "common/i18n/hooks";

const AlertWarning = () => {
  const __ = useTranslate()

  return (
    <Alert
      className="alert alert-warning"
      icon={<Warning />}
    >
      <h3 className="text-lg font-medium">
        {__('Whoops...')}
      </h3>
      <p>
        {__('code_expired')}
      </p>
      <Link to="/recovery/email">
        <span className="link font-bold">
          {__('the password recovery process')}
        </span>
      </Link>
    </Alert>

  )
}

export default AlertWarning
