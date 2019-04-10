// Framework
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
// Material-UI
import MaterialUIList from '@material-ui/core/List'
// Helpers
import { SpacingLevel } from './helpers/constants'
import { SpacingLevelPropTypes } from './helpers/PropTypes'
// Hooks
import useMarginStyles from './hooks/useMarginStyles'

const List = ({
  children,
  marginTopLevel = SpacingLevel.l3,
  marginBottomLevel = SpacingLevel.l0
}) => {
  const marginClassName = useMarginStyles(marginTopLevel, marginBottomLevel)

  return (
    <MaterialUIList disablePadding={true} className={marginClassName}>
      {children}
    </MaterialUIList>
  )
}

List.propTypes = exact({
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  marginBottomLevel: SpacingLevelPropTypes,
  marginTopLevel: SpacingLevelPropTypes
})

export default List
