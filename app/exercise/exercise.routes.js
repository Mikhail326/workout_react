import express from 'express'
import { checkedAuth } from '../middleware/auth.middleware.js'
import { createNewExercise, allExercises, updateExercise, deleteExercise } from './exercise.controller.js'

const router = express.Router()

router.route('/').post(checkedAuth, createNewExercise)
router.route('/').get(checkedAuth, allExercises)
router.route('/:id').put(checkedAuth, updateExercise)
router.route('/:id').delete(checkedAuth, deleteExercise)

export default router