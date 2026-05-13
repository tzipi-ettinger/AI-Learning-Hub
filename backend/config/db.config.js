/** Connects to MongoDB using the URI from environment variables */
import { connect } from 'mongoose'

export const connectDB = async () => {
    await connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
}
