import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { isObjectEmpty } from "common/utils";
import { useAuthMutation } from "common/api";
import { useAppSelector } from "store/hooks";
import { authData, type AuthData, type AuthValidationError } from "./schema";

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

    const onSubmit: SubmitHandler<AuthData> = async (formData) => {
        const data = await auth(formData).unwrap()

        if (data.success) {
            window.location.href = referer
        } else {
            if (Array.isArray(data?.error)) {
                data.error.forEach((item: AuthValidationError) => {
                    methods.setError(item.key, {
                        type: 'server',
                        message: item.msg,
                    })
                })
            } else {
                console.error('Incorrect error structure', data?.error)
            }
        }
    }

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        methods.watch('email') === '' ||
        methods.watch('password') === ''

    return { methods, onSubmit, disabled, responseStatus }
}
