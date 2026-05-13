import Prompt from '../models/prompt.model.js'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

/**
 * Sends a prompt to OpenAI GPT and returns the AI-generated lesson.
 * @param {string} promptText - The user's question
 * @param {string} categoryName - Selected category name
 * @param {string} subCategoryName - Selected subcategory name
 */
export async function sendPromptToAI(promptText, categoryName, subCategoryName) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are a helpful teacher. Provide clear and structured lessons. Keep your response concise, maximum 10 lines.' },
            { role: 'user', content: `Category: ${categoryName}, Sub-category: ${subCategoryName}. ${promptText}` }
        ]
    })
    return completion.choices[0].message.content
}

/** Saves a prompt and its AI response to the database */
export async function createPrompt(data) {
    return await Prompt.create(data)
}

/** Returns all prompts for a specific user, sorted by newest first */
export async function getPromptsByUser(user_id) {
    return await Prompt.find({ user_id })
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name')
        .sort({ createdAt: -1 })
}

/** Returns all prompts across all users with full details (admin use) */
export async function getAllPrompts() {
    return await Prompt.find()
        .populate('user_id', 'name phone')
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name')
        .sort({ createdAt: -1 })
}
