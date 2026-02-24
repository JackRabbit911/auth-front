import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import ajax from "common/ajax"
import { isObjectEmpty } from "common/utils"
import { useAppDispatch } from "store/hooks"
import { setUsername } from "store/username"
import { registerUri } from "common/constants"
import { registerData, type RegisterData } from "./schema"
import { serverValidationErrors, type ServerValidationError } from "Restore/schema"

export const useRegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

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

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        const valid = registerData.safeParse(data)

        if (valid?.error) {
            console.log(valid.error, data)
        }

        if (valid?.success && valid?.data) {
            const response = await ajax.post(registerUri, valid.data)
            const data = response.data

            if (data.success) {
                dispatch(setUsername(data.result.name))
                navigate('/register/alert/info')
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
        }
    }

    const { name, email, password, confirmPassword, agree } = methods.watch()

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        name === '' || email === '' || password === '' || agree === false ||
        confirmPassword === '' || password !== confirmPassword

    return { methods, onSubmit, disabled }
}
