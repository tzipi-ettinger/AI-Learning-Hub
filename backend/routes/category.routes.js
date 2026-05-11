import express from 'express'
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory, getSubCategories, addSubCategory } from '../controllers/category.controllers.js'
import { validateCategory } from '../middlewares/validateCategory.middleware.js'

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/', validateCategory, addCategory)
router.put('/:id', validateCategory, updateCategory)
router.delete('/:id', deleteCategory)
router.get('/:id/subcategories', getSubCategories)
router.post('/:id/subcategories', addSubCategory)

export default router
