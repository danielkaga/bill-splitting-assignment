import express from 'express'
import authRoutes from '@src/routes/auth'

const app = express()
const port = 3000

app.use(express.json())
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

app.listen(port, () => {
  console.log(`Bill Splitting app listening on port ${port}`)
})
