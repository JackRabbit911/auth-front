import { FormProvider } from "react-hook-form"

import CheckBox from "reused/CheckBox";
import TextInput from "reused/TextInput";
import { useAuthForm } from "./hooks";
import { Link } from "react-router";

const Auth = () => {
  const { methods, onSubmit, disabled } = useAuthForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center">
          <h1 className="text-xl">{'Welcome ;)'}</h1>
        </div>
        <TextInput
          fieldName="email"
          label="Email"
        />
        <TextInput
          fieldName="password"
          label="Password"
          optional="min 5 symbols"
        />
        <div className="flex flex-row justify-between my-4">
          <CheckBox
            fieldName="remember"
            label="Remember me on this device"
          />
          <Link to='recovery/email'>
            <span className="fieldset link">
              Fogot password?
            </span>
          </Link>
        </div>
        <button
          className="btn btn-primary dark:btn-info w-full mb-4"
          disabled={disabled}
        >
          Sign In
        </button>
        <div className="fieldset flex justify-end gap-4">
          <span>No account?</span>
          <span className="link font-bold">
            Sign Up, please:
          </span>
        </div>
      </form>
    </FormProvider>
  )
}

export default Auth
