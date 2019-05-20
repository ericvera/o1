// Platform
import React from 'react'
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
// Helpers
import { Color, SpacingLevel } from './helpers/constants'
import { ColorPropTypes, SpacingLevelPropTypes } from './helpers/PropTypes'
import getColor from './helpers/getColor'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'

const useStyles = makeStyles({
  flex: {
    flex: 1
  },
  fullWidth: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0
  },
  colorSwitchBase: {
    color: getColor(Color.primaryContrast),
    height: 30,

    '&$colorChecked': {
      color: getColor(Color.brand),
      borderStyle: 'none',
      '& + $colorBar': {
        backgroundColor: getColor(Color.brand)
      }
    }
  },
  colorIconChecked: {},
  colorIcon: {
    borderWidth: 1,
    borderColor: getColor(Color.secondary),
    borderStyle: 'solid',
    '&$colorIconChecked': {
      borderStyle: 'none',
      borderWidth: 0,
      borderColor: 'red'
    }
  },
  colorBar: {},
  colorChecked: {}
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
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)
  const classes = useStyles()

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
              switchBase: classes.colorSwitchBase,
              checked: classes.colorChecked,
              bar: classes.colorBar,
              icon: classes.colorIcon,
              iconChecked: classes.colorIconChecked
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
