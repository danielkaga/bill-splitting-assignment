import { Response } from 'express'
import { prisma } from '@src/prisma'
import { AuthRequest } from '@src/middleware/authMiddleware'

export const getAccounts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(400).json({ error: 'Authorization error: Invalid user ID' })
    }

    const accounts = await prisma.account.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        user: { select: { name: true } }
      }
    })

    const accountsWithBalances = await Promise.all(
      accounts.map(async (account) => {
        const { _sum } = await prisma.transaction.aggregate({
          where: { accountId: account.id },
          _sum: {
            amount: true
          }
        })

        return {
          ...account,
          balance: _sum.amount || 0
        }
      })
    )

    res.json(accountsWithBalances)
  } catch (error) {
    console.error('Error fetching accounts:', error)
    res.status(500).json({ error: 'An error occurred while fetching accounts' })
  }
}

export const getTransactionsByAccountId = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const { accountId } = req.params

  try {
    const transactions = await prisma.transaction.findMany({
      where: { accountId: parseInt(accountId, 10), account: { userId } },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        type: true,
        vendor: { select: { name: true, iconUrl: true, category: true } }
      }
    })

    res.json(transactions)
  } catch (error) {
    console.error(`Error fetching transactions for account ${accountId}:`, error)
    res.status(500).json({ error: 'An error occurred while fetching transactions' })
  }
}
