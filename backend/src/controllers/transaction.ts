import { AuthRequest } from '@src/middleware/authMiddleware'
import { prisma } from '@src/prisma'
import { Response } from 'express'
import { z } from 'zod'

export async function createOrUpdateSplit(req: AuthRequest, res: Response) {
  const userId = req.userId
  const transactionId = parseInt(req.params.transactionId, 10)

  const bodyValidationResult = createSplitSchema.safeParse(req.body)

  if (!bodyValidationResult.success) {
    return res.status(400).json({ error: `Invalid data: ${bodyValidationResult.error.message}` })
  }

  const { splits } = bodyValidationResult.data

  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        account: { userId }
      }
    })

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found for the given account' })
    }

    await Promise.all(
      splits.map(async ({ contactId, amount }) => {
        const paymentRequestPayload = { status: 'PENDING', requestedAt: new Date() }
        await prisma.split.upsert({
          where: {
            transactionId_contactId: {
              transactionId,
              contactId
            }
          },
          update: { amount },
          create: {
            transactionId,
            contactId,
            amount,
            paymentRequest: { create: paymentRequestPayload }
          }
        })
      })
    )

    const splitResults = await prisma.split.findMany({
      where: { transactionId },
      select: {
        amount: true,
        status: true,
        contact: { select: { id: true, name: true } },
        paymentRequest: { select: { id: true, status: true, requestedAt: true } }
      }
    })

    res.status(200).json({ transactionId, splits: splitResults })
  } catch (error) {
    console.error('Error creating or updating splits:', error)
    res.status(500).json({ error: 'An error occurred while processing the splits' })
  }
}

const createSplitSchema = z.object({
  splits: z.array(
    z.object({
      contactId: z.number(),
      amount: z.number()
    })
  )
})
