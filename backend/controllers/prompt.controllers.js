import { createPrompt, getPromptsByUser, getAllPrompts, sendPromptToAI } from '../services/prompt.services.js'
import { getCategoryById } from '../services/category.services.js'
import SubCategory from '../models/subCategory.model.js'

/** Sends a prompt to OpenAI and saves the response. Falls back to mock if AI is unavailable */
export async function submitPrompt(req, res) {
    try {
        const { user_id, category_id, sub_category_id, prompt } = req.body
        const category = await getCategoryById(category_id)
        const subCategory = await SubCategory.findById(sub_category_id)
        let response
        try {
            response = await sendPromptToAI(prompt, category.name, subCategory.name)
        } catch {
            response = `[Mock Response] Here is a lesson about ${subCategory.name} in ${category.name}: ${prompt} - This is a simulated AI response for development purposes.`
        }
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

/** Returns all prompts across all users (admin only) */
export async function getAllHistory(req, res) {
    try {
        res.json(await getAllPrompts())
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
