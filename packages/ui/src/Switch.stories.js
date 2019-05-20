// Framework
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
// Components
import Container from './Container'
import Switch from './Switch'

const SwitchSample1 = () => {
  const [checked, setChecked] = useState(true)

  return (
    <Container>
      <Switch
        checked={checked}
        labelText="This is the label text"
        onChange={() => setChecked(!checked)}
        value="some-value"
      />
    </Container>
  )
}

storiesOf('Switch', module).add('default checked', () => <SwitchSample1 />)
