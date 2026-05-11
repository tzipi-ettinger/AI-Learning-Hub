import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    }
}, { timestamps: true })

const Category = model('category', categorySchema)
export default Category
