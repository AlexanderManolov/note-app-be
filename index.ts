import express from 'express'
import { configDotenv } from 'dotenv'
import MainRouter from './src/api/v1/routes'

configDotenv()
const PORT = process.env.PORT ?? '5050'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', MainRouter)

app
	.listen(PORT, () => {
		console.log('Server running at PORT: ', PORT)
	})
	.on('error', (error: Error) => {
		// gracefully handle error
		throw new Error(error.message)
	})
