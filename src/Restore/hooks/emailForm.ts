import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"

import ajax from "common/ajax"
import { useForm } from "react-hook-form"
import { useAppDispatch } from "store/hooks"
import { isObjectEmpty } from "common/utils"
import { setUsername } from "store/username"
import { emailCheckUri } from "common/constants"
import { emailSch, serverValidationErrors } from "Restore/schema"

import type { Email, ServerValidationError } from "Restore/schema"

export const useEmailForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const methods = useForm({
        resolver: zodResolver(emailSch),
        reValidateMode: "onChange",
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = (data: Email) => {
        const valid = emailSch.safeParse(data)

        if (valid?.error) {
            console.log(valid.error, data)
        }

        if (valid?.success && valid?.data) {
            ajax.post(emailCheckUri, valid.data)
                .then((response) => response.data)
                .then((data) => {
                    if (data.success) {
                        dispatch(setUsername(data.result.name))
                        navigate("/recovery/alert/info")
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

    const emailIsValid = () =>
        emailSch.safeParse(methods.watch()).success

    const disabled = !isObjectEmpty(methods.formState.errors) || !emailIsValid()

    return { methods, onSubmit, disabled }
}
