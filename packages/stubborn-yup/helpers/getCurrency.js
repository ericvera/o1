const currency = require('currency.js')

/**
 * @param {string} value
 */
module.exports = value => {
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
