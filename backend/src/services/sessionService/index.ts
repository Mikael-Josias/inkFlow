import { createSession, getUserByEmail } from '@/repositories'
import { BadRequestError } from '@/errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const EXPIRES = { expiresIn: (60 * 60 * 24 * 7)} // 7 days

export async function SignInUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) throw BadRequestError('Invalid Data')

  if (!bcrypt.compareSync(password, user.password)) throw BadRequestError('Invalid Data')

  const session = await createSession(user.id)

  const token = jwt.sign({
    sessionId: session.id,
    id: user.id,
    name: user.name,
    profilePicture: user.profilePicture
  }, process.env.JWT_SECRET, EXPIRES)

  return token
}