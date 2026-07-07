import * as z from "zod"

export const registerData = z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.email().min(6, { message: "Required" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }),
    confirmPassword: z.string(),
    agree: z.boolean(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
})

export type RegisterData = z.infer<typeof registerData>
