import React, { useState } from 'react'
import styled from 'styled-components'
import { theme, type Category } from '@/lib/theme'
import { ChevronDown } from 'lucide-react'

const SelectContainer = styled.div`
  position: relative;
`

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.surfaceLight};
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.ui};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.surface};
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.surfaceLight};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  z-index: 10;
`

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceLight};
  }
`

const CategoryLabel = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`

const CategoryDescription = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
`

interface CategorySelectProps {
  selectedCategory: Category
  onSelectCategory: (category: Category) => void
}

export function CategorySelect({ selectedCategory, onSelectCategory }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSelect = (category: Category) => {
    onSelectCategory(category)
    setIsOpen(false)
  }

  return (
    <SelectContainer>
      <SelectButton onClick={handleToggle}>
        {theme.categories[selectedCategory].label}
        <ChevronDown size={16} />
      </SelectButton>
      {isOpen && (
        <DropdownMenu>
          {Object.entries(theme.categories).map(([key, { label, description }]) => (
            <DropdownItem key={key} onClick={() => handleSelect(key as Category)}>
              <CategoryLabel>{label}</CategoryLabel>
              <CategoryDescription>{description}</CategoryDescription>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </SelectContainer>
  )
}

