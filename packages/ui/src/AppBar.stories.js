// Framework
import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
// Material-UI
import HomeIcon from '@material-ui/icons/Home'
// Components
import AppBar from './AppBar'
import AppBarButton from './AppBarButton'
import Container from './Container'
import Heading from './Heading'
import Text from './Text'
// Image
import backgroundImage from '../.storybook/test-image.jpg'

storiesOf('AppBar', module)
  .add('back', () => <AppBar variant="back" onClick={action('go back')} />)
  .add('back w/ background color', () => (
    <AppBar
      variant="back"
      backgroundColor="brand"
      onClick={action('go back')}
    />
  ))
  .add('back w/ middle image', () => (
    <AppBar
      variant="close"
      backgroundColor="transparent"
      middleImage={<HomeIcon />}
      onClick={action('go back')}
    />
  ))
  .add('back w/ middle & right immage', () => (
    <AppBar
      variant="close"
      backgroundColor="transparent"
      middleImage={
        <>
          <HomeIcon /> Logo Copy
        </>
      }
      rightImage={<AppBarButton side="right" icon={<HomeIcon />} />}
      onClick={action('go back')}
    />
  ))
  .add('close', () => <AppBar variant="close" onClick={action('close')} />)
  .add('drawer-menu', () => (
    <AppBar
      variant="drawer-menu"
      middleImage={<HomeIcon />}
      menuImage={<HomeIcon />}
      menuItems={[
        {
          text: 'Menu item 1',
          onClick: action('menu item 1 pressed'),
        },
        {
          text: 'Menu item 2',
          onClick: action('menu item 2 pressed'),
        },
      ]}
      bottomLeftMenuItem={{
        text: 'Left',
        onClick: action('bottom left item'),
      }}
      bottomRightMenuItem={{
        text: 'Right',
        onClick: action('bottom right item'),
      }}
    />
  ))
  .add('dialog-menu', () => (
    <div>
      <AppBar
        variant="dialog-menu"
        smallScreenMenuBackgroundColor="brand"
        openMenuLogo={<HomeIcon />}
        closeMenuLogo={<HomeIcon />}
        logo={<HomeIcon />}
        menuItems={[
          {
            text: 'Menu item 1',
            onClick: action('menu item 1 pressed'),
          },
          {
            text: 'Menu item 2',
            onClick: action('menu item 2 pressed'),
          },
        ]}
      />
      <Container backgroundImage={backgroundImage}>
        <Text marginTopLevel="l9">Content here</Text>
      </Container>
      <Container fullPage={false}>
        <Text>Content 2</Text>
      </Container>
    </div>
  ))
  .add('bottom-full-button', () => (
    <AppBar
      variant="bottom-full-button"
      buttonText="Click the button"
      onClick={action('full-button pressed')}
    />
  ))
  .add('bottom-text-button', () => (
    <AppBar
      variant="bottom-full-button"
      content={
        <div>
          <Heading level="l3">Some heading</Heading>
          <Text>Some text</Text>
        </div>
      }
      buttonText="Click the button"
      onClick={action('text pressed')}
    />
  ))
  .add('bottom-text-button (with button props)', () => (
    <AppBar
      variant="bottom-full-button"
      content={
        <div>
          <Heading level="l3">Some heading</Heading>
          <Text>Some text</Text>
        </div>
      }
      buttonText="Click the button"
      buttonProps={{ variant: 'progress', showProgress: true }}
      onClick={action('text pressed')}
    />
  ))
  .add('top (close) and bottom (bottom-text-bottom)', () => (
    <div>
      <AppBar variant="close" onClick={action('close')} />
      <Container>
        <Heading>Hello!</Heading>
      </Container>
      <AppBar
        variant="bottom-full-button"
        content={
          <div>
            <Heading level="l3">Some heading</Heading>
            <Text>Some text</Text>
          </div>
        }
        buttonText="Click the button"
        onClick={action('text pressed')}
      />
    </div>
  ))
