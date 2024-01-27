import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Create new exercise
// @route POST /api/exercises/
// @access Private
export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, pathIcon } = req.body

	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			pathIcon
		}
	})

	res.json(exercise)
})

// @desc All exercise
// @route GET /api/exercises/
// @access Private
export const allExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany()

	res.json(exercises)
})