import { useTranslate } from "common/i18n/hooks";
import { Link } from "react-router";
import Alert from "reused/Alert";
import Success from "reused/icons/Success";

const AlertSuccess = () => {
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
        {__('Your password has been successfully changed')}.
      </p>
      <Link to="/">
        <button className="btn w-full mt-4">
          {__('Sign In')}
        </button>
      </Link>
    </Alert>

  )
}

export default AlertSuccess
