import Prompt from '../models/prompt.model.js'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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

export async function createPrompt(data) {
    return await Prompt.create(data)
}

export async function getPromptsByUser(user_id) {
    return await Prompt.find({ user_id })
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name')
        .sort({ createdAt: -1 })
}

export async function getAllPrompts() {
    return await Prompt.find()
        .populate('user_id', 'name phone')
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name')
        .sort({ createdAt: -1 })
}
