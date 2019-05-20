// Framework
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
// Components
import CustomInputContainer from './CustomInputContainer'
import Switch from './Switch'

const CustomInputContainerSample1 = () => {
  const [checked, setChecked] = useState(true)

  return (
    <CustomInputContainer label="This is the label">
      <Switch
        checked={checked}
        text="This is the text"
        onChange={() => setChecked(!checked)}
        value="some-value"
      />
    </CustomInputContainer>
  )
}

storiesOf('CustomInputContainer', module).add('default checked', () => (
  <CustomInputContainerSample1 />
))
