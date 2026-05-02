import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { isObjectEmpty } from "common/utils";
import { useRestorePswdMutation } from "common/api";
import { passwordSchema, type ConfirmPassword, type ConfirmValidationError } from "Restore/schema";

export const usePasswordForm = () => {
    const { id, code } = useParams()
    const navigate = useNavigate()
    const [restorePswd, { isLoading, isError, error }] = useRestorePswdMutation()
    const responseStatus = { isLoading, isError, error }

    const methods = useForm({
        resolver: zodResolver(passwordSchema),
        mode: 'all',
        defaultValues: {
            id: Number(id),
            code: code,
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit: SubmitHandler<ConfirmPassword> = useCallback(async (formData) => {
        const data = await restorePswd(formData).unwrap()
        if (data.success) {
            const link = data.result ? 'success' : 'warning'
            navigate(`/recovery/alert/${link}`)
        } else if (Array.isArray(data?.error)) {
            data.error.forEach((item: ConfirmValidationError) => {
                methods.setError(item.key, {
                    type: 'server',
                    message: item.msg,
                })
            })
        } else {
            console.error('Incorrect error structure', data?.error)
        }
    }, [])

    const password = methods.watch('password')
    const confirm = methods.watch('confirmPassword')

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        password === '' || confirm === '' || password !== confirm

    return { methods, onSubmit, disabled, responseStatus }
}
