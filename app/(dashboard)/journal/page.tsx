import Link from 'next/link'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { analyzeEntry } from '@/utils/ai'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // analyze(`I'm going to give you a journal entry. I want you to analyze it for a few things. I need the mood, a summary, what the subject is,
  // if the entry is negative and a color representing the mood. You need to respond back in JSON format with the following
  // keys: mood, summary, subject, color, negative.
  //  entry: Today was a really good day. I finally was able to finish revamping my resume.
  //  `)

  // analyzeEntry(
  //   'Today was an okay day. I found a really good new coffee place but then I got a flat tire. :)'
  // )

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
