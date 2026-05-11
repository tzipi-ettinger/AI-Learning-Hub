import { Schema, model } from 'mongoose'

const promptSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    sub_category_id: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    response: {
        type: String
    }
}, { timestamps: true })

const Prompt = model('prompt', promptSchema)
export default Prompt
