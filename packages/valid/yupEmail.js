const defaultOptions = require('./helpers/defaultOptions')
const yup = require('yup')

/**
 * @param {YupTextOptions} [options]
 */
module.exports = options => {
  const localOptions = Object.assign({}, defaultOptions, options)

  let yupEmail = yup.string().trim()

  if (localOptions.required) {
    yupEmail = yupEmail.required('Your email is required')
  }

  yupEmail = yupEmail
    .max(100, 'Your email is too long')
    .email('It looks like something is wrong with the email')

  return yupEmail
}
