import { FormProvider } from "react-hook-form"

import TextInput from "reused/TextInput"
import { useEmailForm } from "./hooks/emailForm";

const Restore = () => {
  const { methods, onSubmit, disabled } = useEmailForm()
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center">
          <h1 className="text-xl">{'Password recovery'}</h1>
        </div>
        <TextInput
          fieldName="email"
          label="Email"
          optional="Enter the email you provided"
        />
        <button
          className="btn btn-primary dark:btn-info w-full my-4"
          disabled={disabled}
        >
          Send
        </button>
      </form>
    </FormProvider>
  )
}

export default Restore
