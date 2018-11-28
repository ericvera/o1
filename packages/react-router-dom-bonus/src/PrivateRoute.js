// Framework
import React from 'react'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'

const PrivateRoute = ({
  component: Component,
  authenticated,
  unauthenticatedTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
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
