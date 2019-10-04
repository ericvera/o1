import React from 'react'
import { storiesOf } from '@storybook/react'
import Select from './Select'

const sampleOptionsWithLabel = [
  {
    value: 'label-1',
    label: 'Label 1'
  },
  {
    value: 'label-2',
    label: 'Label 2'
  }
]

const sampleOptionsWithNoLabel = [
  {
    value: 'label-1'
  },
  {
    value: 'label-2'
  }
]

const handleChange = event =>
  console.log(`value changed to '${event.target.value}'`)

storiesOf('Select', module)
  .add('default (value & label)', () => (
    <Select
      label="Label here"
      onChange={handleChange}
      options={sampleOptionsWithLabel}
    />
  ))
  .add('default (no label)', () => (
    <Select
      label="No label here"
      onChange={handleChange}
      options={sampleOptionsWithNoLabel}
      value={sampleOptionsWithNoLabel[1].value}
    />
  ))
  .add('disabled', () => (
    <Select
      disabled={true}
      label="Label here"
      options={sampleOptionsWithLabel}
      onChange={handleChange}
      value={sampleOptionsWithLabel[0].value}
    />
  ))
  .add('with error', () => (
    <Select
      error={true}
      helperText="There was an error here!"
      label="Label here"
      onChange={handleChange}
      options={sampleOptionsWithLabel}
    />
  ))
