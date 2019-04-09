// Framework
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  componentProps = {},
  authenticated,
  unauthenticatedTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} {...componentProps} />
      ) : (
        <Redirect
          to={{
            pathname: unauthenticatedTo,
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default PrivateRoute
