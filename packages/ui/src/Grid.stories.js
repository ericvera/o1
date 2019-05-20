import React from 'react'
import { storiesOf } from '@storybook/react'
import Grid from './Grid'
import Heading from './Heading'
import Text from './Text'
import TextField from './TextField'

storiesOf('Grid', module)
  .add('default', () => (
    <Grid>
      <Heading>Hi, I am a level 1 header</Heading>
      <Heading>Hi, I am a level 2 header</Heading>
      <Heading>Hi, I am a level 3 header</Heading>
    </Grid>
  ))
  .add('TextFields', () => (
    <Grid useXs={true}>
      <TextField placeholder="2 col" />
      <Grid useXs={true}>
        <TextField placeholder="1 col" />
        <TextField placeholder="1 col" />
      </Grid>
    </Grid>
  ))
  .add('2 elements', () => (
    <Grid>
      <Heading>Left</Heading>
      <Heading>Right</Heading>
    </Grid>
  ))
  .add('not centered', () => (
    <Grid centeredContent={false}>
      <div>
        <Heading level="l3">Hi, I am a level 1 header</Heading>
        <Text>
          Some text here. Make it a longer text here so that it takes more
          space.
        </Text>
      </div>
      <div>
        <Heading level="l3">Hi, I am a level 1 header</Heading>
        <Text>Some text here.</Text>
      </div>
      <div>
        <Heading level="l3">Hi, I am a level 1 header</Heading>
        <Text>
          Some text here. Make it a longer text here so that it takes more
          space.
        </Text>
      </div>
    </Grid>
  ))
