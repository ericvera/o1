import AppBar from './AppBar'
import AppBarButton from './AppBarButton'
import Button from './Button'
import { Color, HeadingLevel, SpacingLevel } from './helpers/constants'
import Container from './Container'
import CustomInputContainer from './CustomInputContainer'
import Divider from './Divider'
import Footer from './Footer'
import Grid from './Grid'
import Heading from './Heading'
import List from './List'
import ListItem from './ListItem'
import Progress from './Progress'
import Select from './Select'
import Snackbar from './Snackbar'
import SvgIcon from './SvgIcon'
import Switch from './Switch'
import Text from './Text'
import TextField from './TextField'
import ThemeProvider from './ThemeProvider'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'
import usePaddingStyles from './hooks/usePaddingStyles'
// Export directly from Material-UI
import * as MaterialUI from '@material-ui/core'
import * as MaterialUIIcons from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

export {
  makeStyles,
  AppBar,
  AppBarButton,
  Button,
  Color,
  Container,
  CustomInputContainer,
  Divider,
  Footer,
  Grid,
  Heading,
  HeadingLevel,
  List,
  ListItem,
  MaterialUI,
  MaterialUIIcons,
  Progress,
  Select,
  Snackbar,
  SpacingLevel,
  SvgIcon,
  Switch,
  Text,
  TextField,
  ThemeProvider,
  useMarginStyles,
  usePaddingStyles,
}
