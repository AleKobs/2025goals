import React from 'react'
import styled from 'styled-components'
import { theme, type Category } from '@/lib/theme'
import { X } from 'lucide-react'

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
  background: ${props => props.theme.colors.background};
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
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

const CategoryList = styled.div`
  display: grid;
  gap: 12px;
`

const CategoryItem = styled.button<{ $color: string; $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${props => props.$isSelected ? props.$color + '20' : props.theme.colors.surface};
  border: 2px solid ${props => props.$isSelected ? props.$color : 'transparent'};
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$color + '10'};
  }
`

const CategoryLabel = styled.span`
  font-family: ${props => props.theme.fonts.ui};
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 4px;
`

const CategoryDescription = styled.span`
  font-family: ${props => props.theme.fonts.ui};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
`

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectCategory: (category: Category) => void
  currentCategory: Category
}

export default function CategoryModal({ isOpen, onClose, onSelectCategory, currentCategory }: CategoryModalProps) {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Selecione uma categoria</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>
        <CategoryList>
          {Object.entries(theme.categories).map(([key, { label, description, color }]) => (
            <CategoryItem
              key={key}
              $color={color}
              $isSelected={key === currentCategory}
              onClick={() => onSelectCategory(key as Category)}
            >
              <CategoryLabel>{label}</CategoryLabel>
              <CategoryDescription>{description}</CategoryDescription>
            </CategoryItem>
          ))}
        </CategoryList>
      </ModalContent>
    </ModalOverlay>
  )
}

