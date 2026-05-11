export function validatePrompt(req, res, next) {
    const { user_id, category_id, sub_category_id, prompt } = req.body
    if (!user_id || !category_id || !sub_category_id || !prompt)
        return res.status(400).json({ message: 'user_id, category_id, sub_category_id and prompt are required' })
    next()
}
