import { Response } from 'express'
import { prisma } from '@src/prisma'
import { AuthRequest } from '@src/middleware/authMiddleware'

const DUMMY_BASE_URL = 'http://dummy-url.test'
const NON_EXISTENT_TRANSACTION_ID = -1

export const getContacts = async (req: AuthRequest, res: Response) => {
  let transactionId: number = NON_EXISTENT_TRANSACTION_ID
  try {
    const url = new URL(req.url, DUMMY_BASE_URL)
    const transactionIdParam = url.searchParams.get('transactionId')
    if (transactionIdParam) {
      transactionId = parseInt(transactionIdParam, 10)
    }
  } catch {
    // Leave transactionId as NON_EXISTENT_TRANSACTION_ID
  }

  try {
    const userId = req.userId

    if (!userId) {
      return res.status(400).json({ error: 'Authorization error: Invalid user ID' })
    }

    const contacts = await prisma.contact.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        splits: {
          where: { transactionId },
          select: {
            transactionId: true,
            amount: true,
            status: true,
            paymentRequest: { select: { status: true, requestedAt: true } }
          }
        }
      }
    })

    res.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ error: 'An error occurred while fetching contacts' })
  }
}
