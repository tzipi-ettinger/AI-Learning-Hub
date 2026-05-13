/** Category routes - handles categories and subcategories */
import express from 'express'
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory, getSubCategories, addSubCategory } from '../controllers/category.controllers.js'
import { validateCategory } from '../middlewares/validateCategory.middleware.js'

const router = express.Router()

router.get('/', getCategories)                          // GET all categories
router.get('/:id', getCategory)                         // GET category by ID
router.post('/', validateCategory, addCategory)         // CREATE category
router.put('/:id', validateCategory, updateCategory)    // UPDATE category
router.delete('/:id', deleteCategory)                   // DELETE category
router.get('/:id/subcategories', getSubCategories)      // GET subcategories by category
router.post('/:id/subcategories', addSubCategory)       // CREATE subcategory

export default router
