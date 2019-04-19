const defaultOptions = require('./helpers/defaultOptions')
const yup = require('yup')

/**
 * @param {YupTextOptions} [options]
 */
module.exports = options => {
  const localOptions = Object.assign({}, defaultOptions, options)

  let yupPostalCode = yup
    .string()
    .trim()
    .max(10, 'Your postal code is too long (max. 10 characters)')

  if (localOptions.required) {
    yupPostalCode = yupPostalCode.required('Your postal code is required')
  }

  yupPostalCode = yupPostalCode.test(
    'postal code',
    'It looks like there is something wrong with the postal code',
    value => !value || /^[0-9]{5}(?:-[0-9]{4})?$/.test(value)
  )

  return yupPostalCode
}
