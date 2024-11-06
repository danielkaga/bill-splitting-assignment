import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const configSchema = z.object({
  JWT_SECRET: z.string()
})

export const config = configSchema.parse(process.env)
