import { api } from './api'

type SignUpProps = {
  name: string,
  email: string,
  password: string,
}

export const signUpUser = async (data: SignUpProps) => {
  const response = await api.post('/user', data)
  return response.data
}