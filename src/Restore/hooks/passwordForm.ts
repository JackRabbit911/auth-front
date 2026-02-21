import { zodResolver } from "@hookform/resolvers/zod";
import ajax from "common/ajax";
import { passwordSaveUri } from "common/constants";
import { isObjectEmpty } from "common/utils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { passwordSchema, type ConfirmPassword, type ConfirmValidationError } from "Restore/schema";

export const usePasswordForm = (id: number) => {
    const navigate = useNavigate()

    const methods = useForm({
        resolver: zodResolver(passwordSchema),
        mode: 'all',
        defaultValues: {
            id: id,
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit: SubmitHandler<ConfirmPassword> = (data) => {
        const valid = passwordSchema.safeParse(data)

        if (valid?.error) {
            console.log(valid.error, data)
        }

        if (valid?.success && valid?.data) {
            ajax.post(passwordSaveUri, valid.data)
                .then((response) => response.data)
                .then((data) => {
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
                })
        }
    }

    const password = methods.watch('password')
    const confirm = methods.watch('confirmPassword')

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        password === '' || confirm === '' || password !== confirm

    return { methods, onSubmit, disabled }
}
