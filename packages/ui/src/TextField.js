// Framework
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import MaterialUITextField from '@material-ui/core/TextField'
// Helpers
import { SpacingLevel } from './helpers/constants'
import { SpacingLevelPropTypes } from './helpers/PropTypes'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'

const TextField = ({
  autoCapitalize,
  autoFocus,
  disabled,
  error,
  helperText,
  id,
  inputMode,
  label,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0,
  multiline = false,
  onBlur,
  onChange,
  pattern,
  placeholder,
  rows,
  rowsMax,
  type,
  value
}) => {
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)

  return (
    <MaterialUITextField
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      className={marginClassName}
      disabled={disabled}
      error={error}
      fullWidth={true}
      helperText={helperText}
      id={id}
      inputProps={{ inputMode, pattern }}
      label={label}
      multiline={multiline}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      rowsMax={rowsMax}
      type={type}
      value={value}
    />
  )
}

TextField.propTypes = exact({
  autoCapitalize: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  inputMode: PropTypes.string,
  label: PropTypes.string,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes,
  multiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  value: PropTypes.string
})

export default TextField
