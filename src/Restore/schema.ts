import * as z from "zod"

export const emailSch = z.object({
    email: z.email().trim()
        .min(6, { message: 'Required' })
})

const serverValidationError = z.object({
    key: z.literal('email'),
    msg: z.string(),
})

const confirmValidationError = z.object({
    key: z.literal('confirmPassword'),
    msg: z.string(),
})

export const passwordSchema = z.object({
  id: z.number(),
  code: z.string().optional(),
  password: z.string().min(5, "Password must be at least 5 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type Email = z.infer<typeof emailSch>
export type EmailValidationError = z.infer<typeof serverValidationError>
export type ConfirmPassword = z.infer<typeof passwordSchema>
export type ConfirmValidationError = z.infer<typeof confirmValidationError>
