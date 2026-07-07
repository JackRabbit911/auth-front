import * as z from "zod"

export const emailSch = z.object({
    email: z.email().trim()
        .min(6, { message: 'Required' })
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
export type ConfirmPassword = z.infer<typeof passwordSchema>
