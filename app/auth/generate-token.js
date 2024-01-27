import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export const generateToken = (userId) => {
	return jwt.sign(
		{
			userId
		},
		SECRET,
		{
			expiresIn: '10d'
		}
	)
}
