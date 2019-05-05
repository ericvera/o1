import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AppBar from './AppBar'
import Button from './Button'
import Container from './Container'
import Heading from './Heading'
import List from './List'
import ListItem from './ListItem'
import Progress from './Progress'
import Text from './Text'
import TextField from './TextField'

storiesOf('Sample Layouts', module)
  .addParameters({
    info: {
      disable: true
    }
  })
  .add('Progress screen', () => (
    <>
      <Container>
        <Heading marginTopLevel="l6">A heading for what is taking time</Heading>
        <Text marginTopLevel="l4">This will just take a second...</Text>
        <Progress marginTopLevel="l4" />
      </Container>
    </>
  ))
  .add('H1 + Text + Button', () => (
    <>
      <AppBar variant="close" onClick={action('close screen')} />
      <Container>
        <Heading marginTopLevel="l6">Heading</Heading>
        <Text marginTopLevel="l4">
          <p>This is a paragraph</p>
          <p>
            It comes followed by a second paragraph for illustration purpose.
          </p>
        </Text>
        <Button
          marginTopLevel="l4"
          onClick={() => action('go somewhere pressed')}
        >
          Go somewhere
        </Button>
      </Container>
    </>
  ))
  .add('H2 + SubText + List', () => (
    <>
      <AppBar variant="back" onClick={action('go back')} />
      <Container fullPage={true} hasBottomBar={true}>
        <Heading level="l2" marginTopLevel="l4">
          Heading
        </Heading>
        <List>
          <ListItem primary="by Some Co" />
          <ListItem secondary="This is an item with only secondary text." />
          <ListItem
            secondary={
              <>
                First line.
                <br />
                Second line.
                <br />
                Third line.
              </>
            }
          />
          <ListItem
            secondary="This is an item with secondary text and a button."
            onClick={action('list item pressed')}
          />
          <ListItem
            divider={false}
            primary="This is a list item that only contains primary text. It may be a bit longer."
          />
        </List>
      </Container>
      <AppBar
        variant="bottom-full-button"
        buttonText="Next"
        buttonColor="confirm-action"
        onClick={action('next button pressed')}
      />
    </>
  ))
  .add('H2 + Input + Button', () => (
    <>
      <AppBar variant="back" onClick={action('go back')} />
      <Container>
        <Heading level="l2" marginTopLevel="l4">
          Heading
        </Heading>
        <form>
          <TextField
            label="Some label"
            placeholder="Sample text"
            marginTopLevel="l5"
          />
        </form>
        <Button marginTopLevel="l4" onClick={action('button pressed')}>
          Press me
        </Button>
      </Container>
    </>
  ))
