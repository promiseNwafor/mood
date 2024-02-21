'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

interface IEditor {
  entry: any
}

const Editor: React.FC<IEditor> = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [currentEntry, setEntry] = useState(entry)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return
      setIsLoading(true)

      const res = await updateEntry(entry.id, { content: _value })
      const data = res?.data

      setEntry(data)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isLoading && <div>Loading...</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
