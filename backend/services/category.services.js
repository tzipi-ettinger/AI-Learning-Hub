import Category from '../models/category.model.js'
import SubCategory from '../models/subCategory.model.js'

export async function getAllCategories() {
    return await Category.find()
}

export async function getCategoryById(id) {
    return await Category.findById(id)
}

export async function createCategory(data) {
    return await Category.create(data)
}

export async function updateDataOfCategory(id, data) {
    return await Category.findByIdAndUpdate(id, data, { new: true })
}

export async function removeCategory(id) {
    return await Category.findByIdAndDelete(id)
}

export async function getSubCategoriesByCategoryId(category_id) {
    return await SubCategory.find({ category_id })
}

export async function createSubCategory(data) {
    return await SubCategory.create(data)
}
