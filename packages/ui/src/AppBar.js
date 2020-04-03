// Framework
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Helpers
import { AppBarButtonIcon } from './helpers/constants'
import { AppBarVariantPropTypes, ColorPropTypes } from './helpers/PropTypes'
// Components
import { Button } from './Button'
import AppBarButton from './AppBarButton'
import BaseAppBar from './internal/BaseAppBar'
import BottomAppBar from './internal/BottomAppBar'
import DialogMenuAppBar from './internal/DialogMenuAppBar'
import DrawerMenuAppBar from './internal/DrawerMenuAppBar'

const AppBar = ({ variant, ...props }) => {
  switch (variant) {
    case 'back':
    case 'close':
      const { backgroundColor, middleImage, rightImage, ...otherProps } = props

      return (
        <BaseAppBar location="top" backgroundColor={backgroundColor}>
          <AppBarButton side="left" icon={variant} {...otherProps} />
          {middleImage}
          {rightImage || (
            <AppBarButton side="right" icon={AppBarButtonIcon.empty} />
          )}
        </BaseAppBar>
      )
    case 'drawer-menu':
      return <DrawerMenuAppBar {...props} />
    case 'dialog-menu':
      return <DialogMenuAppBar {...props} />
    case 'bottom-full-button':
    case 'bottom-text-button':
      return <BottomAppBar {...props} />
  }

  throw Error(`[AppBar] Unsupported variant: ${variant}`)
}

const itemPropType = PropTypes.shape({
  text: PropTypes.string,
  onClick: PropTypes.func,
})

AppBar.propTypes = exact({
  variant: AppBarVariantPropTypes.isRequired,

  /* back, close, bottom-full-button, bottom-text-button */
  onClick: PropTypes.func,
  backgroundColor: ColorPropTypes,
  rightImage: PropTypes.element,

  /* drawer-menu, dialog-menu */
  menuItems: PropTypes.arrayOf(itemPropType),

  /* drawer-menu */
  menuImage: PropTypes.element,
  middleImage: PropTypes.element,
  bottomLeftMenuItem: itemPropType,
  bottomRightMenuItem: itemPropType,

  /* dialog-menu */
  openMenuLogo: PropTypes.element,
  closeMenuLogo: PropTypes.element,
  logo: PropTypes.element,
  // small screen
  openMenuIconColor: ColorPropTypes,
  closeMenuIconColor: ColorPropTypes,
  smallScreenAppBarBackgroundColor: ColorPropTypes,
  smallScreenMenuBackgroundColor: ColorPropTypes,
  smallScreenLinkTextColor: ColorPropTypes,
  // not-small screen
  notSmallScreenAppBarBackgroundColor: ColorPropTypes,
  notSmallScreenLinkTextColor: ColorPropTypes,

  /* bottom-* */
  buttonProps: PropTypes.shape(Button.propTypes),

  /* bottom-full-button */
  content: PropTypes.node,

  /* bottom-text-button, bottom-full-button */
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
})

export default AppBar
