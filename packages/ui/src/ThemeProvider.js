// Framework
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaterialUIThemeProvider from '@material-ui/styles/ThemeProvider'
// Helpers
import getFontSize from './helpers/getFontSize'
import getFontWeight from './helpers/getFontWeight'
import getColor from './helpers/getColor'
import { defaultColorValues, ColorsContext } from './internal/ColorsContext'
import { Color, FontSizeLevel, FontWeight } from './helpers/constants'

/**
 * @type {["none", string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]}
 */
// Using @type and spelling this out one by one to keep tsc happy
const shadowLevels = [
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
]

const defaultFontFamily = [
  'Montserrat',
  'Arial',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
]

const theme = (colors, fontFamily = defaultFontFamily, fontSizeBase = 16) =>
  createMuiTheme({
    // NOTE: shadows uses 25 levels of shadows. Setting
    //  them all to avoid the warning and disable them all.
    shadows: shadowLevels,
    props: {
      MuiAppBar: {
        position: 'fixed',
        elevation: 0,
      },
      MuiButtonBase: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      MuiButton: {
        variant: 'contained',
        disableFocusRipple: true,
        disableTouchRipple: true,
      },
      MuiIconButton: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      MuiInput: {
        disableUnderline: true,
        fullWidth: true,
      },
      MuiInputLabel: {
        shrink: true,
        disableAnimation: true,
        focused: false,
      },
      MuiListItem: {
        disableGutters: true,
      },
      MuiListItemText: {
        primaryTypographyProps: {
          variant: 'body1',
        },
      },
      MuiMenu: {
        elevation: 0,
      },
      MuiPaper: {
        elevation: 0,
      },
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: { backgroundColor: getColor(colors, Color.background) },
      },
      MuiButtonBase: {
        root: {
          '&:hover': {
            backgroundColor: getColor(colors, Color.transparent),
          },
          '&$disabled': {
            backgroundColor: getColor(colors, Color.transparent),
          },
        },
      },
      MuiButton: {
        text: {
          borderWidth: 0,
          color: getColor(colors, Color.primary),
          fontWeight: getFontWeight(FontWeight.bold),
          '&:hover': {
            backgroundColor: getColor(colors, Color.transparent),
          },
          '&$disabled': {
            color: getColor(colors, Color.primaryDisabled),
            backgroundColor: getColor(colors, Color.transparent),
          },
        },
        contained: {
          backgroundColor: getColor(colors, Color.background),
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: getColor(colors, Color.brand),
          color: getColor(colors, Color.brand),
          //fontWeight: getFontWeight(FontWeight.regular),
          '&:hover': {
            backgroundColor: getColor(colors, Color.background),
          },
          '&$disabled': {
            color: getColor(colors, Color.primaryDisabled),
            backgroundColor: getColor(colors, Color.background),
          },
        },
        /*fab: {
        // Between the mobile stepper and the AppBar
        // z-index explained here https://material-ui.com/layout/basics/
        // The fact that this is needed is likely a bug in the lib
        zIndex: 1050,
        color: getColor(colors, Color.brand),
        position: 'fixed',
        bottom: 16,
        right: 16
      },*/
        label: {
          textTransform: 'none',
        },
      },
      MuiCircularProgress: {
        colorPrimary: {
          color: getColor(colors, Color.brand),
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: getColor(colors, Color.secondary),
        },
      },
      MuiFormControl: {
        root: {
          display: 'block',
        },
      },
      MuiFormHelperText: {
        root: {
          color: getColor(colors, Color.confirmAction),
          fontSize: getFontSize(FontSizeLevel.l1, fontSizeBase),
          lineHeight: 1.3,
          marginTop: 0,
        },
      },
      MuiFormLabel: {
        root: {
          color: getColor(colors, Color.primary),
        },
      },
      MuiIconButton: {
        root: {
          color: getColor(colors, Color.primary),
          '&:hover': {
            backgroundColor: getColor(colors, Color.transparent),
          },
        },
      },
      MuiInput: {
        root: {
          borderRadius: 4,
          color: getColor(colors, Color.inputText),
          backgroundColor: getColor(colors, Color.inputBackground),
          '&$disabled': {
            color: getColor(colors, Color.inputTextDisabled),
            backgroundColor: getColor(colors, Color.inputBackgroundDisabled),
          },
        },
      },
      MuiInputBase: {
        input: {
          borderStyle: 'none',
          padding: getFontSize(FontSizeLevel.l2, fontSizeBase),
        },
        multiline: {
          padding: getFontSize(FontSizeLevel.l2, fontSizeBase),
        },
      },
      MuiInputLabel: {
        root: {
          fontWeight: getFontWeight(FontWeight.bold),
        },
      },
      MuiListItem: {
        button: {
          '&:hover': {
            backgroundColor: getColor(colors, Color.transparent),
          },
          '&:focus': {
            backgroundColor: getColor(colors, Color.transparent),
          },
          '&$disabled': {
            backgroundColor: getColor(colors, Color.transparent),
          },
        },
      },
      MuiListItemText: {
        root: {
          whiteSpace: 'pre-wrap',
        },
        primary: {
          overflowWrap: 'break-word',
        },
        secondary: {
          overflowWrap: 'break-word',
        },
      },
      MuiSnackbarContent: {
        root: {
          backgroundColor: getColor(colors, Color.brand),
          color: getColor(colors, Color.background),
          fontSize: getFontSize(FontSizeLevel.l2, fontSizeBase),
        },
      },
      MuiSwitch: {
        root: {
          marginRight: -8,
        },
      },
      MuiTypography: {
        root: {
          overflowWrap: 'break-word',
        },
      },
    },
    palette: {
      background: {
        paper: getColor(colors, Color.background),
        default: getColor(colors, Color.background),
      },
    },
    typography: {
      fontFamily: fontFamily.join(','),
      h1: {
        fontSize: getFontSize(FontSizeLevel.l4, fontSizeBase),
        color: getColor(colors, Color.primary),
        fontWeight: getFontWeight(FontWeight.bold),
        lineHeight: 1.1429,
      },
      h2: {
        fontSize: getFontSize(FontSizeLevel.l3, fontSizeBase),
        color: getColor(colors, Color.primary),
        fontWeight: getFontWeight(FontWeight.bold),
        lineHeight: 1.23,
      },
      h3: {
        fontSize: getFontSize(FontSizeLevel.l2, fontSizeBase),
        color: getColor(colors, Color.primary),
        fontWeight: getFontWeight(FontWeight.bold),
        lineHeight: 1.1875,
      },
      body1: {
        fontSize: getFontSize(FontSizeLevel.l2, fontSizeBase),
        color: getColor(colors, Color.primary),
        lineHeight: 1.1875,
      },
      body2: {
        fontSize: getFontSize(FontSizeLevel.l1, fontSizeBase),
        color: getColor(colors, Color.secondary),
        lineHeight: 1.3,
      },
      button: {
        fontWeight: getFontWeight(FontWeight.regular),
      },
      fontWeightRegular: getFontWeight(FontWeight.regular),
      fontWeightMedium: getFontWeight(FontWeight.bold),
    },
  })

const ThemeProvider = ({ children, colors, fontFamily, fontSizeBase }) => (
  <ColorsContext.Provider value={Object.assign({}, defaultColorValues, colors)}>
    <ThemeProviderBase fontFamily={fontFamily} fontSizeBase={fontSizeBase}>
      {children}
    </ThemeProviderBase>
  </ColorsContext.Provider>
)

const ThemeProviderBase = ({ children, fontFamily, fontSizeBase }) => {
  const colors = useContext(ColorsContext)

  return (
    <MaterialUIThemeProvider theme={theme(colors, fontFamily, fontSizeBase)}>
      <CssBaseline />
      {children}
    </MaterialUIThemeProvider>
  )
}

ThemeProvider.propTypes = exact({
  children: PropTypes.node,
  colors: PropTypes.object,
  fontFamily: PropTypes.arrayOf(PropTypes.string),
  fontSizeBase: PropTypes.number,
})

export default ThemeProvider
