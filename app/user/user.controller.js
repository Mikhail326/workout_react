import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { userProfile } from '../utils/user.utils.js'

// @desc Get user profile
// @route POST /api/user/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: 1
		},
		select: userProfile
	})

	res.json(user)
})
