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
  isSignInWithEmailLink,
  signInWithEmailLink,
  SignInWithEmailLinkErrorCodes,
  getLastSignInAttemptEmail
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

/* 
 States:
 - validating-link: first step in validation
 - invalid-link: not a valid sign-in email link (consumer should redirect to sign-in page)
 - need-email: if (in a different device) => show email form and on submit go to 'confirming'
 - confirming-sign-in: confirming you sign-in link => show progress indicator
 - expired-link: show link to sign-in to get a new email
 - invalid-email: show when an invalid email is provided => show error and set 
*/
export const SignedInFormStates = {
  ValidatingLink: 'validating-link',
  InvalidLink: 'invalid-link',
  ValidatingEmail: 'validating-email',
  NeedEmail: 'need-email',
  ConfirmingSignIn: 'confirming-sign-in',
  ExpiredLink: 'expired-link'
  // NOTE: There is no state for confirmed because the Firbase auth state listener will detect it.
}

class SignedInForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      state: SignedInFormStates.ValidatingLink,
      email: getLastSignInAttemptEmail() || '',
      errors: {}
    }

    this.setNewState = this.setNewState.bind(this)
    this.validateLink = this.validateLink.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.confirmSignIn = this.confirmSignIn.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearErrors = this.clearErrors.bind(this)
    this.renderEmailForm = this.renderEmailForm.bind(this)
  }

  async componentWillMount() {
    // Start the state machine
    await this.setNewState(this.state.state)
  }

  async componentDidUpdate(_, prevState) {
    if (this.state.state !== prevState.state) {
      this.setNewState(this.state.state)
    }
  }

  async setNewState(newState) {
    switch (newState) {
      case SignedInFormStates.ValidatingLink:
        await this.validateLink()
        break
      case SignedInFormStates.ValidatingEmail:
        this.validateEmail()
        break
      case SignedInFormStates.ConfirmingSignIn:
        await this.confirmSignIn()
        break
      default:
        // Other states should be end states
        break
    }
  }

  async validateLink() {
    if (await isSignInWithEmailLink()) {
      this.setState({ state: SignedInFormStates.ValidatingEmail })
    } else {
      this.setState({ state: SignedInFormStates.InvalidLink })
    }
  }

  validateEmail() {
    if (this.state.email) {
      this.setState({ state: SignedInFormStates.ConfirmingSignIn })
    } else {
      this.setState({ state: SignedInFormStates.NeedEmail })
    }
  }

  async confirmSignIn() {
    const { email } = this.state

    try {
      await signInWithEmailLink(email)
    } catch (error) {
      switch (error.code) {
        case SignInWithEmailLinkErrorCodes.InvalidEmail:
          this.setState({
            state: SignedInFormStates.NeedEmail,
            errors: {
              email:
                'There seems to be something wrong with your email. Please double check that it is the same that you used to sign-in and that there are no typos.'
            }
          })
          break
        case SignInWithEmailLinkErrorCodes.ExpiredActionCode:
        case SignInWithEmailLinkErrorCodes.InvalidActionCode:
          this.setState({ state: SignedInFormStates.ExpiredLink })
          break
        case AuthErrors.NetworkRequestFailed:
          this.setState({
            state: SignedInFormStates.NeedEmail,
            errors: {
              global:
                'It seems there is a problem with the internet connection. Please make sure your internet connection is working and try again.'
            }
          })
          break
        case AuthErrors.TooManyRequests:
          this.setState({
            state: SignedInFormStates.NeedEmail,
            errors: {
              global:
                'It seems we are experiencing more traffic than usual. Please try again in a minute or two.'
            }
          })
          break
        default:
          this.setState({
            state: SignedInFormStates.NeedEmail,
            errors: {
              global:
                'This is an unexpected error. Please copy this and send it to our support mail: ' +
                (error.code || error.message)
            }
          })
          break
      }
    }
  }

  handleSubmit(values, setErrors, setSubmitting) {
    this.setErrors = setErrors
    this.setSubmitting = setSubmitting

    this.setState({
      email: values.email,
      state: SignedInFormStates.ConfirmingSignIn
    })
  }

  clearErrors() {
    this.setState({ errors: {} })
  }

  renderEmailForm() {
    const { classes } = this.props

    return (
      <Formik
        initialValues={{
          email: this.state.email
        }}
        validationSchema={schema}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          Promise.resolve(this.handleSubmit(values, setErrors, setSubmitting))
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
                onChange={e => {
                  if (this.state.errors) {
                    this.clearErrors()
                  }
                  handleChange(e)
                }}
                onBlur={handleBlur}
                disabled={isSubmitting}
                error={Boolean(
                  (errors.email && touched.email) || this.state.errors.email
                )}
                helperText={
                  (errors.email && touched.email) || this.state.errors.email
                    ? errors.email || this.state.errors.email
                    : null
                }
              />
              {(errors.global || this.state.errors.global) && (
                <FormHelperText error={true}>
                  *{errors.global || this.state.errors.global}
                </FormHelperText>
              )}
              <div className={classes.submitButtomContainer}>
                <ProgressButton showProgress={isSubmitting} type="submit">
                  Confirm email
                </ProgressButton>
              </div>
            </form>
          )
        }}
      </Formik>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.state.state, this.renderEmailForm)}
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SignedInForm)
