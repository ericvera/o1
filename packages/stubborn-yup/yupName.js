const defaultOptions = require('./helpers/defaultOptions')
const yup = require('yup')

/**
 * @param {YupTextOptions} [options]
 */
module.exports = options => {
  const localOptions = Object.assign({}, defaultOptions, options)

  let yupName = yup.string().trim()

  if (localOptions.required) {
    yupName = yupName.required('Your name is required')
  }

  yupName = yupName
    .min(2, 'Your name is required')
    .max(100, 'Your name is too long')

  return yupName
}
