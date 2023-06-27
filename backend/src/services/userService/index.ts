import { createUser, getUserByEmail } from '@/repositories'
import { ConflictError, InternalError } from '@/errors'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function createNewUser(name: string, email: string, password: string) {
  const emailAlreadyExists = await getUserByEmail(email)
  if (emailAlreadyExists) throw ConflictError('Email already used!')

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)
    
  try {
    await createUser(name, email, hashedPassword, '')
  } catch (error) {
    console.log(error)
    throw InternalError('Unexpected error!')
  }
}