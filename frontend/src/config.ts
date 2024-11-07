import { z } from 'zod'

const configSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_BASE_URL: z.string()
})

export const config = configSchema.parse(import.meta.env)
