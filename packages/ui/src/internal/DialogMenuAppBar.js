// Platform
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import Drawer from '@material-ui/core/Drawer'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/styles'
// Public
import Button from '../Button'
// Internal
import AppBarButton from './AppBarButton'
import BaseAppBar from './BaseAppBar'
import Container from '../Container'
import { ColorsContext } from './ColorsContext'
// Helpers
import {
  Color,
  FontSizeLevel,
  FontWeight,
  SpacingLevel,
  ScreenSize
} from '../helpers/constants'
import { ColorPropTypes } from '../helpers/PropTypes'
import getColor from '../helpers/getColor'
import getFontSize from '../helpers/getFontSize'
import getFontWeight from '../helpers/getFontWeight'
import getSpacing from '../helpers/getSpacing'
// Hooks
import useColorClassName from '../hooks/useColorClassName'
import useScreenSizeStyles from '../hooks/useScreenSizeStyles'

const useStyles = makeStyles({
  fullList: {
    width: 'auto'
  },
  menuItemText: {
    fontSize: getFontSize(FontSizeLevel.l3),
    fontWeight: getFontWeight(FontWeight.regular)
  },
  dialogMenuItems: {
    marginTop: getSpacing(SpacingLevel.l5)
  },
  listItem: {
    paddingTop: getSpacing(SpacingLevel.l4),
    paddingBottom: getSpacing(SpacingLevel.l4)
  }
})

const Transition = props => <Slide direction="down" {...props} />

const DialogMenuBar = ({
  closeMenuLogo,
  logo,
  menuItems,
  openMenuLogo,
  // colors
  // small screen
  openMenuIconColor = Color.primaryContrast,
  closeMenuIconColor = Color.secondary,
  smallScreenAppBarBackgroundColor = Color.transparent,
  smallScreenMenuBackgroundColor = Color.primaryContrast,
  smallScreenLinkTextColor = Color.primaryContrast,
  // not-small screen
  notSmallScreenAppBarBackgroundColor = Color.transparent,
  notSmallScreenLinkTextColor = Color.primaryContrast
}) => {
  const classes = useStyles()
  const screenSizeClasses = useScreenSizeStyles()
  const [open, setOpen] = useState(false)

  const colors = useContext(ColorsContext)

  const openMenuIconColorClassName = useColorClassName(
    colors,
    openMenuIconColor
  )
  const closeMenuIconColorClassName = useColorClassName(
    colors,
    closeMenuIconColor
  )

  const closeMenu = () => setOpen(false)
  const openMenu = () => setOpen(true)

  return (
    <>
      <div className={screenSizeClasses[ScreenSize.small]}>
        <BaseAppBar
          location="top"
          backgroundColor={smallScreenAppBarBackgroundColor}
          position="absolute"
        >
          <AppBarButton
            icon={
              <>
                {openMenuLogo}
                <KeyboardArrowDownIcon className={openMenuIconColorClassName} />
              </>
            }
            onClick={openMenu}
            side="left"
          />
        </BaseAppBar>

        <Drawer anchor="top" open={open} onClose={closeMenu}>
          <div className={classes.fullList} role="presentation">
            <BaseAppBar
              location="top"
              backgroundColor={smallScreenMenuBackgroundColor}
            >
              <AppBarButton
                icon={
                  <>
                    {closeMenuLogo}
                    <KeyboardArrowUpIcon
                      className={closeMenuIconColorClassName}
                    />
                  </>
                }
                onClick={closeMenu}
                side="left"
              />
            </BaseAppBar>

            <Container
              disableGutters={true}
              backgroundColor={smallScreenMenuBackgroundColor}
            >
              <List component="nav" className={classes.dialogMenuItems}>
                {menuItems.map(menuItem => (
                  <ListItem
                    key={menuItem.text}
                    onClick={menuItem.onClick}
                    button
                    disableGutters={false}
                    className={classes.listItem}
                  >
                    <ListItemText
                      color={getColor(colors, smallScreenLinkTextColor)}
                      primary={menuItem.text}
                      classes={{ primary: classes.menuItemText }}
                    />
                  </ListItem>
                ))}
              </List>
            </Container>
          </div>
        </Drawer>
      </div>
      <div className={screenSizeClasses[ScreenSize.notSmall]}>
        <BaseAppBar
          backgroundColor={notSmallScreenAppBarBackgroundColor}
          location="top"
          position="absolute"
        >
          {logo}
          <nav>
            {menuItems.map(menuItem => (
              <Button
                centered={false}
                color={notSmallScreenLinkTextColor}
                key={menuItem.text}
                onClick={menuItem.onClick}
                variant="text"
              >
                {menuItem.text}
              </Button>
            ))}
          </nav>
        </BaseAppBar>
      </div>
    </>
  )
}

const itemPropType = PropTypes.shape({
  text: PropTypes.string,
  onClick: PropTypes.func
})

DialogMenuBar.propTypes = exact({
  menuItems: PropTypes.arrayOf(itemPropType).isRequired,
  // small-screen
  closeMenuLogo: PropTypes.element,
  closeMenuIconColor: ColorPropTypes,
  openMenuLogo: PropTypes.element,
  openMenuIconColor: ColorPropTypes,
  smallScreenAppBarBackgroundColor: ColorPropTypes,
  smallScreenMenuBackgroundColor: ColorPropTypes,
  smallScreenLinkTextColor: ColorPropTypes,
  // not-small screen
  logo: PropTypes.element,
  notSmallScreenAppBarBackgroundColor: ColorPropTypes,
  notSmallScreenLinkTextColor: ColorPropTypes
})

export default DialogMenuBar
