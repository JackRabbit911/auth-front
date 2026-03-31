import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { isObjectEmpty } from "common/utils";
import { restorePswdThunk } from "store/restorePswd";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { passwordSchema, type ConfirmPassword, type ConfirmValidationError } from "Restore/schema";

export const usePasswordForm = (id: number) => {
    const navigate = useNavigate()
    const csrf = useAppSelector((state) => state.csrf.data)
    const dispatch = useAppDispatch()

    const methods = useForm({
        resolver: zodResolver(passwordSchema),
        mode: 'all',
        defaultValues: {
            id: id,
            password: '',
            confirmPassword: '',
            _csrf: csrf,
        }
    });

    const onSubmit: SubmitHandler<ConfirmPassword> = useCallback (async (data) => {
        const valid = passwordSchema.safeParse(data)

        if (valid?.error) {
            console.log(valid.error, data)
        }

        if (valid?.success && valid?.data) {
            const data = await dispatch(restorePswdThunk(valid.data)).unwrap()
            debugger
            if (data.success) {
                navigate('/recovery/alert/success')
            } else {
                data.error.forEach((item: ConfirmValidationError) => {
                    methods.setError(item.key, {
                        type: 'server',
                        message: item.msg,
                    })
                })
            }
        }
    }, [])

    const password = methods.watch('password')
    const confirm = methods.watch('confirmPassword')

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        password === '' || confirm === '' || password !== confirm

    useEffect(() => {
        methods.setValue('_csrf', csrf)
    }, [csrf])

    return { methods, onSubmit, disabled }
}
