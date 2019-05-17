// Framework
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// Components
import List from './List'
import ListItem from './ListItem'
import Text from './Text'

storiesOf('List', module)
  .add('default', () => (
    <List>
      <ListItem
        key="1"
        primary="Primary text"
        secondary="This is the secondary text which will generally be longer than thte primary."
      />
      <ListItem
        key="2"
        primary="This is an example of an item with a very long text as the primary."
      />
      <ListItem
        key="3"
        secondary="Secondary with button"
        onClick={action('third item is also clickable')}
        divider={false}
      />
    </List>
  ))
  .add('with children', () => (
    <List>
      <ListItem key="1">
        <div>
          <Text>Some text</Text>
          <Text>Some text</Text>
        </div>
      </ListItem>
      <ListItem
        key="2"
        primary="This is an example of an item with a very long text as the primary."
      />
      <ListItem
        key="3"
        secondary="Secondary with button"
        onClick={action('third item is also clickable')}
        divider={false}
      />
    </List>
  ))
