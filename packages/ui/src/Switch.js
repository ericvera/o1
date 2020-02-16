// Platform
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MaterialUISwitch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/styles'
// Components
import Text from './Text'
// Internal
import { ColorsContext } from './internal/ColorsContext'
// Helpers
import { Color, SpacingLevel } from './helpers/constants'
import { ColorPropTypes, SpacingLevelPropTypes } from './helpers/PropTypes'
import getColor from './helpers/getColor'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'

const useStyles = colors =>
  makeStyles({
    flex: {
      flex: 1
    },
    fullWidth: {
      width: '100%',
      marginLeft: 0,
      marginRight: 0
    },
    switchBase: {
      color: getColor(colors, Color.brand),
      '&$checked': {
        color: getColor(colors, Color.brand)
      },
      '&$checked + $track': {
        backgroundColor: getColor(colors, Color.brand)
      }
    },
    checked: {},
    track: {
      backgroundColor: getColor(colors, Color.inputBackground),
      opacity: 0.9
    }
  })

const Switch = ({
  checked,
  label,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0,
  onChange,
  text,
  value
}) => {
  const colors = useContext(ColorsContext)
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)
  const classes = useStyles(colors)()

  return (
    <FormGroup className={marginClassName}>
      <InputLabel>{label}</InputLabel>
      <FormControlLabel
        classes={{ label: classes.flex }}
        className={classes.fullWidth}
        labelPlacement="start"
        control={
          <MaterialUISwitch
            classes={{
              switchBase: classes.switchBase,
              checked: classes.checked,
              track: classes.track
            }}
            disableRipple
            checked={checked}
            onChange={onChange}
            value={value}
          />
        }
        label={<Text>{text}</Text>}
      />
    </FormGroup>
  )
}

Switch.propTypes = exact({
  color: ColorPropTypes,
  checked: PropTypes.bool,
  label: PropTypes.string,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes,
  onChange: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string
})

export default Switch
