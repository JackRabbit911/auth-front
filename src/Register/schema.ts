import * as z from "zod"

export const registerData = z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.email().min(6, { message: "Required" }),
    password: z.string().min(6, { message: "Password must be at least 5 characters" }),
    confirmPassword: z.string(),
    agree: z.boolean(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
})

const serverValidationError = z.object({
    key: z.enum(['name', 'email', 'password', 'confirmPassword']),
    msg: z.string(),
})

export const serverValidationErrors = z.array(serverValidationError)

export type RegisterData = z.infer<typeof registerData>
export type RegisterValidationError = z.infer<typeof serverValidationError>
