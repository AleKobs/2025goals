import React, { useState } from 'react'
import styled from 'styled-components'
import { theme, type Category } from '@/lib/theme'
import { X, Calendar } from 'lucide-react'
import { CategorySelect } from '@/components/CategorySelect'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: ${props => props.theme.shadows.large};
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const ModalTitle = styled.h2`
  font-family: ${props => props.theme.fonts.ui};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text.primary};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Input = styled.textarea`
  width: 100%;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 12px;
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.content};
  font-size: 1.2rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
  }
`

const DateInput = styled.input`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 12px;
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.ui};
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-family: ${props => props.theme.fonts.ui};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`

interface GoalInputModalProps {
  isOpen: boolean
  onClose: () => void
  onAddGoal: (text: string, date: Date, category: Category) => void
}

export default function GoalInputModal({ isOpen, onClose, onAddGoal }: GoalInputModalProps) {
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date('2025-12-31'))
  const [category, setCategory] = useState<Category>('naoCategorizada')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddGoal(text.trim(), date, category)
      setText('')
      setCategory('naoCategorizada')
      onClose()
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Adicionar Nova Meta</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Descreva sua meta para 2025..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div>
            <label htmlFor="date">Data limite</label>
            <DateInput
              type="date"
              id="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              max="2025-12-31"
            />
          </div>
          <CategorySelect
            selectedCategory={category}
            onSelectCategory={setCategory}
          />
          <SubmitButton type="submit">Adicionar Meta</SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

