import React from 'react'
import { Color } from '../helpers/constants'

export const defaultColorValues = {
  [Color.brand]: '#12C789',
  [Color.primary]: '#2E2E2E',
  [Color.primaryContrast]: '#FFFFFF',
  [Color.primaryDisabled]: '#B7B7B7',
  [Color.secondary]: '#777777',
  [Color.confirmAction]: '#FA4747',
  [Color.inputBackground]: '#E3FFF5',
  [Color.inputText]: '#2E2E2E',
  [Color.inputBackgroundDisabled]: '#F7F7F7',
  [Color.inputTextDisabled]: '#B7B7B7',
  [Color.background]: '#FFFFFFDD',
  [Color.transparent]: 'transparent'
}

export const ColorsContext = React.createContext(defaultColorValues)
