import React, { useState } from 'react'
import styled from 'styled-components'

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipContent = styled.div<{ $visible: boolean }>`
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  background-color: ${props => props.theme.colors.surfaceLight};
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
  ${props => props.$visible && `
    opacity: 1;
  `}
`

interface TooltipProps {
  content: string
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <TooltipContent $visible={isVisible}>
        {content}
      </TooltipContent>
    </TooltipContainer>
  )
}

export default Tooltip

