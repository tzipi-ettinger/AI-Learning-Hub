import { getAllUsers, getUserById, updateDataOfUser, createUser, removeUser } from '../services/user.services.js'
import User from '../models/users.model.js'
import jwt from 'jsonwebtoken'

/** Returns paginated users with session count — supports ?page=1&limit=10 */
export async function getUsers(req, res) {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const [users, total] = await Promise.all([
            User.find().skip(skip).limit(limit),
            User.countDocuments()
        ])
        const Prompt = (await import('../models/prompt.model.js')).default
        const usersWithCount = await Promise.all(users.map(async (u) => ({
            ...u.toObject(),
            sessionCount: await Prompt.countDocuments({ user_id: u._id })
        })))
        res.json({ users: usersWithCount, total, page, totalPages: Math.ceil(total / limit) })
    } catch (err) {
        res.status(500).json(err)
    }
}

/** Returns a single user by ID */
export async function getUser(req, res) {
    try {
        res.json(await getUserById(req.params.id))
    } catch (err) {
        res.status(500).json(err)
    }
}

/** Updates a user by ID */
export async function updateUser(req, res) {
    try {
        await updateDataOfUser(req.params.id, req.body)
        res.send('User updated')
    } catch (err) {
        res.status(500).json(`Error: ${err.message}`)
    }
}

/** Registers a new user or logs in if phone already exists */
export async function addUser(req, res) {
    try {
        const { name, phone } = req.body
        let user = await User.findOne({ phone })
        if (!user) user = await createUser({ name, phone })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json({ user, token })
    } catch (err) {
        console.error('addUser error:', err.message)
        res.status(500).json({ message: err.message })
    }
}

/** Deletes a user by ID */
export async function deleteUser(req, res) {
    try {
        await removeUser(req.params.id)
        res.status(200).send('User deleted')
    } catch (err) {
        res.status(500).json(`Error: ${err.message}`)
    }
}
