const yup = require('yup')

/**
 * @typedef {Object} YupNumberOptions
 * @property {boolean} [required=true] Default is true
 * @property {boolean} [mustBeInteger=false] Default is false
 */

/**
 * @type {YupNumberOptions}
 */
const defaulYupNumberOptions = { required: true, mustBeInteger: false }

/**
 * @param {string} fieldName The name of the field being validated (used for error messages)
 * @param {YupNumberOptions} [options]
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
