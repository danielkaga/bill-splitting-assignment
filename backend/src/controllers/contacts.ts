import { Response } from 'express'
import { prisma } from '@src/prisma'
import { AuthRequest } from '@src/middleware/authMiddleware'

export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(400).json({ error: 'Authorization error: Invalid user ID' })
    }

    const contacts = await prisma.contact.findMany({
      where: { userId },
      select: {
        id: true,
        name: true
      }
    })

    res.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ error: 'An error occurred while fetching contacts' })
  }
}
