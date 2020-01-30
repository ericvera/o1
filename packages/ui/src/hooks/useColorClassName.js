import { makeStyles } from '@material-ui/styles'
import getColor from '../helpers/getColor'

const useStyles = (colors, color, backgroundColor) => {
  const colorStyles = {}

  if (color) {
    colorStyles.color = getColor(colors, color)
  }

  if (backgroundColor) {
    colorStyles.backgroundColor = getColor(colors, backgroundColor)
  }

  return makeStyles({
    colorStyles
  })()
}

export default (colors, color, backgroundColor) => {
  const classes = useStyles(colors, color, backgroundColor)

  return classes.colorStyles
}
