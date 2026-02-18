import * as z from "zod"

export const emailSch = z.object({
    email: z.email().trim()
        .min(6, { message: 'Required' })
})

const serverValidationError = z.object({
    key: z.literal('email'),
    msg: z.string(),
})

export const serverValidationErrors = z.array(serverValidationError)

export type Email = z.infer<typeof emailSch>
export type ServerValidationError = z.infer<typeof serverValidationError>
