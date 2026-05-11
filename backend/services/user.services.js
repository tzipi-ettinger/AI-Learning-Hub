import User from '../models/users.model.js'

export async function getAllUsers() {
    return await User.find()
}

export async function getUserById(id) {
    return await User.findById(id)
}

export async function updateDataOfUser(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true })
}


export async function createUser(user) {
    return await User.create(user)
}

export async function removeUser(id) {
    return await User.findByIdAndDelete(id)
}