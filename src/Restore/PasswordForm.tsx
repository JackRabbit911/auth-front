import { FormProvider } from "react-hook-form"

import TextInput from "reused/TextInput";
import { usePasswordForm } from "./hooks/passwordForm";
import CSRF from "reused/CSRF";

type Props = {
  id: number;
}

const PasswordForm = ({ id }: Props) => {
  const { methods, onSubmit, disabled } = usePasswordForm(id)
  
  return (
    <FormProvider {...methods}>
      <h3 className="text-xl">
        {('Change Password form')}
      </h3>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CSRF />
        <TextInput
          type="password"
          fieldName="password"
          label={('Password')}
        />
        <TextInput
          type="password"
          fieldName="confirmPassword"
          label={('Confirm')}
        />
        <button
          type="submit"
          className="btn btn-primary dark:btn-info w-full mt-4"
          disabled={disabled}
        >
          {('Save')}
        </button>
      </form>
    </FormProvider>
  )

}

export default PasswordForm
