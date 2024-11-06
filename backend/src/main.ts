import express from 'express'
import authRoutes from '@src/routes/auth'
import accountsRoutes from '@src/routes/accounts'

const app = express()
const port = 3000

app.use(express.json())

app.use('/auth', authRoutes)

// Protected routes
app.use('/accounts', accountsRoutes)

app.listen(port, () => {
  console.log(`Bill Splitting app listening on port ${port}`)
})
