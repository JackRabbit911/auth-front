import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useCallback, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { isObjectEmpty } from "common/utils"
import { emailCheckThunk } from "store/username"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { emailSch, serverValidationErrors } from "Restore/schema"
import type { Email, ServerValidationError } from "Restore/schema"

export const useEmailForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((state) => state.common)

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
            const data = await dispatch(emailCheckThunk(valid.data)).unwrap()

            if (data.success) {
                navigate("/recovery/alert/info")
            } else {
                const validError = serverValidationErrors.safeParse(data.error)
                if (validError.success === false) {
                    console.log(validError)
                } else if (data.error) {
                    data?.error.forEach((item: ServerValidationError) => {
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

    useEffect(() => {
        if (error) {
            navigate(`/error/${error}`)
        }
    }, [error])

    return { methods, onSubmit, disabled, loading }
}
