// אחראי על הניתובים בלבד

import express from 'express'
import { getUsers, getUser, updateUser, addUser, deleteUser } from "../controllers/user.collntrollers.js";
import { validateUser } from '../middlewares/validateUser.middleware.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', validateUser, updateUser)
router.post('/', validateUser, addUser)
router.delete('/:id', deleteUser)

export default router

// route -> controller -> service -> model