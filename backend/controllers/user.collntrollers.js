import { getAllUsers, getUserById, updateDataOfUser, createUser, removeUser } from '../services/user.services.js'
import User from '../models/users.model.js'

export async function getUsers(req, res) {    
    try {
        const users = await getAllUsers()
        if(users)
            res.json(users)
        else
            res.send('Nothing Users')
    } catch (err) {
        res.status(500).json(err)
     }
}

export async function getUser(req, res) {
    try {
        const id = req.params.id
        res.json(await getUserById(id))
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.params.id
        const body = req.body
        await updateDataOfUser(id, body)
        res.send('User updated')
    } catch (err) {
        res.status(500).json(`Error: ${ err.message }`)
    }
}

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


export async function deleteUser(req, res) {
    try {
        const id = req.params.id
        await removeUser(id)
        res.status(200)
        res.send('User deleted')
    } catch (err) {
        res.status(500).json(`Error: ${ err.message }`)
    }
}


