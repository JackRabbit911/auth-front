import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ajax from "common/ajax";
import { loginUri } from "common/constants";
import { useAppSelector } from "store/hooks";
import { isObjectEmpty } from "common/utils";
import { authData, serverValidationErrors, type AuthData, type ServerValidationError } from "./schema";

export const useAuthForm = () => {
    const referer = useAppSelector((state) => state.referer.referer)

    const methods = useForm({
        resolver: zodResolver(authData),
        reValidateMode: "onChange",
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
    })

    const onSubmit: SubmitHandler<AuthData> = (data) => {
        const valid = authData.safeParse(data)

        if (valid?.error) {
            console.log(valid.error, data)
        }

        if (valid?.success && valid?.data) {
            ajax.post(loginUri, valid.data)
                .then((response) => response.data)
                .then((data) => {
                    if (data.success) {
                        window.location.href = referer
                    } else {
                        const validError = serverValidationErrors.safeParse(data.error)
                        if (validError.success === false) {
                            console.log(validError)
                        } else {
                            data.error.forEach((item: ServerValidationError) => {
                                methods.setError(item.key, {
                                    type: 'server',
                                    message: item.msg,
                                })
                            })
                        }
                    }
                })
        }
    }

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        methods.watch('email') === '' ||
        methods.watch('password') === ''

    return { methods, onSubmit, disabled }
}
