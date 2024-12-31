'use client'

import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { GoalList } from '@/components/GoalList'
import { CategoryTabs } from '@/components/CategoryTabs'
import { theme, type Category, poppins, caveat } from '@/lib/theme'
import { Plus } from 'lucide-react'
import GoalInputModal from '@/components/GoalInputModal'

const GlobalStyle = createGlobalStyle`
  :root {
    --font-poppins: ${poppins.style.fontFamily};
    --font-caveat: ${caveat.style.fontFamily};
  }
  
  body {
    background-color: ${props => props.theme.colors.background};
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.ui};
    color: ${props => props.theme.colors.text.primary};
  }

  * {
    box-sizing: border-box;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  background-color: ${props => props.theme.colors.surface};
  min-height: 100vh;
  box-shadow: ${props => props.theme.shadows.large};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 32px;
  }
`

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.ui};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.text.primary};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
    margin-bottom: 32px;
  }
`

const Progress = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  height: 8px;
  margin: 24px 0;
  overflow: hidden;
`

const ProgressBar = styled.div<{ $width: number }>`
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  height: 100%;
  width: ${props => props.$width}%;
  transition: width 0.3s ease-in-out;
`

const ProgressText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 24px;
`

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: scale(1.1) rotate(90deg);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`

interface Goal {
  id: string
  text: string
  date: Date
  category: Category
  isCompleted: boolean
}

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const savedGoals = localStorage.getItem('goals2025')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals, (key, value) => {
        if (key === 'date') return new Date(value)
        return value
      }))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('goals2025', JSON.stringify(goals))
  }, [goals])

  const addGoal = (text: string, date: Date, category: Category) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      text,
      date,
      category,
      isCompleted: false
    }
    setGoals([...goals, newGoal])
  }

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
    ))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const reorderGoals = (newGoals: Goal[]) => {
    setGoals(newGoals)
  }

  const updateCategory = (id: string, category: Category) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, category } : goal
    ))
  }

  const filteredGoals = activeCategory === 'all'
    ? goals
    : goals.filter(goal => goal.category === activeCategory)

  const usedCategories = Array.from(new Set(goals.map(goal => goal.category)))

  const progressPercentage = (goals.length / 100) * 100

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Title>Metas 2025</Title>
        <Progress>
          <ProgressBar $width={progressPercentage} />
        </Progress>
        <ProgressText>
          {goals.length} de 100 metas definidas ({progressPercentage.toFixed(0)}%)
        </ProgressText>
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={usedCategories}
        />
        <GoalList
          goals={filteredGoals}
          onToggleGoal={toggleGoal}
          onDeleteGoal={deleteGoal}
          onReorderGoals={reorderGoals}
          onUpdateCategory={updateCategory}
        />
      </Container>
      <FloatingActionButton onClick={() => setIsModalOpen(true)}>
        <Plus size={24} />
      </FloatingActionButton>
      <GoalInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddGoal={addGoal}
      />
    </ThemeProvider>
  )
}

