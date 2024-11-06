import express from 'express'
import { authMiddleware } from '@src/middleware/authMiddleware'
import { getAccounts, getTransactionsByAccountId } from '@src/controllers/accounts'

const router: express.Router = express.Router()

// Retrieve a list of accounts for the authenticated user
router.get('/', authMiddleware, getAccounts)

// Retrieve transactions for a specific account belonging to the authenticated user
router.get('/:accountId/transactions', authMiddleware, getTransactionsByAccountId)

export default router
