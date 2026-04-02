import { FormProvider } from "react-hook-form"

import CheckBox from "./CheckBox"
import { useRegisterForm } from "./hook"
import TextInput from "reused/TextInput"
import { useTranslate } from "common/i18n/hooks"
import ErrorOrPending from "reused/ErrorOrPendig"

const Register = () => {
  const { methods, onSubmit, disabled, responseStatus } = useRegisterForm()
  const __ = useTranslate()

  return (
    <ErrorOrPending responseStatus={responseStatus}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-center">
            <h1 className="text-xl">{__('Register')}</h1>
          </div>
          <TextInput
            fieldName="name"
            label="Username"
          />
          <TextInput
            fieldName="email"
            label="Email"
          />
          <TextInput
            fieldName="password"
            type="password"
            label={__('Password')}
            optional={__("min % symbols", 5)}
          />
          <TextInput
            fieldName="confirmPassword"
            type="password"
            label={__('Confirm password')}
          />
          <CheckBox
            fieldName="agree"
            __={__}
          />
          <button
            className="btn btn-primary dark:btn-info w-full mt-4"
            disabled={disabled}
          >
            {__('Sign Up')}
          </button>
        </form>
      </FormProvider>
    </ErrorOrPending>

  )
}

export default Register
