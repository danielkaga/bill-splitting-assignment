import express from 'express'
import { comparePassword, generateToken } from '@src/auth/utils'
import { prisma } from '@src/prisma'

const router: express.Router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const token = generateToken(user.id)

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' })
  }
})

export default router
