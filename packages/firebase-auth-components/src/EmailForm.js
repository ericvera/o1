// Platform
import React, { useRef, useImperativeHandle, forwardRef } from 'react'
// Materia-UI
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
// Material-UI-Bonus
import { ProgressButton } from 'material-ui-bonus'
// Libs
import { buildSchema, yupEmail } from 'stubborn-yup'
import { Formik } from 'formik'

const useStyles = makeStyles(theme => ({
  submitButtomContainer: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    textAlign: 'right'
  }
}))

const schema = buildSchema(
  {
    email: yupEmail({ required: true })
  },
  { noUnknown: true }
)

const EmailForm = (
  {
    onSubmit,
    email = '',
    allowDomain,
    submitButtonText = 'Submit',
    delay,
    hideEmailInput = false
  },
  ref
) => {
  const classes = useStyles()
  const buttonRef = useRef()

  useImperativeHandle(ref, () => ({
    resetDelay: buttonRef.current.resetDelay()
  }))

  const handleSubmit = async (values, setErrors, setSubmitting, setValues) => {
    let sanitizedValues = null

    try {
      // NOTE: This takes case of returning sanitized values (trimmed, toUpper, etc.)
      sanitizedValues = await schema.validate(values)
      // Update the form to the values submitted
      setValues(sanitizedValues)
    } catch (errors) {
      // NOTE: This should never happen. handleSubmit should not run if validation fails
      setErrors({ global: errors.message || errors })
      setSubmitting(false)
      return
    }

    if (
      allowDomain &&
      sanitizedValues.email &&
      !sanitizedValues.email.endsWith(`@${allowDomain}`)
    ) {
      setErrors({
        global:
          'Your domain is not currently allowed on this site. If you think this is a problem please contact us.'
      })
      setSubmitting(false)
      return
    }

    onSubmit(sanitizedValues.email)
  }

  return (
    <Formik
      initialValues={{
        email
      }}
      validationSchema={schema}
      onSubmit={(values, { setErrors, setSubmitting, setValues }) => {
        Promise.resolve(
          handleSubmit(values, setErrors, setSubmitting, setValues)
        )
      }}
    >
      {props => {
        const {
          dirty,
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
            {hideEmailInput ? null : (
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
              />
            )}
            {errors.global && (
              <FormHelperText error={true}>*{errors.global}</FormHelperText>
            )}
            <div className={classes.submitButtomContainer}>
              <ProgressButton
                disabled={!dirty}
                showProgress={isSubmitting}
                type="submit"
                delay={delay}
                ref={buttonRef}
              >
                {submitButtonText}
              </ProgressButton>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

export default forwardRef(EmailForm)
