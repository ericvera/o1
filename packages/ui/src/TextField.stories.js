import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextField from './TextField'

storiesOf('TextField', module)
  .add('default', () => (
    <TextField
      label="Label here"
      placeholder="Placeholder text"
      onChange={action('text changed')}
    />
  ))
  .add('disabled', () => (
    <TextField
      disabled={true}
      value="Unchangeable value"
      label="Label here"
      placeholder="Placeholder text"
      onChange={action('text changed')}
    />
  ))
  .add('with error', () => (
    <TextField
      label="Label here"
      placeholder="Placeholder text"
      onChange={action('text changed')}
      error={true}
      helperText="There was an error here!"
    />
  ))
  .add('autoCapitalize', () => (
    <TextField
      placeholder="Placeholder text"
      autoCapitalize="words"
      onChange={action('text changed')}
      error={false}
      helperText=""
    />
  ))
  .add('multiline with no rows', () => (
    <TextField
      placeholder="Placeholder text"
      autoCapitalize="words"
      multiline={true}
      onChange={action('text changed')}
      error={false}
      helperText=""
    />
  ))
  .add('multiline with rows and rowsMax', () => (
    <TextField
      placeholder="Placeholder text"
      autoCapitalize="words"
      multiline={true}
      rows={2}
      rowsMax={4}
      onChange={action('text changed')}
      error={false}
      helperText=""
    />
  ))
  .add('multiline with rowsMax', () => (
    <TextField
      placeholder="Placeholder text"
      autoCapitalize="words"
      multiline={true}
      rowsMax={4}
      onChange={action('text changed')}
      error={false}
      helperText=""
    />
  ))
