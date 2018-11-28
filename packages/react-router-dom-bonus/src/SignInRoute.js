// Framework
import React from 'react'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'

const SignInRoute = ({
  component: Component,
  authenticated,
  authenticatedTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Redirect
          to={{
            pathname: authenticatedTo
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
)

export default SignInRoute
