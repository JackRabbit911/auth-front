import Alert from "reused/Alert";
import Info from "reused/icons/Info";
import { useAppSelector } from "store/hooks";
import { useTranslate } from "common/i18n/hooks";
import { Link } from "react-router";

const AlertInfo = () => {
  const { name, code } = useAppSelector((state) => state.username)
  const __ = useTranslate()

  return (
    <Alert
      className="alert alert-info"
      icon={<Info />}
    >
      <h3 className="text-lg font-medium">
        {__('Everything will be fine!')}
      </h3>
      <h4 className="text-md font-bold">
        {__('Dear, %!', name)}
      </h4>
      <p>
        {__('mail_recovery_info')}
      </p>
      <p>
        <span className="font-bold me-4">
          {__('Important!')}
        </span>
        {__('look_spam')}
      </p>
      {code && <p>
        <span className="link font-medium">
          <Link to={`/recovery/password/${code}`}>
            В режиме тестирования пройдите по этой ссылке
          </Link>
        </span>
      </p>}
    </Alert>

  )
}

export default AlertInfo
