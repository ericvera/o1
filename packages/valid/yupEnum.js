const defaultOptions = require('./helpers/defaultOptions')
const yup = require('yup')

/**
 * @param {string} enumName
 * @param {Object} enumObject Object that represents a list of valid string values
 * @param {YupTextOptions} [options]
 */
module.exports = (enumName, enumObject, options) => {
  const localOptions = Object.assign({}, defaultOptions, options)

  let yupEnum = yup.mixed().oneOf(Object.values(enumObject))

  if (localOptions.required) {
    yupEnum = yupEnum.required(`${enumName} is required`)
  }

  return yupEnum
}
