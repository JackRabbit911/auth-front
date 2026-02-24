import { FormProvider } from "react-hook-form"
import { useRegisterForm } from "./hook"
import TextInput from "reused/TextInput"
import { __ } from "common/i18n/utils"
import { useTranslate } from "common/i18n/hook"
import CheckBox from "./CheckBox"

const Register = () => {
  const { methods, onSubmit, disabled } = useRegisterForm()
  useTranslate()

  return (
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
        <CheckBox fieldName="agree" />
        <button
          className="btn btn-primary dark:btn-info w-full mt-4"
          disabled={disabled}
        >
          {__('Sign Up')}
        </button>
      </form>
    </FormProvider>

  )
}

export default Register
