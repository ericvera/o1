// Platform
import React, { forwardRef, useImperativeHandle } from 'react'
// @o1/ui
import { makeStyles, Button, Text, TextField } from '@o1/ui'
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
  const buttonRef = React.createRef()

  useImperativeHandle(ref, () => ({
    resetDelay: buttonRef.current.resetDelay
  }))

  const internalHandleSubmit = (
    values,
    { setErrors, setSubmitting, setValues }
  ) => {
    let sanitizedValues = null

    try {
      // NOTE: This takes case of returning sanitized values (trimmed, toUpper, etc.)
      sanitizedValues = schema.validateSync(values)
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
        global: 'Your email domain is not allowed on this site.'
      })
      setSubmitting(false)
      return
    }

    // NOTE: setValues triggers validation which will clear errors so only call this if there are
    //  no errors
    setValues(sanitizedValues)
    onSubmit(sanitizedValues.email)
  }

  return (
    <Formik
      initialValues={{
        email
      }}
      validationSchema={schema}
      onSubmit={internalHandleSubmit}
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
                label="Email"
                placeholder={
                  allowDomain ? `human@${allowDomain}` : 'coolhuman@gmail.com'
                }
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email ? errors.email : null}
              />
            )}
            {errors.global && <Text variant="error">{errors.global}</Text>}
            <div className={classes.submitButtomContainer}>
              <Button
                disabled={!hideEmailInput && !dirty}
                showProgress={isSubmitting}
                delay={delay}
                ref={buttonRef}
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

export default forwardRef(EmailForm)
