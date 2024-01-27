import express from 'express'
import { getUserProfile } from './user.controller.js'
import { checkedAuth } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/profile').get(checkedAuth, getUserProfile)

export default router
