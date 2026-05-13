import User from '../models/users.model.js'

/** Returns all users from the database */
export async function getAllUsers() {
    return await User.find()
}

/** Returns a single user by MongoDB ID */
export async function getUserById(id) {
    return await User.findById(id)
}

/** Updates user fields by ID */
export async function updateDataOfUser(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true })
}

/** Creates a new user document */
export async function createUser(user) {
    return await User.create(user)
}

/** Deletes a user by ID */
export async function removeUser(id) {
    return await User.findByIdAndDelete(id)
}
