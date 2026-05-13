/** User model - stores registered users identified by phone number */
import { Schema, model } from 'mongoose'

const UsersSchema = new Schema({
    name: { type: String, required: true, minlength: 2 },
    phone: { type: String, required: true, unique: true }
}, { timestamps: true })

const Users = model('user', UsersSchema)
export default Users
