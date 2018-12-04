const yup = require('yup')

module.exports = (fieldName, options = { required: true, maxLength: 100 }) => {
  let yupText = yup.string().trim()

  if (options.required) {
    yupText = yupText.required(`Your ${fieldName} is required`)
  }

  if (options.maxLength) {
    yupText = yupText.max(
      options.maxLength,
      `Your ${fieldName} must have no more than ${options.maxLength} characters`
    )
  }

  return yupText
}
