/** Admin routes - protected endpoints for admin dashboard */
import express from 'express'
import { getAllHistory } from '../controllers/prompt.controllers.js'
import { getUsers } from '../controllers/user.collntrollers.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/users', authMiddleware, getUsers)
router.get('/history', authMiddleware, getAllHistory)

export default router
