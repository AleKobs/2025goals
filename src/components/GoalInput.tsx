import React, { useState } from 'react'
import styled from 'styled-components'
import { theme, type Category } from '@/lib/theme'
import { Calendar, HelpCircle } from 'lucide-react'
import Tooltip from '@/components/Tooltip'
import CategoryModal from '@/components/CategoryModal'

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${props => props.theme.colors.surface};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Input = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.content};
  font-size: 1.2rem;
  outline: none;
  resize: none;
  min-height: 80px;

  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
  }
`

const ControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.surfaceLight};
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.text.secondary};
  font-family: ${props => props.theme.fonts.ui};
  font-size: 14px;
`

const DateInput = styled.input`
  background: ${props => props.theme.colors.surfaceLight};
  border: none;
  color: ${props => props.theme.colors.text.primary};
  padding: 8px 12px;
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.ui};
  font-size: 14px;
  outline: none;
  cursor: pointer;
  width: 130px;
`

const AddButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-family: ${props => props.theme.fonts.ui};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`

interface GoalInputProps {
  onAddGoal: (text: string, date: Date, category: Category) => void
}

export function GoalInput({ onAddGoal }: GoalInputProps) {
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date('2025-12-31'))
  const [category, setCategory] = useState<Category>('naoCategorizada')
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddGoal(text.trim(), date, category)
      setText('')
      setCategory('naoCategorizada')
    }
  }

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Input
        placeholder="Adicione sua meta para 2025..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ControlsContainer>
        <DateContainer>
          <Calendar size={16} />
          <span>Até</span>
          <DateInput
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </DateContainer>
        <button type="button" onClick={() => setIsCategoryModalOpen(true)}>
          {theme.categories[category].label}
        </button>
        <AddButton type="submit">Adicionar Meta</AddButton>
        <Tooltip content="Defina até 100 metas para 2025">
          <HelpCircle size={16} />
        </Tooltip>
      </ControlsContainer>
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelectCategory={(newCategory) => {
          setCategory(newCategory)
          setIsCategoryModalOpen(false)
        }}
        currentCategory={category}
      />
    </InputContainer>
  )
}

