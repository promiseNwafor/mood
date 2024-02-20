import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkId = async (opts = { select: {}, includes: {} }) => {
  const { userId } = await auth()

  const user = await prisma.user.findFirstOrThrow({
    where: {
      clerkId: userId as string,
    },
  })

  return user
}
