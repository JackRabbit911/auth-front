import Alert from "reused/Alert";
import Info from "reused/icons/Info";
import { useAppSelector } from "store/hooks";
import { useTranslate } from "common/i18n/hooks";
import { Link } from "react-router";

const RegisterInfo = () => {
  const { name, code } = useAppSelector((state) => state.username)
  const __ = useTranslate()

  return (
    <Alert
      className="alert alert-info"
      icon={<Info />}
    >
      <h3 className="text-lg font-medium">
        Очень хорошо!
      </h3>
      <h4 className="text-md font-bold">
        Ув., {name}!
      </h4>
      <p>
        {__('info_register')}
      </p>
      <p>
        <span className="font-bold me-4">
          Важно!
        </span>
        Если не найдёте письмо во Входящих, поищите в папке Спам
      </p>
      {code && <p>
        <span className="link font-medium">
          <Link to={`/register/confirm/${code}`}>
            В режиме тестирования пройдите по этой ссылке
          </Link>
        </span>
      </p>}
    </Alert>

  )
}

export default RegisterInfo
