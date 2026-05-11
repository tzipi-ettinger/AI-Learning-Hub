import express from 'express'
import { getAllHistory } from '../controllers/prompt.controllers.js'
import { getUsers } from '../controllers/user.collntrollers.js'

const router = express.Router()

router.get('/users', getUsers)
router.get('/history', getAllHistory)

export default router
