// Platform
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MaterialUISwitch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/styles'
// Components
import Text from './Text'
// Helpers
import { Color, SpacingLevel } from './helpers/constants'
import { SpacingLevelPropTypes, ColorPropTypes } from './helpers/PropTypes'
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
  labelText,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0,
  onChange,
  value
}) => {
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)
  const classes = useStyles()

  return (
    <FormControlLabel
      classes={{ label: classes.flex }}
      className={[marginClassName, classes.fullWidth].join(' ')}
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
      label={<Text>{labelText}</Text>}
    />
  )
}

Switch.propTypes = exact({
  color: ColorPropTypes,
  checked: PropTypes.bool,
  labelText: PropTypes.string,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes,
  onChange: PropTypes.func,
  value: PropTypes.string
})

export default Switch
