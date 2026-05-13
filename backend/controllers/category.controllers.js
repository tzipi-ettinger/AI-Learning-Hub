import { getAllCategories, getCategoryById, createCategory, updateDataOfCategory, removeCategory, getSubCategoriesByCategoryId, createSubCategory } from '../services/category.services.js'

/** Returns all categories */
export async function getCategories(req, res) {
    try {
        res.json(await getAllCategories())
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Returns a single category by ID */
export async function getCategory(req, res) {
    try {
        res.json(await getCategoryById(req.params.id))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Creates a new category */
export async function addCategory(req, res) {
    try {
        res.status(201).json(await createCategory(req.body))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Updates a category by ID */
export async function updateCategory(req, res) {
    try {
        res.json(await updateDataOfCategory(req.params.id, req.body))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Deletes a category by ID */
export async function deleteCategory(req, res) {
    try {
        await removeCategory(req.params.id)
        res.json({ message: 'Category deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Returns all subcategories for a given category ID */
export async function getSubCategories(req, res) {
    try {
        res.json(await getSubCategoriesByCategoryId(req.params.id))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/** Creates a new subcategory under a category */
export async function addSubCategory(req, res) {
    try {
        res.status(201).json(await createSubCategory({ ...req.body, category_id: req.params.id }))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
