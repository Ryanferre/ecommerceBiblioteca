import { z } from 'zod'


export const createUserSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome inválido'),

  clerkUserId: z
    .string()
    .min(10)
    .max(50)
})