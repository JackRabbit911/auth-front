type StrNum = string|number;

export type Argv = StrNum[];
export type GetText = (value: string, ...argv: Argv) => string;
