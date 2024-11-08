import { createOrUpdateSplit, getTransactionSplits } from '@src/controllers/transaction'
import { authMiddleware } from '@src/middleware/authMiddleware'
import express from 'express'

const router: express.Router = express.Router()

router.post('/:transactionId/splits', authMiddleware, createOrUpdateSplit)

router.get('/:transactionId/splits', authMiddleware, getTransactionSplits)

export default router
