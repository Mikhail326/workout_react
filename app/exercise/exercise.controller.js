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
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createAt: 'desc'
		}
	})

	res.json(exercises)
})

// @desc Update exercise
// @route PUT /api/exercises/:id
// @access Private
export const updateExercise = asyncHandler(async (req, res) => {
	try {
		const { name, times, pathIcon } = req.body

		const exercise = await prisma.exercise.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name,
				times,
				pathIcon
			}
		})

		res.json(exercise)
	} catch (e) {
		res.status(404).json({ message: 'Упражнение не найдено!' })
	}
})

// @desc Delete exercise
// @route Delete /api/exercises/:id
// @access Private
export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		await prisma.exercise.delete({
			where: {
				id: Number(req.params.id)
			}
		})

		res.json({ message: 'Упражнение удалено!' })
	} catch (e) {
		res.status(404).json({ message: 'Упражнение не найдено!' })
	}
})
