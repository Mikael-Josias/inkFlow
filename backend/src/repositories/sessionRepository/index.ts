import { prisma } from '@/config'

export async function createSession(userId: string) {
  return prisma.session.create({
    data: {
      userId
    }
  })
}

export async function getSession(sessionId: string) {
  return prisma.session.findUnique({
    where: {
      id: sessionId
    }
  })
}