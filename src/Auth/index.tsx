import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import CheckBox from "reused/CheckBox";
import TextInput from "reused/TextInput";
import { authData, type AuthData } from "./schema";
import { isObjectEmpty } from "common/utils";

const Auth = () => {
  const methods = useForm({
    resolver: zodResolver(authData),
    reValidateMode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  })

  const disabled = !isObjectEmpty(methods.formState.errors) ||
    methods.watch('email') === '' ||
    methods.watch('password').length < 5

  const onSubmit: SubmitHandler<AuthData> = (data) => {
    const valid = authData.safeParse(data)

    if (valid?.error) {
      console.log(valid.error, data)
    }

    if (valid?.success && valid?.data) {
      console.log(valid.data)
    }
  }

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
            <span className="fieldset link">
              Fogot password?
            </span>
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
            Sign Up!
          </span>
        </div>
      </form>
    </FormProvider>
  )
}

export default Auth
