const yup = require('yup')

/**
 * @typedef {Object} YupTextOptions
 * @property {boolean} [required=true] Default is true
 */

/**
 * @type {YupTextOptions}
 */
const defaulYupNumberOptions = { required: true, mustBeInteger: false }

/**
 * @param {string} fieldName The name of the field being validated (used for error messages)
 * @param {YupTextOptions} [options]
 */
module.exports = (fieldName, options) => {
  const localOptions = Object.assign({}, defaulYupNumberOptions, options)

  if (typeof fieldName !== 'string') {
    throw 'fieldName is required'
  }

  let yupNumber = yup.number()

  if (localOptions.required) {
    yupNumber = yupNumber.required(`Your ${fieldName} is required`)
  }

  if (localOptions.mustBeInteger) {
    yupNumber = yupNumber.integer(`Your ${fieldName} must be an integer`)
  }

  return yupNumber
}
