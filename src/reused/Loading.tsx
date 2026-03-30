import { useTranslate } from "common/i18n/hook"

const Loading = () => {
  const __ = useTranslate()

  return (
    <div className="text-center text-2xl">
      {__('Loading')}{' '}
      <span className="loading loading-dots"></span>
    </div>
  )
}



export default Loading
