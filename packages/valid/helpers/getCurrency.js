const currency = require('currency.js')

/**
 * @param {string} value
 */
module.exports = value => {
  // NOTE: Regex checks that the number has an optional negative sign, optional command, optional decimal and up to two decimal digits
  // Adaptation from https://stackoverflow.com/questions/16242449/regex-currency-validation
  if (
    typeof value === 'string' &&
    !/(?=.*?\d)^\-?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/g.test(value)
  ) {
    return null
  }

  try {
    const currencyVal = currency(value, { errorOnInvalid: true })

    // NOTE: isNaN will return true for values like '1,000' so it cannot be used to check
    //  the validity of all `value`, but the currency lib will convert invalid values to 0
    //  instead of throwing an error. In that case make sure `value` it a number.
    if (currencyVal.intValue === 0 && isNaN(value)) {
      return null
    }

    return currencyVal.toString()
  } catch (_) {}

  return null
}
