import { Link } from "react-router";
import { FormProvider } from "react-hook-form"

import { useAuthForm } from "./hooks";
import CheckBox from "reused/CheckBox";
import { __ } from "common/i18n/utils";
import TextInput from "reused/TextInput";
import { useTranslate } from "common/i18n/hook";

const Auth = () => {
  const { methods, onSubmit, disabled } = useAuthForm()
  useTranslate()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center">
          <h1 className="text-xl">{__('Welcome ;)')}</h1>
        </div>
        <TextInput
          fieldName="email"
          label="Email"
        />
        <TextInput
          fieldName="password"
          label={__('Password')}
          optional={__("min % symbols", 5)}
        />
        <div className="flex flex-row justify-between my-4">
          <CheckBox
            fieldName="remember"
            label={__('Remember me on this device')}
          />
          <Link to='recovery/email'>
            <span className="fieldset link">
              {__('Forgot password?')}
            </span>
          </Link>
        </div>
        <button
          className="btn btn-primary dark:btn-info w-full mb-4"
          disabled={disabled}
        >
          {__('Sign In')}
        </button>
        <div className="fieldset flex justify-end gap-4">
          <span>{__('No account?')}</span>
          <span className="link font-bold">
            {__('Sign Up, please:')}
          </span>
        </div>
      </form>
    </FormProvider>
  )
}

export default Auth
