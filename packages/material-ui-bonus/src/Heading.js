// Framework
import React from 'react'
import PropTypes from 'prop-types'
// Material-UI
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
// Helpers
import getSpacing from './helpers/getSpacing'

const useStyles = makeStyles({
  h1: {
    marginTop: getSpacing(5)
  },
  h2: {
    marginTop: getSpacing(4)
  },
  h3: {
    marginTop: getSpacing(3)
  }
})

const Heading = ({ level = '1', children, ...others }) => {
  const classes = useStyles()

  return (
    <Typography
      variant={`h${level}`}
      className={classes[`h${level}`]}
      {...others}
    >
      {children}
    </Typography>
  )
}

Heading.propTypes = {
  level: PropTypes.oneOf(['1', '2', '3'])
}

export default Heading
