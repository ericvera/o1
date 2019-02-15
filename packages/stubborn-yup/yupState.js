const defaultOptions = require('./helpers/defaultOptions')
const yup = require('yup')

/**
 * @param {YupTextOptions} [options]
 */
module.exports = options => {
  const localOptions = Object.assign({}, defaultOptions, options)

  let yupState = yup.string().trim()

  if (localOptions.required) {
    yupState = yupState.required('Your state is required')
  }

  yupState = yupState
    .uppercase()
    .min(2, 'Your state must be two characters long')
    .max(2, 'Your state must be two characters long')

  return yupState
}
