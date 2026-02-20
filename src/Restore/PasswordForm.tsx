import { FormProvider, type SubmitHandler, type UseFormReturn } from "react-hook-form"
import type { ConfirmPassword } from "./schema"
import TextInput from "reused/TextInput";

type Props = {
    methods: UseFormReturn<ConfirmPassword>;
    onSubmit: SubmitHandler<ConfirmPassword>;
}

const PasswordForm = ({ methods, onSubmit }: Props) => {
    return (
        <FormProvider {...methods}>
        <h3 className="text-xl">
          {('Change Password form')}
        </h3>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          >
            {('Save')}
          </button>
        </form>
      </FormProvider>
    )

}

export default PasswordForm
