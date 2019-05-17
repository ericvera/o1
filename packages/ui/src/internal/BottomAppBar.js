// Framework
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Public
import Button from '../Button'
// Internal
import BaseAppBar from './BaseAppBar'

const BottomAppBar = ({
  buttonColor,
  buttonProps,
  buttonText,
  content,
  onClick
}) => {
  return (
    <BaseAppBar location="bottom" centered={true}>
      {content}
      <Button
        onClick={onClick}
        fullWidth={!content}
        centered={false}
        color={buttonColor}
        {...buttonProps}
      >
        {buttonText}
      </Button>
    </BaseAppBar>
  )
}

BottomAppBar.propTypes = exact({
  buttonColor: PropTypes.string,
  buttonProps: PropTypes.shape(Button.propTypes),
  buttonText: PropTypes.string,
  content: PropTypes.node,
  onClick: PropTypes.func
})

export default BottomAppBar
