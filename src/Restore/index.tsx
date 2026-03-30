import { FormProvider } from "react-hook-form"

import TextInput from "reused/TextInput"
import { useEmailForm } from "./hooks/emailForm";
import { useTranslate } from "common/i18n/hook";

const Restore = () => {
  const { methods, onSubmit, disabled } = useEmailForm()
  const __ = useTranslate()

  return (
    <FormProvider {...methods
    } >
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center">
          <h1 className="text-xl">{__('Access recovery')}</h1>
        </div>
        <TextInput
          fieldName="email"
          label="Email"
          placeholder={__('Enter the email you provided')}
        />
        <button
          className="btn btn-primary dark:btn-info w-full my-4"
          disabled={disabled}
        >
          {__('Send')}
        </button>
      </form>
    </FormProvider >
  )
}

export default Restore
