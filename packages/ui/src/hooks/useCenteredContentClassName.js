import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  centeredContent: {
    textAlign: 'center',
    width: '100%',
    justifyContent: 'space-between'
  }
})

export default () => {
  const classes = useStyles()

  return classes.centeredContent
}
