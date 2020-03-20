// Platform
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/styles'
// Internal
import InnerContainer from './internal/InnerContainer'
import { ColorsContext } from './internal/ColorsContext'
// Helpers
import { Color, SpacingLevel } from './helpers/constants'
import getColor from './helpers/getColor'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'
import { SpacingLevelPropTypes } from './helpers/PropTypes'

const useStyles = colors =>
  makeStyles({
    footer: {
      backgroundColor: getColor(colors, Color.background),
      flexShrink: 0
    },
    fixed: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      // TODO: Find a way to fix this
      height: 68,
      width: '100%'
    },
    toolbar: {
      width: '100%',
      justifyContent: 'space-between',
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      borderTopColor: getColor(colors, Color.secondary)
    }
  })

const Footer = ({
  children,
  fixed = false,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0
}) => {
  const colors = useContext(ColorsContext)
  const classes = useStyles(colors)()
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)

  let footerClassNames = [classes.footer, marginClassName]

  if (fixed) {
    footerClassNames.push(classes.fixed)
  }

  return (
    <footer className={footerClassNames.join(' ')}>
      <InnerContainer flex={true} centered={false} disableGutters={fixed}>
        <Toolbar className={classes.toolbar} disableGutters={!fixed}>
          {children}
        </Toolbar>
      </InnerContainer>
    </footer>
  )
}

Footer.propTypes = exact({
  children: PropTypes.node,
  fixed: PropTypes.bool,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes
})

export default Footer
