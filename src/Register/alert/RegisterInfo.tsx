import Alert from "reused/Alert";
import Info from "reused/icons/Info";
import { useAppSelector } from "store/hooks";
import { useTranslate } from "common/i18n/hooks";

const RegisterInfo = () => {
  const username = useAppSelector((state) => state.username.name)
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
        Ув., {username}!
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
    </Alert>

  )
}

export default RegisterInfo
