/** Validates that name is present in the request body */
export function validateCategory(req, res, next) {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'name is required' })
    next()
}
