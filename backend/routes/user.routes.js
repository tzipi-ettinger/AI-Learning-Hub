/** User routes - handles registration, login and user management */
import express from 'express'
import { getUsers, getUser, updateUser, addUser, deleteUser } from "../controllers/user.collntrollers.js"
import { validateUser } from '../middlewares/validateUser.middleware.js'

const router = express.Router()

router.get('/', getUsers)           // GET all users
router.get('/:id', getUser)         // GET user by ID
router.put('/:id', validateUser, updateUser)  // UPDATE user
router.post('/', validateUser, addUser)       // REGISTER or LOGIN
router.delete('/:id', deleteUser)   // DELETE user

export default router
