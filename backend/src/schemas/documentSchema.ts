import { z } from 'zod'

export const documentSchema = z.object({
  userId: z.string().uuid(),
})
