const yup = require('yup')

/**
 * @typedef {Object} YupTextOptions
 * @property {boolean} [required=true] The field is required
 * @property {number} [maxLength=100] Max length of text
 */

/**
 * @type {YupTextOptions}
 */
const defaulYupTextOptions = { required: true, maxLength: 100 }

/**
 * @param {string} fieldName The name of the field being validated (used for error messages)
 * @param {YupTextOptions} [options]
 */
module.exports = (fieldName, options) => {
  const localOptions = Object.assign({}, defaulYupTextOptions, options)

  if (typeof fieldName !== 'string') {
    throw 'fieldName is required'
  }

  let yupText = yup.string().trim()

  if (localOptions.required) {
    yupText = yupText.required(`Your ${fieldName} is required`)
  }

  if (localOptions.maxLength) {
    yupText = yupText.max(
      localOptions.maxLength,
      `Your ${fieldName} must have no more than ${
        localOptions.maxLength
      } characters`
    )
  }

  return yupText
}
