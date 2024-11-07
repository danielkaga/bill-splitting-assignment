import express from 'express'
import { authMiddleware } from '@src/middleware/authMiddleware'
import { getContacts } from '@src/controllers/contacts'

const router: express.Router = express.Router()

// Retrieve a list of contacts for the authenticated user
router.get('/', authMiddleware, getContacts)

export default router
