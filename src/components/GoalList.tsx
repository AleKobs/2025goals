import React from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { type Category } from '@/lib/theme'
import { Check, X, Calendar } from 'lucide-react'
import { CategorySelect } from '@/components/CategorySelect'

const GoalItem = styled.li<{ $isDragging: boolean }>`
  background: ${props => props.$isDragging ? props.theme.colors.surfaceLight : props.theme.colors.surface};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadows.small};

  &:hover {
    box-shadow: ${props => props.theme.shadows.medium};
  }
`

const GoalContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

const GoalText = styled.span<{ $isCompleted: boolean }>`
  font-family: ${props => props.theme.fonts.content};
  font-size: 1.2rem;
  flex-grow: 1;
  color: ${props => props.$isCompleted ? props.theme.colors.text.tertiary : props.theme.colors.text.primary};
  text-decoration: ${props => props.$isCompleted ? 'line-through' : 'none'};
`

const GoalActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const CheckButton = styled(ActionButton) <{ $isCompleted: boolean }>`
  color: ${props => props.$isCompleted ? props.theme.colors.secondary : props.theme.colors.text.secondary};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`

const DeleteButton = styled(ActionButton)`
  &:hover {
    color: ${props => props.theme.colors.error};
  }
`

const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.theme.colors.text.tertiary};
  font-size: 0.8rem;
  font-family: ${props => props.theme.fonts.ui};
`

interface Goal {
  id: string
  text: string
  date: Date
  category: Category
  isCompleted: boolean
}

interface GoalListProps {
  goals: Goal[]
  onToggleGoal: (id: string) => void
  onDeleteGoal: (id: string) => void
  onReorderGoals: (goals: Goal[]) => void
  onUpdateCategory: (id: string, category: Category) => void
}

export function GoalList({ goals, onToggleGoal, onDeleteGoal, onReorderGoals, onUpdateCategory }: GoalListProps) {
  /* eslint "@typescript-eslint/no-explicit-any": "off" */
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const newGoals = Array.from(goals)
    const [reorderedGoal] = newGoals.splice(result.source.index, 1)
    newGoals.splice(result.destination.index, 0, reorderedGoal)

    onReorderGoals(newGoals)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="goals">

        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {goals.map((goal, index) => (
              <Draggable key={goal.id} draggableId={goal.id} index={index}>
                {(provided, snapshot) => (
                  <GoalItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    $isDragging={snapshot.isDragging}
                  >
                    <GoalContent>
                      <CheckButton
                        $isCompleted={goal.isCompleted}
                        onClick={() => onToggleGoal(goal.id)}
                      >
                        <Check size={16} />
                      </CheckButton>
                      <GoalText $isCompleted={goal.isCompleted}>
                        {goal.text}
                      </GoalText>
                    </GoalContent>
                    <GoalActions>
                      <CategorySelect
                        selectedCategory={goal.category}
                        onSelectCategory={(category) => onUpdateCategory(goal.id, category)}
                      />
                      <DateDisplay>
                        <Calendar size={12} />
                        <span>{goal.date.toLocaleDateString('pt-BR')}</span>
                      </DateDisplay>
                      <DeleteButton onClick={() => onDeleteGoal(goal.id)}>
                        <X size={16} />
                      </DeleteButton>
                    </GoalActions>
                  </GoalItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

