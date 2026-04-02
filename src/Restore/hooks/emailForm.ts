import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { isObjectEmpty } from "common/utils"
import { useAppDispatch } from "store/hooks"
import { setUsername } from "store/username"
import { useEmailCheckMutation } from "common/api"
import { emailSch, serverValidationErrors } from "Restore/schema"
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

    const onSubmit = useCallback(async (data: Email) => {
        const valid = emailSch.safeParse(data)

        if (valid?.error) {
            console.log(valid.error, data)
        }

        if (valid?.success && valid?.data) {
            const data = await emailCheck(valid.data).unwrap()
            
            if (data.success) {
                dispatch(setUsername(data?.result))
                navigate("/recovery/alert/info")
            } else {
                const validError = serverValidationErrors.safeParse(data.error)
                if (validError.success === false) {
                    console.log(validError)
                } else if (data.error) {
                    data?.error.forEach((item: EmailValidationError) => {
                        methods.setError(item.key, {
                            type: 'server',
                            message: item.msg,
                        })
                    })
                }
            }
        }
    }, [])

    const emailIsValid = () =>
        emailSch.safeParse(methods.watch()).success
    const disabled = !isObjectEmpty(methods.formState.errors) || !emailIsValid()

    return { methods, onSubmit, disabled, responseStatus }
}
