// Framework
import React, { forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import MaterialUIButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
// Internal
import { ColorsContext } from './internal/ColorsContext'
import ProgressButton from './internal/ProgressButton'
// Helpers
import {
  ButtonVariant,
  Color,
  SpacingLevel,
  ButtonSize
} from './helpers/constants'
import {
  ButtonSizePropTypes,
  ButtonVariantPropTypes,
  ColorPropTypes,
  SpacingLevelPropTypes
} from './helpers/PropTypes'
import getColor from './helpers/getColor'
import getSpacing from './helpers/getSpacing'
// Hooks
import useCenteredContentClassName from './hooks/useCenteredContentClassName'
import useMarginStyles from './hooks/useMarginStyles'
import useColorClassName from './hooks/useColorClassName'

const useStyles = colors =>
  makeStyles({
    textButton: {
      paddingLeft: getSpacing(SpacingLevel.l2),
      paddingRight: getSpacing(SpacingLevel.l2)
    },
    [Color.primary]: {
      backgroundColor: getColor(colors, Color.background),
      borderColor: getColor(colors, Color.brand),
      color: getColor(colors, Color.brand)
    },
    [Color.secondary]: {
      backgroundColor: getColor(colors, Color.background),
      borderColor: getColor(colors, Color.secondary),
      color: getColor(colors, Color.secondary)
    },
    [Color.confirmAction]: {
      backgroundColor: getColor(colors, Color.confirmAction),
      borderStyle: 'none',
      color: getColor(colors, Color.background),
      '&:hover': {
        backgroundColor: getColor(colors, Color.confirmAction),
        borderStyle: 'none',
        color: getColor(colors, Color.background)
      }
    }
  })

const getButtonColorClassName = color => {
  if (![Color.primary, Color.secondary, Color.confirmAction].includes(color)) {
    throw Error(`[Button] Unsupported color: ${color}`)
  }

  return color
}

export const Button = ({
  centered = true,
  children,
  color = Color.primary,
  delay = undefined,
  forwardedRef = undefined,
  fullWidth = false,
  marginBottomLevel = SpacingLevel.l0,
  marginTopLevel = SpacingLevel.l0,
  onClick,
  size = ButtonSize.large,
  showProgress = false,
  variant = ButtonVariant.flat
}) => {
  const colors = useContext(ColorsContext)
  const classes = useStyles(colors)()
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)
  const centeredContentClassName = useCenteredContentClassName()
  const colorClassName = useColorClassName(colors, color)

  let classNames = [marginClassName]

  let button

  switch (variant) {
    case ButtonVariant.flat:
      classNames.push(classes[getButtonColorClassName(color)])
      button = (
        <MaterialUIButton
          className={classNames.join(' ')}
          fullWidth={fullWidth}
          onClick={onClick}
          size={size}
        >
          {children}
        </MaterialUIButton>
      )
      break
    case ButtonVariant.progress:
      classNames.push(classes[getButtonColorClassName(color)])
      button = (
        <ProgressButton
          ref={forwardedRef}
          delay={delay}
          className={classNames.join(' ')}
          fullWidth={fullWidth}
          onClick={onClick}
          showProgress={showProgress}
        >
          {children}
        </ProgressButton>
      )
      break
    case ButtonVariant.text:
      classNames.push(classes.textButton)

      button = (
        <MaterialUIButton
          className={classNames.join(' ')}
          classes={{
            text: colorClassName
          }}
          fullWidth={fullWidth}
          onClick={onClick}
          variant="text"
          size={size}
        >
          {children}
        </MaterialUIButton>
      )
      break
    default:
      throw Error(`[Button] Unsupported variant: ${variant}`)
  }

  if (!centered) {
    return button
  }

  return <div className={centeredContentClassName}>{button}</div>
}

Button.propTypes = exact({
  centered: PropTypes.bool,
  children: PropTypes.node,
  color: ColorPropTypes,
  forwardedRef: PropTypes.object,
  fullWidth: PropTypes.bool,
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes,
  onClick: PropTypes.func,
  size: ButtonSizePropTypes,
  variant: ButtonVariantPropTypes,
  /** Delay in seconds before the button can be pressed */
  delay: PropTypes.number,
  showProgress: PropTypes.bool
})

/**
 * @typedef {Object} ButtonProps
 * @property {boolean} [centered]
 * @property {string} children
 * @property {string} [color]
 * @property {number} [delay]
 * @property {React.Ref<any>} [forwardedRef]
 * @property {boolean} [fullWidth]
 * @property {string} [size]
 * @property {string} [marginBottomLevel]
 * @property {string} [marginTopLevel]
 * @property {function} onClick
 * @property {string} [variant]
 * @property {React.Ref<any>} [ref]
 * @property {boolean} [showProgress]
 */

/**
 * @type {React.ComponentType<ButtonProps>}
 */
const RefdButton = forwardRef((props, ref) => (
  <Button {...props} forwardedRef={ref} />
))

export default RefdButton
