import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Editor from '@/components/Editor'

interface IEntryPage {
  params: any
}

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })

  return entry
}

const EntryPage: React.FC<IEntryPage> = async ({ params }) => {
  const entry = await getEntry(params.id)

  return (
    <div>
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
