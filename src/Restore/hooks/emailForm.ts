import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"

import { emailSch } from "Restore/schema"
import { isObjectEmpty } from "common/utils"
import { useAppDispatch } from "store/hooks"
import { setUsername } from "store/username"
import { usePostMutation } from "common/api"
import { emailCheckUri } from "common/constants"
import { useFormServerError } from "common/formServerError"

import type { Email } from "Restore/schema"

export const useEmailForm = () => {
    const navigate = useNavigate()
    const [emailCheck, { isLoading, isError, error }] = usePostMutation()
    const { handleServerError } = useFormServerError<Email>();
    const dispatch = useAppDispatch()
    const responseStatus = { isLoading, isError, error }


    const methods = useForm({
        resolver: zodResolver(emailSch),
        reValidateMode: "onChange",
        defaultValues: {
            email: '',
        },
    })

    const onSubmit: SubmitHandler<Email> = async (formData) => {
        try {
            const arg = {
                url: emailCheckUri,
                body: formData,
            }

            const data = await emailCheck(arg).unwrap()

            if (data.success) {
                dispatch(setUsername(data?.result))
                navigate("/recovery/alert/info")
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

    const emailIsValid = () =>
        emailSch.safeParse(methods.watch()).success
    const disabled = !isObjectEmpty(methods.formState.errors) || !emailIsValid()

    return { methods, onSubmit, disabled, responseStatus }
}
