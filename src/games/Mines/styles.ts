import styled, { css, keyframes } from 'styled-components'
import { CellStatus } from './types'

// Animations
const tickingAnimation = keyframes`
  0%, 50%, 100% {
    transform: scale(1) !important;
    filter: brightness(1) !important;
  }
  25% {
    transform: scale(0.95) !important;
    filter: brightness(1.5) !important;
  }
`

const goldReveal = keyframes`
  0% {
    filter: brightness(1) !important;
    transform: scale(1.1) !important;
  }
  75% {
    filter: brightness(2) !important;
    transform: scale(1.2) !important;
  }
`

const mineReveal = keyframes`
  0%, 100% {
    transform: scale(1) !important;
  }
  50% {
    transform: scale(1.5) !important;
  }
  51% {
    background: #ffffff !important;
    transform: scale(1.6) !important;
  }
`

const hoverPulse = keyframes`
  0%, 100% {
    transform: scale(1) !important;
  }
  50% {
    transform: scale(1.05) !important;
  }
`

// Containers and Grid Layouts
export const Container2 = styled.div`
  display: grid !important;
  grid-template-rows: auto auto 1fr !important;
  height: 100% !important;
`

export const Container = styled.div`
  display: grid !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  font-size: 14px !important;
  user-select: none !important;
  backdrop-filter: blur(20px) !important;
`

export const Grid = styled.div`
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  grid-template-rows: repeat(4, 1fr) !important;
  gap: 8px !important;
`

export const Levels = styled.div`
  border-radius: 5px !important;
  color: gray !important;
  background: #292a307d !important;
  overflow: hidden !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  height: 50px !important;
`

export const Level = styled.div<{$active: boolean}>`
  margin: 0 auto !important;
  width: 25% !important;
  text-align: center !important;
  padding: 5px 0 !important;
  opacity: 0.5 !important;

  & > div:first-child {
    font-size: 60% !important;
    color: gray !important;
  }

  ${(props) => props.$active && css`
    background: #FFFFFF11 !important;
    background: 2px 0px 10px #00000033 !important;
    color: #32cd5e !important;
    opacity: 1 !important;
  `}
`

// CellButton (including status-based styles and animations)
export const CellButton = styled.button<{status: CellStatus, selected: boolean}>`
  display: flex !important;
  position: relative !important;
  align-items: center !important;
  justify-content: center !important;
  background: #9358ff !important;
  border: none !important;
  border-bottom: 5px solid #00000055 !important;
  border-radius: 4px !important;
  font-weight: bold !important;
  aspect-ratio: 1 !important;
  width: 60px !important;
  transition: background 0.3s, opacity .3s, filter .2s ease !important;
  font-size: 12px !important;
  cursor: pointer !important;

  ${(props) => props.selected && css`
    animation: ${tickingAnimation} .5s ease infinite !important;
    z-index: 10 !important;
    opacity: 1 !important;
  `}

  ${(props) => props.status === 'gold' && css`
    color: white !important;
    animation: ${goldReveal} .5s ease !important;
    opacity: 1 !important;
  `}

  ${(props) => props.status === 'mine' && css`
    background: #ff5252 !important;
    z-index: 10 !important;
    animation: ${mineReveal} .3s ease !important;
    opacity: 1 !important;
  `}

  ${(props) => props.status === 'hidden' && css`
    &:disabled {
      opacity: .5 !important;
    }
  `}

  &:disabled {
    cursor: default !important;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.5) !important;
  }
`

// StatusBar styling
export const StatusBar = styled.div`
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  color: white !important;
  
  & > div:first-child {
    display: flex !important;
    color: #ffffffCC !important;
    gap: 20px !important;
  }
`
