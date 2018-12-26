// Platform
import React from 'react'
// Materia-UI
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
// Material-UI-Bonus
import { ProgressButton } from 'material-ui-bonus'
// Libs
import { buildSchema, yupEmail } from 'stubborn-yup'
import { Formik } from 'formik'
// Services
import {
  AuthErrors,
  getLastSignInAttemptEmail,
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

class SignInWaitForm extends React.Component {
  constructor(props) {
    super(props)

    this.resendButton = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeResentSnackbar = this.closeResentSnackbar.bind(this)
    this.renderResentSnackbar = this.renderResentSnackbar.bind(this)

    this.state = {
      resentSnackbarOpen: false
    }
  }

  componentWillMount() {
    // This form should only be used when sign-in form has been used and no sign-in
    // The onNoEmail callback allows the consumer of this component to redirect to the sign-in page.
    const email = getLastSignInAttemptEmail()
    if (!email) {
      const { onNoEmail } = this.props
      if (onNoEmail) {
        onNoEmail()
      }
    }
  }

  async handleSubmit(
    values,
    setErrors,
    setSubmitting,
    setValues,
    signedInPath
  ) {
    let sanitizedValues = null

    try {
      // NOTE: This takes case of returning sanitized values (trimmed, toUpper, etc.)
      sanitizedValues = await schema.validate(values)
      // Update the form to the values submitted
      setValues(sanitizedValues)
    } catch (errors) {
      // NOTE: This should never happen. handleSubmit should not run if validation fails
      setErrors(errors)
      setSubmitting(false)
      return
    }

    let errorMessage = null

    // Send the sign-in email
    try {
      await sendSignInEmail(sanitizedValues.email, signedInPath)
    } catch (error) {
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
    }

    this.resendButton.current.resetDelay()

    setSubmitting(false)

    setErrors({
      global: errorMessage
    })
  }

  closeResentSnackbar(_, reason) {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ resentSnackbarOpen: false })
  }

  renderResentSnackbar() {
    const email = getLastSignInAttemptEmail()
    const { resentSnackbarOpen } = this.state

    return (
      <Snackbar
        open={resentSnackbarOpen}
        autoHideDuration={6000}
        onClose={this.closeResentSnackbar}
        message={<span>A new sign-in email is on its way to {email}.</span>}
      />
    )
  }

  render() {
    const { classes, signedInPath } = this.props

    return (
      <Formik
        initialValues={{
          email: getLastSignInAttemptEmail()
        }}
        validationSchema={schema}
        onSubmit={(values, { setErrors, setSubmitting, setValues }) => {
          Promise.resolve(
            this.handleSubmit(
              values,
              setErrors,
              setSubmitting,
              setValues,
              signedInPath
            )
          )
        }}
      >
        {props => {
          const { errors, isSubmitting, handleSubmit } = props

          return (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                {errors.global && (
                  <FormHelperText error={true}>*{errors.global}</FormHelperText>
                )}
                <div className={classes.submitButtomContainer}>
                  <ProgressButton
                    innerRef={this.resendButton}
                    delay={60}
                    showProgress={isSubmitting}
                    type="submit"
                  >
                    Send again
                  </ProgressButton>
                </div>
              </form>
              {this.renderResentSnackbar()}
            </React.Fragment>
          )
        }}
      </Formik>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SignInWaitForm)
