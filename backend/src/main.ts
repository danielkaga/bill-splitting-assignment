import express from 'express'
import authRoutes from '@src/routes/auth'
import accountsRoutes from '@src/routes/accounts'
import cors from 'cors'
import { config } from './config'

const { CORS_ALLOWED_ORIGINS } = config

const app = express()
const port = 3000

app.use(express.json())
app.use(
  cors({
    origin: CORS_ALLOWED_ORIGINS,
    credentials: true
  })
)

app.use('/auth', authRoutes)

// Protected routes
app.use('/accounts', accountsRoutes)

app.listen(port, () => {
  console.log(`Bill Splitting app listening on port ${port}`)
})
