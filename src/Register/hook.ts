import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { isObjectEmpty } from "common/utils"
import { useAppDispatch } from "store/hooks"
import { setUsername } from "store/username"
import { usePostMutation } from "common/api"
import { registerUri } from "common/constants"
import { registerData, type RegisterData } from "./schema"
import { useFormServerError } from "common/formServerError"

export const useRegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [registerFx, { isLoading, isError, error }] = usePostMutation()
    const { handleServerError } = useFormServerError<RegisterData>();
    const responseStatus = { isLoading, isError, error }

    const methods = useForm({
        resolver: zodResolver(registerData),
        reValidateMode: "onChange",
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agree: true,
        }
    })

    const onSubmit: SubmitHandler<RegisterData> = async (formData) => {
        try {
            const arg = {
                url: registerUri,
                body: formData,
            }

            const data = await registerFx(arg).unwrap()

            if (data.success) {
                dispatch(setUsername(data?.result))
                navigate('/register/alert/info')
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

    const { name, email, password, confirmPassword, agree } = methods.watch()

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        name === '' || email === '' || password === '' || agree === false ||
        confirmPassword === '' || password !== confirmPassword

    return { methods, onSubmit, disabled, responseStatus }
}
