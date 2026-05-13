import { getAllUsers, getUserById, updateDataOfUser, createUser, removeUser } from '../services/user.services.js'
import User from '../models/users.model.js'

/** Returns all users */
export async function getUsers(req, res) {
    try {
        const users = await getAllUsers()
        if (users) res.json(users)
        else res.send('Nothing Users')
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
        res.status(200).json(user)
    } catch (err) {
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
