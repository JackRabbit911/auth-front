import { useEffect } from "react"

import ajax from "common/ajax"
import { translateKeys } from "./utils"
import { setTranslate } from "./translate"
import { getTranslateUri } from "common/constants"
import { useAppDispatch, useAppSelector } from "store/hooks"

export const useTranslate = (clock: React.DependencyList = []) => {
    const dispatch = useAppDispatch()
    const translate = useAppSelector((store) => store.translate)

    const getTranslateFx = async () => {
        const keys = Object.keys(translate)
        const diff = translateKeys.filter(x => !keys.includes(x));

        if (diff.length > 0) {
            const response = await ajax.post(getTranslateUri, { filter: diff })
            const result = response.data.result
            dispatch(setTranslate(result))
        }
    }

    useEffect(() => {
        getTranslateFx()
    }, clock)
}
