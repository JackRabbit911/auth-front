import * as z from "zod"

export const authData = z.object({
    email: z.email().trim()
        .min(6, { message: 'Required' }),
    password: z.string().min(1, "Required"),
    remember: z.boolean(),
})

export type AuthData = z.infer<typeof authData>
