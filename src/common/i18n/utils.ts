import store from "store";

export const translateKeys: string[] = []

const sprintf = (str: string, ...argv: any[]): string => !argv.length ? str : 
    sprintf(str = str.replace("%", argv.shift()), ...argv);

export const t = (value: string, ...argv: any[]): string => {
    const state = store.getState()
    const translate = state.translate

    // console.log(translate)

    if (!translate[value] && !translateKeys.includes(value)) {
            translateKeys.push(value)
    }

    return translate[value]
        ? sprintf(translate[value], ...argv)
        : sprintf(value, ...argv)
}

export const __ = t
