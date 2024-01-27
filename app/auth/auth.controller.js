import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { generateToken } from './generate-token.js'

// @desc Auth user
// @route POST /api/auth/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await prisma.user.findFirst({
		where: {
			email
		}
	})

	const verifyPassword = user.password === password

	if (user && verifyPassword) {
		const token = generateToken(user.id)
		return res.json({ user, token })
	} else {
		return res.status(401).json({ message: 'Логин или пароль не верный!' })
	}
})

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveEmail = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isHaveEmail) {
		return res
			.status(400)
			.json({ message: 'Такой пользователь уже зарегестрирован!' })
	}

	const user = await prisma.user.create({
		data: {
			email,
			password
		}
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
