// Framework
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const SignInRoute = ({
  component: Component,
  componentProps = {},
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
        <Component {...props} {...componentProps} />
      )
    }
  />
)

export default SignInRoute
