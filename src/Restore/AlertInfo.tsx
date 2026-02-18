import Alert from "reused/Alert";
import Info from "reused/icons/Info";
import { useAppSelector } from "store/hooks";

const AlertInfo = () => {
  const username = useAppSelector((state) => state.username.name)

  return (
    <Alert
      className="alert alert-info"
      icon={<Info />}
    >
      <h3 className="text-lg font-medium">
        Всё будет хорошо!
      </h3>
      <h4 className="text-md font-bold">
        Ув., {username}!
      </h4>
      <p>
        На указанный Вами адрес электропочты направлено письмо со ссылкой на сброс и восстановление пароля
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

export default AlertInfo
