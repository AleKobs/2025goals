import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

interface Tag {
  id: string
  text: string
}

interface TagInputProps {
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export function TagInput({ tags, setTags }: TagInputProps) {
  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag])
  }

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setTags(newTags)
  }

  return (
    <ReactTags
      tags={tags}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition="inline"
      autocomplete
      classNames={{
        tags: 'flex flex-wrap gap-2',
        tagInput: 'flex-grow',
        tagInputField: 'w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2',
        tag: 'bg-pink-500 text-white px-2 py-1 rounded-full inline-flex items-center',
        remove: 'ml-2 text-white hover:text-gray-200 cursor-pointer',
      }}
    />
  )
}

