import { createPrompt, getPromptsByUser, getAllPrompts, sendPromptToAI } from '../services/prompt.services.js'
import { getCategoryById } from '../services/category.services.js'
import SubCategory from '../models/subCategory.model.js'

/** Sends a prompt to OpenAI and saves the response */
export async function submitPrompt(req, res) {
    try {
        const { user_id, category_id, sub_category_id, prompt } = req.body
        const category = await getCategoryById(category_id)
        const subCategory = await SubCategory.findById(sub_category_id)
        const response = await sendPromptToAI(prompt, category.name, subCategory.name)
        const saved = await createPrompt({ user_id, category_id, sub_category_id, prompt, response })
        res.status(201).json(saved)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Returns all prompts for a specific user */
export async function getUserHistory(req, res) {
    try {
        res.json(await getPromptsByUser(req.params.userId))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Returns all prompts across all users with pagination — supports ?page=1&limit=10 */
export async function getAllHistory(req, res) {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const [history, total] = await Promise.all([
            Prompt.find().populate('user_id', 'name phone').populate('category_id', 'name').populate('sub_category_id', 'name').sort({ createdAt: -1 }).skip(skip).limit(limit),
            Prompt.countDocuments()
        ])
        res.json({ history, total, page, totalPages: Math.ceil(total / limit) })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
