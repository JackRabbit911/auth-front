import Alert from "reused/Alert";
import Info from "reused/icons/Info";
import { useAppSelector } from "store/hooks";
import { useTranslate } from "common/i18n/hooks";

const AlertInfo = () => {
  const username = useAppSelector((state) => state.username.name)
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
        {__('Dear, %!', username)}
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
    </Alert>

  )
}

export default AlertInfo
