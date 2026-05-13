/** Validates that name and phone are present in the request body */
export function validateUser(req, res, next) {
    const { name, phone } = req.body
    if (!name || !phone) return res.status(400).json({ message: 'name and phone are required' })
    next()
}
