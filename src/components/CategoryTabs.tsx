import * as React from 'react'
import styled from 'styled-components'
import { theme, type Category } from '@/lib/theme'

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 0;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Tab = styled.button<{ $active: boolean; $color: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.$active ? props.$color + '20' : 'transparent'};
  color: ${props => props.$active ? props.$color : props.theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 500;
  font-family: ${props => props.theme.fonts.ui};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$color + '10'};
  }
`

interface CategoryTabsProps {
  activeCategory: Category | 'all'
  onCategoryChange: (category: Category | 'all') => void
  categories: Category[]
}

export function CategoryTabs({ activeCategory, onCategoryChange, categories }: CategoryTabsProps) {
  return (
    <TabsContainer>
      <Tab
        $active={activeCategory === 'all'}
        $color={theme.colors.primary}
        onClick={() => onCategoryChange('all')}
      >
        Todas
      </Tab>
      {categories.map((category) => (
        <Tab
          key={category}
          $active={activeCategory === category}
          $color={theme.categories[category].color}
          onClick={() => onCategoryChange(category)}
        >
          {theme.categories[category].label}
        </Tab>
      ))}
    </TabsContainer>
  )
}

