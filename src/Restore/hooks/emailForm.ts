import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"

import { emailSch } from "Restore/schema"
import { isObjectEmpty } from "common/utils"
import { useAppDispatch } from "store/hooks"
import { setUsername } from "store/username"
import { useEmailCheckMutation } from "common/api"
import type { Email, EmailValidationError } from "Restore/schema"

export const useEmailForm = () => {
    const navigate = useNavigate()
    const [emailCheck, { isLoading, isError, error }] = useEmailCheckMutation({
        fixedCacheKey: 'username',
    })
    const dispatch = useAppDispatch()
    const responseStatus = { isLoading, isError, error }


    const methods = useForm({
        resolver: zodResolver(emailSch),
        reValidateMode: "onChange",
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = useCallback(async (formData: Email) => {
        const data = await emailCheck(formData).unwrap()

        if (data.success) {
            dispatch(setUsername(data?.result))
            navigate("/recovery/alert/info")
        } else if (data.error) {
            data?.error.forEach((item: EmailValidationError) => {
                methods.setError(item.key, {
                    type: 'server',
                    message: item.msg,
                })
            })
        }  else {
            console.error('Incorrect error structure', data?.error)
        }
    }, [])

    const emailIsValid = () =>
        emailSch.safeParse(methods.watch()).success
    const disabled = !isObjectEmpty(methods.formState.errors) || !emailIsValid()

    return { methods, onSubmit, disabled, responseStatus }
}
