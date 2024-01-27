import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { userProfile } from '../utils/user.utils.js'
import { prisma } from '../prisma.js'

export const checkedAuth = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		console.log(decoded)

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.userId
			},
			select: userProfile
		})

    if (userFound) {
      req.user = userFound
      next()
    } else {
      res.status(401).json({ message: 'Не авторизован!' })
    }
	}

  if(!token) {
    res.status(401).json({message:"Не авторизован, нет токена!"})
  }
})
