// Framework
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
// Helpers
import { SpacingLevel } from './helpers/constants'
import { SpacingLevelPropTypes } from './helpers/PropTypes'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'

const Select = ({
  disabled,
  error,
  helperText,
  id,
  label,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0,
  onBlur,
  onChange,
  value,
  options
}) => {
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)

  return (
    <FormControl className={marginClassName}>
      {label && <InputLabel>{label}</InputLabel>}
      <NativeSelect
        className={marginClassName}
        disabled={disabled}
        error={error}
        fullWidth={true}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {Array.isArray(options) &&
          options.map(item => (
            <option key={item.value} value={item.value}>
              {item.label || item.value}
            </option>
          ))}
      </NativeSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

Select.propTypes = exact({
  autoCapitalize: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      label: PropTypes.string
    })
  ),
  value: PropTypes.string
})

export default Select
