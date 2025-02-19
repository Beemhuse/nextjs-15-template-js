import Link from 'next/link'
import React from 'react'

export default function layout({ children }) {
  return (
    <div className="flex flex-grow w-full gap-4">
      <aside className="border flex flex-col border-red-500 p-4 h-screen">
        <Link href="/d">dashboard</Link>
        <Link href="d/settings">settings</Link>
        <Link href="d/resourcing">settings</Link>
      </aside>
      <div className="grow-1 w-full">
        <header className="p-4 border border-green-300 w-full">
          This is the header
        </header>

        {children}
      </div>
    </div>
  )
}
