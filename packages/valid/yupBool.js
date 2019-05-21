const yup = require('yup')

/**
 * @typedef {Object} YupBoolOptions
 * @property {boolean} [required=true] Default is true
 */

/**
 * @type {YupBoolOptions}
 */
const defaulYupBoolOptions = { required: true }

/**
 * @param {string} fieldName The name of the field being validated (used for error messages)
 * @param {YupBoolOptions} [options]
 */
module.exports = (fieldName, options) => {
  const localOptions = Object.assign({}, defaulYupBoolOptions, options)

  if (typeof fieldName !== 'string') {
    throw 'fieldName is required'
  }

  let yupBool = yup.bool()

  if (localOptions.required) {
    yupBool = yupBool.required(`Your ${fieldName} is required`)
  }

  return yupBool
}
