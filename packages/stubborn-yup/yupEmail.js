const yup = require('yup')

module.exports = (options = { required: true }) => {
  let yupEmail = yup.string().trim()

  if (options.required) {
    yupEmail = yupEmail.required('Your email is required')
  }

  yupEmail = yupEmail
    .max(100, 'Your email is too long')
    .email('It looks like something is wrong with the email')

  return yupEmail
}
