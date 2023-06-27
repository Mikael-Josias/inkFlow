import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().regex(/^[A-Za-z\s]+$/),
  email: z.string().email(),
  password: z.string().min(8),
})
