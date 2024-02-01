import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get workouts
// @route GET /api/workouts/
// @access Private
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createAt: 'desc'
		},
		include: {
			exercise: true
		}
	})

	res.json(workouts)
})

// @desc Get workout
// @route GET /api/workouts/:id
// @access Private
export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: req.params.id
		},
		include: {
			exercises: true
		}
	})

  if(!workout) {
    return res.status(404).json({message:'Тренировка не найдена!'})
  }

	res.json({ ...workout })
})

// @desc Create new workout
// @route POST /api/workouts/
// @access Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
      exercise: {
        connect: exerciseIds.map((id) => ({ id: +id }))
      }
		}		
	})

	res.json(workout)
})

// @desc Update workout
// @route PUT /api/workouts/:id
// @access Private
export const updateWorkout = asyncHandler(async (req, res) => {
	try {
		const { name, exerciseIds } = req.body

		const workout = await prisma.workout.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name,
				exercise: {
					set: exerciseIds.map((id) => ({ id: +id }))
				}
			}
		})

		res.json(workout)
	} catch (e) {
		res.status(404).json({ message: 'Тренировка не найдена!' })
	}
})

// @desc Delete workout
// @route DELETE /api/workouts/:id
// @access Private
export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		await prisma.workout.delete({
			where: {
				id: Number(req.params.id)
			}
		})

		res.json({ message: 'Тренировка удалена!' })
	} catch (e) {
		res.status(404).json({ message: 'Тренировка не найдена!' })
	}
})
