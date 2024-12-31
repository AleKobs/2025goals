import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { TagInput } from './TagInput'

interface EnhancedGoalInputProps {
  onAddGoal: (goal: string, date: Date) => void
}

interface Tag {
  id: string
  text: string
}

export function EnhancedGoalInput({ onAddGoal }: EnhancedGoalInputProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [date, setDate] = useState<Date>(new Date('2025-12-31'))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tags.length > 0) {
      const goalText = tags.map(tag => tag.text).join(' ')
      onAddGoal(goalText, date)
      setTags([])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <TagInput tags={tags} setTags={setTags} />
      <div className="flex space-x-2">
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2"
        />
        <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </form>
  )
}

