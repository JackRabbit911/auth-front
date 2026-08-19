import { FormProvider } from "react-hook-form"

import CSRF from "reused/CSRF";
import TextInput from "reused/TextInput";
import ErrorOrPending from "reused/ErrorOrPendig";
import { usePasswordForm } from "./hooks/passwordForm";
import { useTranslate } from "common/i18n/hooks";
import { useAppSelector } from "store/hooks";

const PasswordForm = () => {
  const { methods, onSubmit, disabled, responseStatus } = usePasswordForm()
  const username = useAppSelector((state) => state.username.name)
  const __ = useTranslate()

  return (
    <ErrorOrPending responseStatus={responseStatus}>
      <FormProvider {...methods}>
        <h3 className="text-xl">
          {__('Change Password form')}
        </h3>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CSRF />
          <input type="hidden" name="username" value={username} />
          <TextInput
            type="password"
            fieldName="password"
            label={__('Password')}
            autoComplete="new-password"
          />
          <TextInput
            type="password"
            fieldName="confirmPassword"
            label={__('Confirm')}
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="btn btn-primary dark:btn-info w-full mt-4"
            disabled={disabled}
          >
            {__('Save')}
          </button>
        </form>
      </FormProvider>
    </ErrorOrPending>
  )
}

export default PasswordForm
