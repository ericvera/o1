// Platform
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
// Helpers
import { SpacingLevel } from './helpers/constants'
import { SpacingLevelPropTypes } from './helpers/PropTypes'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'

const CustomInputContainer = ({
  children,
  label,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0
}) => {
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)

  return (
    <FormControl className={marginClassName}>
      <InputLabel>{label}</InputLabel>
      {children}
    </FormControl>
  )
}

CustomInputContainer.propTypes = exact({
  children: PropTypes.node,
  label: PropTypes.string,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes
})

export default CustomInputContainer
