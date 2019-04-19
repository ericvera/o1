const defaultOptions = require('./helpers/defaultOptions')
const yup = require('yup')

/**
 * @param {YupTextOptions} [options]
 */
module.exports = options => {
  const localOptions = Object.assign({}, defaultOptions, options)

  let yupCity = yup.string().trim()

  if (localOptions.required) {
    yupCity = yupCity.required('Your city name is required')
  }

  yupCity = yupCity.max(100, 'Your city name is too long')

  return yupCity
}
