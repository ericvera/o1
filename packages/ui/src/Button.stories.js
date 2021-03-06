import React, { useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

const ResetTestComponent = () => {
  const buttonRef = useRef()

  return (
    <div>
      <Button
        color="confirm-action"
        delay={5}
        ref={buttonRef}
        onClick={action('button pressed')}
        variant="progress"
      >
        Delayed button
      </Button>
      <Button
        color="primary"
        onClick={() => {
          const currentRef = buttonRef.current

          if (currentRef) {
            currentRef.resetDelay()
          }
        }}
      >
        Reset delay
      </Button>
    </div>
  )
}

const ToggleProgressComponent = () => {
  const [showProgress, setShowProgress] = useState(true)

  return (
    <div>
      <Button
        showProgress={showProgress}
        variant="progress"
        color="confirm-action"
        onClick={action('button pressed')}
      >
        Progress button
      </Button>
      <Button
        color="primary"
        onClick={() => {
          setShowProgress(!showProgress)
        }}
      >
        Toggle progress
      </Button>
    </div>
  )
}

storiesOf('Button', module)
  .add('primary (default)', () => (
    <Button onClick={action('button pressed')}>Press me</Button>
  ))
  .add('primary different sizes', () => (
    <div>
      <Button onClick={action('button pressed')}>Default</Button>
      <Button onClick={action('button pressed')} size="small">
        TEXT
      </Button>
      <Button onClick={action('button pressed')} size="medium">
        TEXT
      </Button>
      <Button onClick={action('button pressed')} size="large">
        TEXT
      </Button>
    </div>
  ))
  .add('primary - not centered', () => (
    <Button centered={false} onClick={action('button pressed')}>
      Press me
    </Button>
  ))
  .add('open in new tab with href/taget', () => (
    <Button centered={false} href="//google.com" target="_blank">
      Press me
    </Button>
  ))
  .add('secondary', () => (
    <Button color="secondary" onClick={action('button pressed')}>
      Press me
    </Button>
  ))
  .add('secondary / full width', () => (
    <Button
      color="secondary"
      onClick={action('button pressed')}
      fullWidth={true}
    >
      Press me
    </Button>
  ))
  .add('confirm-action', () => (
    <Button color="confirm-action" onClick={action('button pressed')}>
      Press me
    </Button>
  ))
  .add('progress / confirm-action', () => (
    <Button
      variant="progress"
      delay={5}
      color="confirm-action"
      onClick={action('button pressed')}
    >
      Press me
    </Button>
  ))
  .add('progress / primary / reset', () => <ResetTestComponent />)
  .add('progress / primary', () => <ToggleProgressComponent />)
  .add('text button', () => (
    <Button variant="text" onClick={action('button pressed')}>
      Press me
    </Button>
  ))
  .add('text button / secondary', () => (
    <Button
      variant="text"
      color="secondary"
      centered={false}
      onClick={action('button pressed')}
    >
      Press me
    </Button>
  ))
  .add('text button / brand', () => (
    <Button
      variant="text"
      color="brand"
      centered={false}
      onClick={action('button pressed')}
    >
      Press me
    </Button>
  ))
  .add('text button / multiple', () => (
    <div>
      <Button
        variant="text"
        centered={false}
        onClick={action('button pressed')}
      >
        Press me
      </Button>
      <Button
        variant="text"
        centered={false}
        onClick={action('button pressed')}
      >
        Press me
      </Button>
    </div>
  ))
