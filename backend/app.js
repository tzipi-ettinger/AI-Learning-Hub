/** Express app setup - configures middleware and mounts all routes */
import express from 'express'
import cors from 'cors'
import { logger } from './middlewares/logger.middlewares.js'
import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'
import promptRoutes from './routes/prompt.routes.js'
import adminRoutes from './routes/admin.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/prompts', promptRoutes)
app.use('/api/admin', adminRoutes)

/** Global error handler */
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

export default app
