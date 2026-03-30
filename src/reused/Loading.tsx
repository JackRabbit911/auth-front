import { useTranslate } from "common/i18n/hook"

const Loading = () => {
  const __ = useTranslate()

  return (
    <div className="!border-none !bg-transparent text-center">
      {__('Loading')}{' '}
      <span className="loading loading-dots"></span>
    </div>
  )
}



export default Loading
