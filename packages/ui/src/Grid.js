// Framework
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import MaterialUIGrid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
// Helpers
import { SpacingLevel } from './helpers/constants'
import getSpacing from './helpers/getSpacing'

const useStyles = makeStyles({
  gridItem: {
    paddingLeft: getSpacing(SpacingLevel.l2),
    paddingRight: getSpacing(SpacingLevel.l2),
    width: '100%'
  },
  centeredContent: {
    textAlign: 'center'
  }
})

const Grid = ({ useXs = false, centeredContent = true, children }) => {
  const classes = useStyles()

  const columnCount = React.Children.count(children)

  let columnSize

  // Supports 2, 3, 4, 6
  switch (columnCount) {
    case 2:
      columnSize = 6
      break
    case 3:
      columnSize = 4

      break
    case 4:
      columnSize = 3
      break
    case 6:
      columnSize = 2
      break
    default:
      throw new Error(`Grid only supports 2, 3, 4, 6 child elements.`)
  }

  let classNames = [classes.gridItem]

  if (centeredContent) {
    classNames.push(classes.centeredContent)
  }

  let columnDefinitions

  if (useXs) {
    columnDefinitions = { xs: columnSize }
  } else {
    columnDefinitions = { sm: columnSize }
  }

  return (
    <MaterialUIGrid container>
      {React.Children.map(children, child => {
        return (
          <MaterialUIGrid
            item
            {...columnDefinitions}
            className={classNames.join(' ')}
          >
            {child}
          </MaterialUIGrid>
        )
      })}
    </MaterialUIGrid>
  )
}

Grid.propTypes = exact({
  centeredContent: PropTypes.bool,
  children: PropTypes.node,
  useXs: PropTypes.bool
})

export default Grid
