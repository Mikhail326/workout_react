import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import authRouter from './app/auth/auth.routes.js'
import userRouter from './app/user/user.routes.js'
import exerciseRouter from './app/exercise/exercise.routes.js'
import workoutRouter from './app/workout/workout.routes.js'

import { prisma } from './app/prisma.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') {
		app.use(
			morgan(':method :url :status :res[content-length] - :response-time ms')
		)
	}
	app.use(express.json())
	app.use('/api/auth', authRouter)
	app.use('/api/auth', authRouter)
	app.use('/api/user', userRouter)
	app.use('/api/exercises', exerciseRouter)
	app.use('/api/workouts', workoutRouter)

	const PORT = process.env.PORT || 5000

	app.listen(PORT, console.log(`Сервер запущен на порту: ${PORT}`))
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})
