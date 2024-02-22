import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ReactElement } from 'react'

interface IDashboardLayout {
  children: ReactElement
}

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
]

const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">MOOD</span>
        </div>
        <div>
          <ul className="px-4 spac e-y-8">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
