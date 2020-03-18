import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'
import ThemeProvider from '../src/ThemeProvider'

import '@storybook/addon-console'
import { Color } from '../src/helpers/constants'

configureActions({
  clearOnStoryChange: true
})

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

const ThemeDecorator = storyFn => (
  <ThemeProvider
    colors={{
      [Color.background]: '#1F1F1F',
      [Color.brand]: '#FF8B36',
      [Color.confirmAction]: '#FA4747',
      [Color.inputBackground]: '#FFFFFF',
      [Color.inputBackgroundDisabled]: '#F7F7F7',
      [Color.primary]: '#FFFFFF',
      [Color.primaryContrast]: '#1F1F1F',
      [Color.primaryDisabled]: '#676767',
      [Color.secondary]: '#B2B2B2'
    }}
  >
    {storyFn()}
  </ThemeProvider>
)
addDecorator(ThemeDecorator)

const FullHeightDecorator = storyFn => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}
  >
    {storyFn()}
  </div>
)
addDecorator(FullHeightDecorator)
