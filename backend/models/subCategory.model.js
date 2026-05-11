import { Schema, model } from 'mongoose'

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
}, { timestamps: true })

const SubCategory = model('subCategory', subCategorySchema)
export default SubCategory
