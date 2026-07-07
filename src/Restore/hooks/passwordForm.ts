import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { isObjectEmpty } from "common/utils";
import { usePostMutation } from "common/api";
import { passwordSaveUri } from "common/constants";
import { useFormServerError } from "common/formServerError";
import { passwordSchema, type ConfirmPassword } from "Restore/schema";

export const usePasswordForm = () => {
    const { id, code } = useParams()
    const navigate = useNavigate()
    const [restorePswd, { isLoading, isError, error }] = usePostMutation()
    const { handleServerError } = useFormServerError<ConfirmPassword>();
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

    const onSubmit: SubmitHandler<ConfirmPassword> = async (formData) => {
        try {
            const arg = {
                url: passwordSaveUri,
                body: formData,
            }

            const data = await restorePswd(arg).unwrap()

            if (data.success) {
                const link = data.result ? 'success' : 'warning'
                navigate("/recovery/alert/info")
                navigate(`/recovery/alert/${link}`)
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

    const password = methods.watch('password')
    const confirm = methods.watch('confirmPassword')

    const disabled = !isObjectEmpty(methods.formState.errors) ||
        password === '' || confirm === '' || password !== confirm

    return { methods, onSubmit, disabled, responseStatus }
}
