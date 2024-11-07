import { z } from 'zod'

const configSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:3000'),
  VITE_BASE_URL: z.string().default('/')
})

export const config = configSchema.parse(import.meta.env)
