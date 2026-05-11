import express from 'express'
import { submitPrompt, getUserHistory } from '../controllers/prompt.controllers.js'
import { validatePrompt } from '../middlewares/validatePrompt.middleware.js'

const router = express.Router()

router.post('/', validatePrompt, submitPrompt)
router.get('/:userId', getUserHistory)

export default router
