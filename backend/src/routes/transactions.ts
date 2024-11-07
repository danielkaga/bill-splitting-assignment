import { createOrUpdateSplit } from '@src/controllers/transaction'
import { authMiddleware } from '@src/middleware/authMiddleware'
import express from 'express'

const router: express.Router = express.Router()

router.post('/:transactionId/split', authMiddleware, createOrUpdateSplit)

export default router
