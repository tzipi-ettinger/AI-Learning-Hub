/** Admin routes - protected endpoints for admin dashboard */
import express from 'express'
import { getAllHistory } from '../controllers/prompt.controllers.js'
import { getUsers } from '../controllers/user.collntrollers.js'

const router = express.Router()

router.get('/users', getUsers)      // GET all users
router.get('/history', getAllHistory) // GET all prompts history

export default router
