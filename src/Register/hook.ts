import { useCallback } from "react"
import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { isObjectEmpty } from "common/utils"
import { useAppDispatch } from "store/hooks"
import { setUsername } from "store/username"
import { useRegisterMutation } from "common/api"
import { registerData, type RegisterData, type RegisterValidationError } from "./schema"

export const useRegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [registerFx, { isLoading, isError, error }] = useRegisterMutation()
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

    const onSubmit: SubmitHandler<RegisterData> = useCallback(async (formData) => {
        const data = await registerFx(formData).unwrap()

        if (data.success) {
            dispatch(setUsername(formData.name))
            navigate('/register/alert/info')
        } else if (Array.isArray(data?.error)) {
            data.error.forEach((item: RegisterValidationError) => {
                methods.setError(item.key, {
                    type: 'server',
                    message: item.msg,
                })
            })
        } else {
            console.error('Incorrect error structure', data?.error)
        }
    }, [])

    const { name, email, password, confirmPassword, agree } = methods.watch()

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        name === '' || email === '' || password === '' || agree === false ||
        confirmPassword === '' || password !== confirmPassword

    return { methods, onSubmit, disabled, responseStatus }
}
