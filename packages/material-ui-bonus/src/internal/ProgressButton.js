// Framework
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
// Material-UI
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // TODO: Figure out these margins
    marginTop: -12,
    marginLeft: -12
  }
})

const ProgressButton = (
  { delay, className, disabled, children, onClick },
  ref
) => {
  const [delayText, setDelayText] = useState('')

  let timeout = null
  let internalDelay = 0

  const tickCountDown = () => {
    if (internalDelay > 0) {
      setDelayText(` (in ${internalDelay--} seconds)`)
      timeout = setTimeout(tickCountDown, 1000)
    } else {
      setDelayText('')
      timeout = null
    }
  }

  const resetDelay = () => {
    internalDelay = delay
    timeout = null
    tickCountDown()
  }

  useEffect(() => {
    resetDelay()

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    resetDelay
  }))

  const classes = useStyles()

  return (
    <Button
      type="submit"
      disabled={disabled || !!delayText}
      className={className}
      onClick={onClick}
    >
      {children}
      {delayText}
      {Boolean(delayText) && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </Button>
  )
}

export default forwardRef(ProgressButton)