import { FormProvider } from "react-hook-form"

import CSRF from "reused/CSRF";
import TextInput from "reused/TextInput";
import ErrorOrPending from "reused/ErrorOrPendig";
import { usePasswordForm } from "./hooks/passwordForm";
import { useTranslate } from "common/i18n/hooks";

type Props = {
  id: number;
}

const PasswordForm = ({ id }: Props) => {
  const { methods, onSubmit, disabled } = usePasswordForm(id)
  const __ = useTranslate()

  return (
    <ErrorOrPending>
      <FormProvider {...methods}>
        <h3 className="text-xl">
          {__('Change Password form')}
        </h3>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CSRF />
          <TextInput
            type="password"
            fieldName="password"
            label={__('Password')}
          />
          <TextInput
            type="password"
            fieldName="confirmPassword"
            label={__('Confirm')}
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
