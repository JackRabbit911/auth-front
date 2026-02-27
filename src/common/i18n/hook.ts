import { useEffect } from "react"

import { getTranslateThunk } from "./translate"
import { useAppDispatch, useAppSelector } from "store/hooks"

import type { Argv } from "./types"

export const useTranslate = (clock: React.DependencyList = []) => {
    const translate = useAppSelector((state) => state.translate.data)
    const dispatch = useAppDispatch()
    const translateKeys: string[] = []

    const sprintf = (str: string, ...argv: any[]): string => !argv.length ? str :
        sprintf(str.replace("%", argv.shift()), ...argv);
    
    const gettext = (value: string, ...argv: Argv): string => {
        if (!translate[value] && !translateKeys.includes(value)) {
            translateKeys.push(value)
        }
    
        return translate[value]
            ? sprintf(translate[value], ...argv)
            : sprintf(value, ...argv)
    }

    useEffect(() => {
        dispatch(getTranslateThunk(translateKeys))
    }, clock)

    return gettext
}
