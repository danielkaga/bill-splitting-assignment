import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const configSchema = z
  .object({
    JWT_SECRET: z.string(),
    CORS_ALLOWED_ORIGINS: z.string()
  })
  .transform((obj) => ({
    ...obj,
    CORS_ALLOWED_ORIGINS: obj.CORS_ALLOWED_ORIGINS.split(',')
  }))

export const config = configSchema.parse(process.env)
