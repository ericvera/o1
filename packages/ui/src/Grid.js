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
  gridFirstItem: {
    paddingLeft: getSpacing(SpacingLevel.l0),
    paddingRight: getSpacing(SpacingLevel.l2),
    width: '100%'
  },
  gridItem: {
    paddingLeft: getSpacing(SpacingLevel.l2),
    paddingRight: getSpacing(SpacingLevel.l2),
    width: '100%'
  },
  gridLastItem: {
    paddingLeft: getSpacing(SpacingLevel.l2),
    paddingRight: getSpacing(SpacingLevel.l0),
    width: '100%'
  },
  centeredContent: {
    textAlign: 'center',
    justifyContent: 'space-around'
  },
  firstItem: {
    paddingLeft: 0
  },
  lastItem: {
    paddingRight: 0
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

  let classNames = []

  if (centeredContent) {
    classNames.push(classes.centeredContent)
  }

  const getClasses = index => {
    if (index === 0) {
      return [...classNames, classes.gridFirstItem].join(' ')
    } else if (index === columnCount - 1) {
      return [...classNames, classes.gridLastItem].join(' ')
    } else {
      return [...classNames, classes.gridItem].join(' ')
    }
  }

  let columnDefinitions

  if (useXs) {
    columnDefinitions = { xs: columnSize }
  } else {
    columnDefinitions = { sm: columnSize }
  }

  return (
    <MaterialUIGrid container>
      {React.Children.map(children, (child, index) => {
        return (
          <MaterialUIGrid
            item
            {...columnDefinitions}
            className={getClasses(index)}
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
