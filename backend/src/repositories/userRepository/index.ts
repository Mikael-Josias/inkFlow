import { prisma } from '@/config'

export async function createUser(name: string, email: string, password: string, profilePicture: string): Promise<void> {
  await prisma.user.create({
    data: {
      name,
      email,
      password,
      profilePicture,
    }
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    }
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    }
  })
}
