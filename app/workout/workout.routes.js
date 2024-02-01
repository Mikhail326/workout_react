import express from 'express'
import { checkedAuth } from '../middleware/auth.middleware.js'
import {
	getWorkout,
	createNewWorkout,
	updateWorkout,
	deleteWorkout,
  getWorkouts
} from './workout.controller.js'

const router = express.Router()

router.route('/').get(checkedAuth, getWorkouts)
router.route('/').post(checkedAuth, createNewWorkout)
router.route('/:id').get(checkedAuth, getWorkout)
router.route('/:id').put(checkedAuth, updateWorkout)
router.route('/:id').delete(checkedAuth, deleteWorkout)

export default router
