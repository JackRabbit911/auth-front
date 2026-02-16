import * as z from "zod"

export const authData = z.object({
    email: z.email().trim()
        .min(6, { message: 'Required' }),
    password: z.string().min(5, "Password must be at least 5 characters"),
    remember: z.boolean(),
})

export type AuthData = z.infer<typeof authData>
