import Category from '../models/category.model.js'
import SubCategory from '../models/subCategory.model.js'

/** Returns all categories */
export async function getAllCategories() {
    return await Category.find()
}

/** Returns a single category by ID */
export async function getCategoryById(id) {
    return await Category.findById(id)
}

/** Creates a new category */
export async function createCategory(data) {
    return await Category.create(data)
}

/** Updates a category by ID */
export async function updateDataOfCategory(id, data) {
    return await Category.findByIdAndUpdate(id, data, { new: true })
}

/** Deletes a category by ID */
export async function removeCategory(id) {
    return await Category.findByIdAndDelete(id)
}

/** Returns all subcategories belonging to a category */
export async function getSubCategoriesByCategoryId(category_id) {
    return await SubCategory.find({ category_id })
}

/** Creates a new subcategory */
export async function createSubCategory(data) {
    return await SubCategory.create(data)
}
