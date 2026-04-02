import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { isObjectEmpty } from "common/utils";
import { useAuthMutation } from "common/api";
import { useAppSelector } from "store/hooks";
import { authData, serverValidationErrors, type AuthData, type AuthValidationError } from "./schema";

export const useAuthForm = () => {
    const [auth, { isLoading, isError, error }] = useAuthMutation()
    const referer = useAppSelector((state) => state.referer.referer)
    const responseStatus = { isLoading, isError, error }

    const methods = useForm({
        resolver: zodResolver(authData),
        reValidateMode: "onChange",
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
    })

    const onSubmit: SubmitHandler<AuthData> = async (data) => {
        const valid = authData.safeParse(data)

        if (valid?.error) {
            console.log(valid.error, data)
        }

        if (valid?.success && valid?.data) {
            const data = await auth(valid.data).unwrap()

            if (data.success) {
                window.location.href = referer
            } else {
                const validError = serverValidationErrors.safeParse(data.error)

                if (validError.success === false) {
                    console.log(validError)
                } else if (data.error) {
                    data.error.forEach((item: AuthValidationError) => {
                        methods.setError(item.key, {
                            type: 'server',
                            message: item.msg,
                        })
                    })
                }
            }
        }
    }

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        methods.watch('email') === '' ||
        methods.watch('password') === ''

    return { methods, onSubmit, disabled, responseStatus }
}
