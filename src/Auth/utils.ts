import type { SubmitHandler } from "react-hook-form"
import { authData, type AuthData } from "./schema"
import ajax from "common/ajax"
import { loginUri } from "common/constants"
import store from "store"

export const onSubmit: SubmitHandler<AuthData> = (data) => {
    const valid = authData.safeParse(data)

    if (valid?.error) {
        console.log(valid.error, data)
    }

    if (valid?.success && valid?.data) {
        ajax.post(loginUri, valid.data)
            .then((response) => response.data)
            .then((data) => {
                if (data.success) {
                    const referer = store.getState().referer.referer
                    window.location.href = referer
                } else {
                    console.error(data.error)
                }
            })
    }
}

export const getReferer = () => (
    document.referrer === window.location.href ?
        window.location.origin :
        document.referrer
)
