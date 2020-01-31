// Platform
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import MaterialUIDivider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/styles'
// Internal
import InnerContainer from './internal/InnerContainer'
import { ColorsContext } from './internal/ColorsContext'
// Helpers
import { Color, SpacingLevel } from './helpers/constants'
import { SpacingLevelPropTypes } from './helpers/PropTypes'
import getColor from './helpers/getColor'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'

const useStyles = colors =>
  makeStyles({
    divider: {
      color: getColor(colors, Color.secondary)
    }
  })

const Divider = ({
  centered = true,
  disableGutters = true,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0
}) => {
  const colors = useContext(ColorsContext)
  const classes = useStyles(colors)()
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)

  return (
    <InnerContainer centered={centered} disableGutters={disableGutters}>
      <MaterialUIDivider
        className={[classes.divider, marginClassName].join(' ')}
      />
    </InnerContainer>
  )
}

Divider.propTypes = exact({
  centered: PropTypes.bool,
  disableGutters: PropTypes.bool,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes
})

export default Divider
