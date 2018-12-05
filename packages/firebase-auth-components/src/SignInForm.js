// Platform
import React from 'react'
// Materia-UI
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
// Material-UI-Bonus
import { ProgressButton } from 'material-ui-bonus'
// Libs
import { buildSchema, yupEmail } from 'stubborn-yup'
import { Formik } from 'formik'
// Services
import {
  AuthErrors,
  sendSignInEmail,
  SendSignInEmailErrorCodes
} from 'firebase-auth-web'

const styles = theme => ({
  submitButtomContainer: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    textAlign: 'right'
  }
})

const schema = buildSchema(
  {
    email: yupEmail({ required: true })
  },
  { noUnknown: true }
)

const handleSubmit = async (
  values,
  setErrors,
  setSubmitting,
  signedInPath,
  onSignIn
) => {
  // Send the sign-in email
  try {
    await sendSignInEmail(values.email, signedInPath)

    if (onSignIn) {
      onSignIn()
    }
  } catch (error) {
    let errorMessage = ''

    switch (error.code) {
      case SendSignInEmailErrorCodes.InvalidEmail:
        errorMessage =
          'There seems to be something wrong with your email. Please double check it and try again.'
        break
      case AuthErrors.NetworkRequestFailed:
        errorMessage =
          'It seems there is a problem with the internet connection. Please make sure your internet connection is working and try again.'
        break
      case AuthErrors.TooManyRequests:
        errorMessage =
          'It seems we are experiencing more traffic than usual. Please try again in a minute or two.'
        break
      default:
        errorMessage =
          'This is an unexpected error. Please copy this and send it to our support mail: ' +
          (error.code || error.message)
        break
    }

    setSubmitting(false)

    setErrors({
      global: errorMessage
    })
    return
  }
}

const SignInForm = ({
  classes,
  signedInPath,
  onSignIn,
  emailFieldProps,
  buttonProps,
  buttonContainerProps,
  allowDomain
}) => (
  <Formik
    initialValues={{
      email: ''
    }}
    validationSchema={schema}
    onSubmit={(values, { setErrors, setSubmitting }) => {
      if (
        allowDomain &&
        values.email &&
        !values.email.endsWith(`@${allowDomain}`)
      ) {
        setErrors({ global: 'Go away' })
      } else {
        Promise.resolve(
          handleSubmit(values, setErrors, setSubmitting, signedInPath, onSignIn)
        )
      }
    }}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props

      return (
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            autoFocus={true}
            fullWidth
            label="EMAIL"
            placeholder="coolhuman@gmail.com"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            error={Boolean(errors.email && touched.email)}
            helperText={errors.email && touched.email ? errors.email : null}
            {...emailFieldProps}
          />
          {errors.global && (
            <FormHelperText error={true}>*{errors.global}</FormHelperText>
          )}
          <div
            className={classes.submitButtomContainer}
            {...buttonContainerProps}
          >
            <ProgressButton
              showProgress={isSubmitting}
              type="submit"
              {...buttonProps}
            >
              Send me a sign-in email
            </ProgressButton>
          </div>
        </form>
      )
    }}
  </Formik>
)

export default withStyles(styles, { withTheme: true })(SignInForm)
