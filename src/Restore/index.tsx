import { FormProvider } from "react-hook-form"

import { __ } from "common/i18n/utils";
import TextInput from "reused/TextInput"
import { useTranslate } from "common/i18n/hook";
import { useEmailForm } from "./hooks/emailForm";

const Restore = () => {
  const { methods, onSubmit, disabled } = useEmailForm()
  useTranslate()
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center">
          <h1 className="text-xl">{__('Password recovery')}</h1>
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
    </FormProvider>
  )
}

export default Restore
