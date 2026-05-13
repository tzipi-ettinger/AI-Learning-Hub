/** Prompt routes - handles AI prompt submission and user history */
import express from 'express'
import { submitPrompt, getUserHistory } from '../controllers/prompt.controllers.js'
import { validatePrompt } from '../middlewares/validatePrompt.middleware.js'

const router = express.Router()

router.post('/', validatePrompt, submitPrompt)  // SUBMIT prompt to AI
router.get('/:userId', getUserHistory)          // GET user learning history

export default router
