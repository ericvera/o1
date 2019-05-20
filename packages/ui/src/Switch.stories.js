// Framework
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
// Components
import Switch from './Switch'

const SwitchSample1 = () => {
  const [checked, setChecked] = useState(true)

  return (
    <Switch
      checked={checked}
      label="Credit card details"
      text="This is the label text"
      onChange={() => setChecked(!checked)}
      value="some-value"
    />
  )
}

storiesOf('Switch', module).add('default checked', () => <SwitchSample1 />)
