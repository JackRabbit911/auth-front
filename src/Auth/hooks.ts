import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { isObjectEmpty } from "common/utils";
import { usePostMutation } from "common/api";
import { useAppSelector } from "store/hooks";
import { useFormServerError } from "common/formServerError";

import { authData, type AuthData } from "./schema";
import { loginUri } from "common/constants";

export const useAuthForm = () => {
    const [auth, { isLoading, isError, error }] = usePostMutation()
    const { handleServerError } = useFormServerError<AuthData>();
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
        try {
            const arg = {
                url: loginUri,
                body: formData,
            }

            const data = await auth(arg).unwrap()

            if (data.success) {
                window.location.href = referer
            } else {
                console.log(data);
            }
        } catch (err) {
            const isHandled = handleServerError(err, methods.setError);
            if (!isHandled) {
                console.error('Глобальная ошибка сервера (не 422):', err);
            }
        }
    }

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        methods.watch('email') === '' ||
        methods.watch('password') === ''

    return { methods, onSubmit, disabled, responseStatus }
}
