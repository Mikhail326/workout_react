import express from 'express'
import { checkedAuth } from '../middleware/auth.middleware.js'
import { createNewExercise, allExercises } from './exercise.controller.js'

const router = express.Router()

router.route('/').post(checkedAuth, createNewExercise)
router.route('/').get(checkedAuth, allExercises)

export default router