const currency = require('currency.js')
const getCurrencyString = require('./helpers/getCurrency')
const yup = require('yup')

/**
 * @typedef {Object} YupCurrencyOptions
 * @property {boolean} [required=true] The field is required
 * @property {string} [min] Minumum value of the provided currency
 * @property {number} [maxLength=20] Maximum length in characters
 */
const yupCurrencyDefaults = { required: true, maxLength: 20, min: undefined }

const InvalidCurrency = 'invalid-currency'

module.exports = (fieldName, options) => {
  if (typeof fieldName !== 'string') {
    throw 'fieldName is required'
  }

  const localOptions = Object.assign({}, yupCurrencyDefaults, options)

  let yupCurrency = yup.string().trim()

  if (localOptions.required) {
    yupCurrency = yupCurrency.required(`Your ${fieldName} is required`)
  }

  if (localOptions.maxLength) {
    yupCurrency = yupCurrency.max(
      localOptions.maxLength,
      `Your ${fieldName} must have no more than ${
        localOptions.maxLength
      } characters`
    )
  }

  if (localOptions.min) {
    yupCurrency = yupCurrency.test(
      'min',
      `${fieldName} should be at least ${currency(
        localOptions.min
      ).toString()}`,
      value => currency(value).subtract(localOptions.min).intValue >= 0
    )
  }

  yupCurrency = yupCurrency.test(
    'currency',
    `It looks like there is something wrong with the ${fieldName}`,
    value => value !== InvalidCurrency
  )

  yupCurrency = yupCurrency.transform(value => {
    if (!value) {
      return
    }

    // NOTE: InvalidCurrency will never get to the consumer of
    //  this funtion. The consumer will receive a rejected
    //  Promise cause by .test(...)
    return getCurrencyString(value) || InvalidCurrency
  })

  return yupCurrency
}
